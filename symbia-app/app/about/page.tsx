import Link from "next/link";

export const metadata = {
  title: "About | Symbia",
  description: "Learn more about Symbia&#39;s mission and team.",
};

const values = [
  {
    title: "Circular design",
    description:
      "We transform kombucha cellulose into durable biomaterials that can be regenerated and reused.",
  },
  {
    title: "Community first",
    description:
      "Our programs are built with rural craftspeople to unlock new revenue streams close to home.",
  },
  {
    title: "Radical transparency",
    description:
      "From sourcing to finishing, we document every step so partners can see how their leather is made.",
  },
];

const milestones = [
  {
    label: "Workshops run",
    value: "120+",
    detail: "Hands-on trainings delivered with local cooperatives across the region.",
  },
  {
    label: "Kilos upcycled",
    value: "8.5k",
    detail: "Organic waste diverted from landfills by turning it into textile-grade sheets.",
  },
  {
    label: "Partner studios",
    value: "42",
    detail: "Makerspaces sharing Symbia techniques to accelerate material adoption.",
  },
];

export default function AboutPage() {
  return (
    <div className="leather-bg relative min-h-screen overflow-hidden text-emerald-50">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/25 via-transparent to-black/70" />

      <header className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 px-6 py-16 text-left">
        <div className="flex items-center justify-between text-sm uppercase tracking-[0.12em] text-emerald-100/80">
          <span>Symbia</span>
          <Link className="transition hover:text-emerald-300" href="/">
            Back to home
          </Link>
        </div>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.12em] text-emerald-200/70">About us</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
            Building a softer future with science and craft
          </h1>
          <p className="max-w-3xl text-lg text-emerald-100/80">
            Symbia grows leather alternatives from kombucha culture and bacterial cellulose. We pair lab-backed
            experimentation with the wisdom of rural artisans to deliver resilient, traceable materials that keep
            communities and ecosystems in balance.
          </p>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex max-w-5xl flex-col gap-14 px-6 pb-20">
        <section className="grid gap-6 rounded-3xl border border-emerald-200/15 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="space-y-3">
              <p className="text-sm uppercase tracking-[0.08em] text-emerald-200/70">{value.title}</p>
              <p className="text-base text-emerald-100/85">{value.description}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {milestones.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-3 rounded-3xl border border-emerald-200/20 bg-white/5 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur"
            >
              <p className="text-xs uppercase tracking-[0.08em] text-emerald-200/70">{item.label}</p>
              <p className="text-4xl font-semibold text-emerald-100">{item.value}</p>
              <p className="text-sm text-emerald-100/75">{item.detail}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 rounded-3xl border border-emerald-200/15 bg-white/5 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-emerald-50">Why we exist</h2>
            <p className="text-base text-emerald-100/80">
              Traditional leather carries a heavy environmental footprint. Symbia&#39;s material is brewed rather than tanned,
              allowing farmers and craftspeople to convert waste into textiles without toxic runoff. Every batch is tested for
              strength, flexibility, and longevity so partners can prototype boldly.
            </p>
            <p className="text-base text-emerald-100/80">
              We believe good design should circulate value locally. By sharing repeatable recipes and open workshops, we invite
              brands, makers, and researchers to scale circular production together.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border border-emerald-200/15 bg-emerald-900/40 p-6 shadow-inner shadow-black/40">
            <p className="text-sm uppercase tracking-[0.08em] text-emerald-200/70">Get involved</p>
            <ul className="space-y-3 text-emerald-50/90">
              <li>• Commission a capsule collection with Symbia leather.</li>
              <li>• Host a skills exchange in your local makerspace.</li>
              <li>• Collaborate on R&D to tune performance for your product line.</li>
            </ul>
            <Link
              className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200/30 px-4 py-2 text-sm font-semibold text-emerald-50 transition hover:border-emerald-300 hover:text-emerald-200"
              href="mailto:hello@symbia.studio"
            >
              Start a conversation
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
