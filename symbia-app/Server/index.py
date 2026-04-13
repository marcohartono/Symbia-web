"""RAG chatbot pipeline entrypoint.

This script builds a lightweight retrieval-augmented generation (RAG) pipeline
that fetches content from target websites, embeds it into a vector store, and
provides a `chat` function for answering questions grounded in the fetched
content. Environment variables are used for credentials and configuration.

Key environment variables
-------------------------
- OPENAI_API_KEY: required for OpenAI models.
- WEBSITE_URLS: optional comma-separated list of URLs to ingest at startup.
- LOCAL_KB_PATH: optional path to a local text file to ingest at startup.
"""

from collections.abc import Iterable
from dataclasses import dataclass
from pathlib import Path
from typing import List, Sequence

from bs4 import BeautifulSoup
from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
import requests


load_dotenv(dotenv_path=Path(__file__).resolve().parent / ".env")


@dataclass
class RAGConfig:
    """Configuration for the RAG pipeline."""

    model: str = "gpt-4o-mini"
    temperature: float = 0.1
    chunk_size: int = 800
    chunk_overlap: int = 100
    default_urls: Sequence[str] | None = None
    local_kb_path: Path | None = None


class WebsiteIngestor:
    """Fetch and clean text content from website URLs."""

    def __init__(self, headers: dict[str, str] | None = None) -> None:
        self.headers = headers or {"User-Agent": "Symbia-RAG/1.0"}

    def fetch(self, url: str) -> str:
        response = requests.get(url, headers=self.headers, timeout=30)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        for script in soup(["script", "style", "noscript"]):
            script.decompose()
        text = "\n".join(chunk.strip() for chunk in soup.get_text("\n").splitlines() if chunk.strip())
        return f"Source: {url}\n{text}"

    def fetch_all(self, urls: Iterable[str]) -> List[str]:
        documents: List[str] = []
        failed: List[str] = []
        for url in urls:
            try:
                documents.append(self.fetch(url))
            except requests.RequestException:
                failed.append(url)
        if failed:
            print(f"Warning: skipped {len(failed)} URL(s) due to fetch errors.")
        if not documents and failed:
            raise RuntimeError("Failed to fetch any URLs. Check WEBSITE_URLS.")
        return documents


class RAGPipeline:
    """Builds a simple RAG chain with FAISS and OpenAI models."""

    def __init__(self, config: RAGConfig) -> None:
        self.config = config
        self.vector_store: FAISS | None = None
        self.retriever = None
        self.llm: ChatOpenAI | None = None
        self.prompt: ChatPromptTemplate | None = None
        self.chain = None

    def ingest(self, urls: Iterable[str], local_kb_path: Path | None = None) -> None:
        raw_documents: List[str] = []
        if urls:
            ingestor = WebsiteIngestor()
            raw_documents.extend(ingestor.fetch_all(urls))
        if local_kb_path:
            if local_kb_path.is_absolute():
                local_path = local_kb_path.expanduser().resolve()
            else:
                module_root = Path(__file__).resolve().parent
                local_path = (module_root / local_kb_path).resolve()
                if not local_path.exists():
                    local_path = (module_root.parent / local_kb_path).resolve()
            if not local_path.exists():
                raise FileNotFoundError(f"Local knowledge base file not found: {local_path}")
            text = local_path.read_text(encoding="utf-8")
            raw_documents.append(f"Source: {local_path}\n{text}")
        if not raw_documents:
            raise ValueError("No documents to ingest. Provide URLs or a local knowledge base file.")
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.config.chunk_size,
            chunk_overlap=self.config.chunk_overlap,
        )
        splits = splitter.create_documents(raw_documents)
        embeddings = OpenAIEmbeddings()
        self.vector_store = FAISS.from_documents(splits, embedding=embeddings)
        self.retriever = self.vector_store.as_retriever(search_kwargs={"k": 4})
        self.llm = ChatOpenAI(model=self.config.model, temperature=self.config.temperature)
        self.prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "You are a helpful assistant. Use the context to answer the question. "
                    "If the answer is not in the context, say you don't know.",
                ),
                ("human", "Question: {question}\n\nContext:\n{context}"),
            ]
        )
        self.chain = self.prompt | self.llm | StrOutputParser()

    def chat(self, question: str) -> str:
        if not self.retriever or not self.chain:
            urls = self.config.default_urls or []
            local_kb_path = self.config.local_kb_path
            if local_kb_path is None:
                import os

                local_kb = os.getenv("LOCAL_KB_PATH", "").strip()
                local_kb_path = Path(local_kb) if local_kb else None
            if not urls and not local_kb_path:
                raise RuntimeError("Pipeline has not been ingested with any data yet.")
            self.ingest(urls, local_kb_path=local_kb_path)
        docs = self.retriever.invoke(question)
        context = "\n\n".join(doc.page_content for doc in docs)
        return self.chain.invoke({"question": question, "context": context})


def bootstrap_pipeline(config: RAGConfig | None = None) -> RAGPipeline:
    """Create a pipeline instance and ingest default URLs when provided."""

    pipeline = RAGPipeline(config or RAGConfig(default_urls=[]))
    urls = pipeline.config.default_urls or []
    local_kb_path = pipeline.config.local_kb_path
    if local_kb_path is None:
        import os

        local_kb = os.getenv("LOCAL_KB_PATH", "").strip()
        local_kb_path = Path(local_kb) if local_kb else None
    if not urls and not local_kb_path:
        return pipeline
    pipeline.ingest(urls, local_kb_path=local_kb_path)
    return pipeline


if __name__ == "__main__":
    import os

    configured_urls = [url.strip() for url in os.getenv("WEBSITE_URLS", "").split(",") if url.strip()]
    local_kb = os.getenv("LOCAL_KB_PATH", "").strip()
    local_kb_path = Path(local_kb) if local_kb else None
    rag = bootstrap_pipeline(
        RAGConfig(default_urls=configured_urls, local_kb_path=local_kb_path)
    )
    if not configured_urls and not local_kb_path:
        print("No WEBSITE_URLS or LOCAL_KB_PATH provided. Pipeline initialized without data.")
    else:
        print("Ingested data. Ask questions via rag.chat(<question>).")
