import Image from "next/image";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import WaitlistButton from "@/components/WaitlistButton";
import { CONTACT_EMAIL } from "@/lib/constants";

export default function Home() {
  const processSteps = [
    {
      step: "01",
      label: "Fermenting sheets",
      caption: "Caption for step 1",
      src: "/process/step1.png",
    },
    {
      step: "02",
      label: "Drying and forming",
      caption: "Caption for step 2",
      src: "/process/step2.png",
    },
    {
      step: "03",
      label: "Finishing and finish",
      caption: "Caption for step 3",
      src: "/process/step3.png",
    },
  ];

  const galleryImages = Array.from({ length: 12 }).map((_, index) => {
    const num = index + 1;
    return { src: `/gallery/galery${num}.png`, alt: `Gallery image ${num}` };
  });

  const stats = [
    { value: "8,000kg+", label: "CO₂ offset" },
    { value: "16k+", label: "People reached" },
    { value: "5", label: "Provinces visited" },
  ];

  const stories = [
    {
      name: "Rayden, Yapper",
      quote:
        "Symbia's programs are very suitable for the people in our village because the materials needed are easily sourced, cheap, and environmentally friendly.",
    },
    {
      name: "Rayden, Thunder God",
      quote: "This leather is the first of its kind.",
    },
    {
      name: "Lebron James, The Goat",
      quote:
        "I was struck by how Rayden encouraged the workers by working alongside them.",
    },
  ];

  return (
    <div className="warm-bg relative min-h-screen overflow-hidden text-cream">
      <div className="absolute inset-0 bg-gradient-to-b from-coral/5 via-transparent to-black/60" />

      <Navbar onHomePage />

      <main className="relative z-10" id="home">

        {/* ── Hero ── */}
        <section className="mx-auto max-w-5xl px-6 pb-0 pt-16 md:pt-24">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-warm/60">
                Biofabrication · Indonesia
              </p>
              <h1 className="font-display text-6xl font-bold leading-[0.92] tracking-tight text-cream sm:text-7xl md:text-8xl">
                Grow&shy;ing the future of craft
              </h1>
              <p className="max-w-sm text-base leading-relaxed text-cream/60">
                Symbia grows leather from recycled Kombucha and bacterial cellulose — redefining sustainability and unlocking new income for rural craftspeople worldwide.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <WaitlistButton className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-soft transition hover:bg-amber-warm">
                  Join the waitlist
                </WaitlistButton>
                <a
                  href="/about"
                  className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.12em] text-cream/40 transition hover:text-cream"
                >
                  Our story →
                </a>
              </div>
            </div>

            <div className="relative h-[420px] w-full overflow-hidden rounded-2xl md:h-[520px]">
              <Image
                src="/landing/landing.png"
                alt="Symbia bioleather material"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 480px, 90vw"
                unoptimized
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        </section>

        {/* ── Stats strip ── */}
        <section className="mx-auto max-w-5xl px-6 py-14" aria-label="Impact metrics">
          <div className="grid grid-cols-3 divide-x divide-blush/10 card-surface rounded-2xl">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 px-6 py-7">
                <span className="font-display text-3xl font-bold text-coral md:text-4xl">
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-[0.12em] text-cream/45">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-blush/20 to-transparent" />
        </div>

        {/* ── Process ── */}
        <section
          className="mx-auto max-w-5xl space-y-10 px-6 py-20"
          id="process"
          aria-label="Symbia leather creation process"
        >
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/60">
                How it&apos;s made
              </p>
              <h2 className="font-display text-4xl font-bold text-cream">
                The process
              </h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm leading-relaxed text-cream/45 md:block">
              From SCOBY culture to finished bioleather — entirely fermentation-based.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {processSteps.map((step, index) => (
              <div
                key={step.label}
                className="group relative overflow-hidden card-surface rounded-2xl transition-transform duration-500 hover:-translate-y-1"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={step.src}
                    alt={step.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 320px, 90vw"
                    unoptimized
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <span className="absolute left-4 top-4 font-display text-5xl font-bold leading-none text-white/10">
                    {step.step}
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-display text-base font-bold text-cream">
                    {step.label}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.1em] text-amber-warm/50">
                    {step.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-blush/20 to-transparent" />
        </div>

        {/* ── Gallery ── */}
        <section
          className="py-20"
          id="gallery"
          aria-label="Symbia gallery"
        >
          <div className="mx-auto mb-8 max-w-5xl px-6">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/60">
              In the field
            </p>
            <h2 className="font-display mt-1 text-4xl font-bold text-cream">
              Our work
            </h2>
          </div>

          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#1C1108] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#1C1108] to-transparent" />

            <div className="space-y-3">
              <div className="marquee-row animate-marquee-left">
                {[...galleryImages, ...galleryImages].map((item, i) => (
                  <div key={`top-${i}-${item.src}`} className="marquee-item">
                    <div className="relative h-44 w-64 overflow-hidden rounded-xl">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                        sizes="256px"
                        unoptimized
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="marquee-row animate-marquee-right">
                {[...galleryImages, ...galleryImages].map((item, i) => (
                  <div key={`bottom-${i}-${item.src}`} className="marquee-item">
                    <div className="relative h-44 w-64 overflow-hidden rounded-xl">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                        sizes="256px"
                        unoptimized
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-blush/20 to-transparent" />
        </div>

        {/* ── Stories ── */}
        <section
          className="mx-auto max-w-5xl space-y-10 px-6 py-20"
          id="stories"
          aria-label="Real stories"
        >
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/60">
              Community voices
            </p>
            <h2 className="font-display text-4xl font-bold text-cream">
              Real stories
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {stories.map((story) => (
              <div
                key={story.name}
                className="card-surface flex flex-col gap-5 rounded-2xl p-6"
              >
                <span className="font-display text-5xl leading-none text-coral/25" aria-hidden>
                  &ldquo;
                </span>
                <p className="flex-1 text-sm leading-relaxed text-cream/75">
                  {story.quote}
                </p>
                <div className="h-px bg-blush/10" />
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-warm/60">
                  {story.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <div className="mx-auto max-w-5xl px-6 pb-24">
          <ContactSection email={CONTACT_EMAIL} />
        </div>

      </main>
    </div>
  );
}
