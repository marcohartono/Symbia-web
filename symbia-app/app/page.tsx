import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  const processSteps = [
    {
      label: "Fermenting sheets",
      caption: "Caption for step 1",
      src: "/process/step1.png",
    },
    {
      label: "Drying and forming",
      caption: "Caption for step 2",
      src: "/process/step2.png",
    },
    {
      label: "Finishing and finish",
      caption: "Caption for step 3",
      src: "/process/step3.png",
    },
  ];
  const galleryImages = Array.from({ length: 12 }).map((_, index) => {
    const num = index + 1;
    return {
      src: `/gallery/galery${num}.png`,
      alt: `Gallery image ${num}`,
    };
  });

  const stories = [
    {
      name: "Rayden, Yapper",
      quote:
        "Symbia’s programs are very suitable for the people in our village because the materials needed are easily sourced, cheap, and environmentally friendly.",
    },
    {
      name: "Rayden, Thunder God",
      quote:
        "This leather is the first of its kind.",
    },
    {
      name: "Lebron James, The Goat",
      quote:
        "I was struck by how Rayden encouraged the workers by working alongside them.",
    },
  ];

  return (
    <div className="leather-bg relative min-h-screen overflow-hidden text-emerald-50">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/25 via-transparent to-black/70" />

      <Navbar onHomePage />

      <main
        className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-16 px-6 py-20 text-center"
        id="home"
      >
        <section className="mt-8 grid w-full items-center gap-10 text-left md:grid-cols-[1.1fr_0.9fr] md:gap-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-semibold leading-tight sm:text-6xl md:text-7xl">
              Symbia
            </h1>
            <p className="max-w-2xl text-lg text-emerald-100/80">
              <span className="text-emerald-400">Growing</span> a future of
              functional sustainability
            </p>
            <p className="text-base text-emerald-100/85">
            Symbia grows leather out of recycled Kombucha and Bacterial culture
            to redefine functional sustainability and introduce a new source of
            income to rural craftspeople worldwide.
          </p>
          </div>
          <div className="relative h-80 w-full overflow-hidden sm:h-96">
            <Image
              src="/landing/landing.png"
              alt="Symbia landing visual"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 440px, 90vw"
              unoptimized
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </section>

  

        <section
          className="w-full max-w-5xl space-y-6 text-left"
          id="process"
          aria-label="Symbia leather creation process"
        >
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-semibold text-emerald-50">Process</h2>
            <p className="text-sm text-emerald-100/70 space-y-2">
            Our leather is created through a fermentation process using a symbiotic culture of bacteria and yeast (SCOBY), which produce cellulose nanofibers that extend into wide sheets to the naked eye. 
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {processSteps.map((step, index) => (
              <div
                key={step.label}
                className="group relative overflow-hidden rounded-3xl border border-emerald-200/20 bg-white/5 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-black/40">
                  <Image
                    src={step.src}
                    alt={step.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 320px, 90vw"
                    unoptimized
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-sm font-semibold text-emerald-50">
                    {step.label}
                  </p>
                  <p className="text-xs uppercase tracking-[0.08em] text-emerald-100/70">
                    {step.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="w-full max-w-6xl text-left"
          id="gallery"
          aria-label="Symbia gallery"
        >
          <div className="flex flex-col gap-1">
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-emerald-200/20 bg-white/5 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/70 via-black/40 to-transparent" />

            <div className="space-y-3">
              <div className="marquee-row animate-marquee-left">
                {[...galleryImages, ...galleryImages].map((item, i) => (
                  <div
                    key={`top-${i}-${item.src}`}
                    className="marquee-item"
                  >
                    <div className="relative h-40 w-56 overflow-hidden rounded-2xl border border-emerald-200/25 bg-black/30 shadow-inner shadow-black/40">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                        sizes="176px"
                        unoptimized
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="marquee-row animate-marquee-right">
                {[...galleryImages, ...galleryImages].map((item, i) => (
                  <div
                    key={`bottom-${i}-${item.src}`}
                    className="marquee-item"
                  >
                    <div className="relative h-40 w-56 overflow-hidden rounded-2xl border border-emerald-200/25 bg-black/30 shadow-inner shadow-black/40">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                        sizes="176px"
                        unoptimized
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="w-full max-w-5xl space-y-4 text-left"
          id="stories"
          aria-label="Real stories"
        >
          <div className="flex flex-wrap items-baseline gap-3 text-left">
            <h2 className="text-xl font-semibold text-emerald-50">Real stories</h2>
          </div>
          <div>
            <p className="text-sm text-emerald-100/70" >
              Voices from our valued customers and partners.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {stories.map((story) => (
              <div
                key={story.name}
                className="flex h-full flex-col justify-between gap-4 rounded-3xl border border-emerald-200/20 bg-white/5 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur"
              >
                <p className="text-base text-emerald-50">“{story.quote}”</p>
                <p className="text-sm font-semibold text-emerald-100/80">
                  {story.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div id="contact" className="text-sm text-emerald-100/60">
          Contact us:{" "}
          <a
            className="text-emerald-300 transition hover:text-emerald-200"
            href="mailto:hello@symbia.studio"
          >
            raydenyap@raydenthegayden
          </a>
        </div>
      </main>
    </div>
  );
}
