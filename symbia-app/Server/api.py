"""FastAPI wrapper for the RAG chatbot pipeline."""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .index import bootstrap_pipeline, RAGConfig


app = FastAPI(title="Symbia RAG API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
_rag = None


class ChatRequest(BaseModel):
    question: str


class ChatResponse(BaseModel):
    answer: str


def get_rag():
    global _rag
    if _rag is None:
        _rag = bootstrap_pipeline(RAGConfig())
    return _rag


@app.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    rag = get_rag()
    try:
        answer = rag.chat(payload.question)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    return ChatResponse(answer=answer)
