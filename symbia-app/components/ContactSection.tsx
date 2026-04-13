"use client";

import { FormEvent } from "react";

type ContactSectionProps = {
  email: string;
};

export default function ContactSection({ email }: ContactSectionProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = (formData.get("name") as string | null)?.trim() || "";
    const senderEmail = (formData.get("email") as string | null)?.trim() || "";
    const message = (formData.get("message") as string | null)?.trim() || "";

    const subject = encodeURIComponent("Symbia contact inquiry");
    const body = encodeURIComponent(
      [
        name && `Name: ${name}`,
        senderEmail && `Email: ${senderEmail}`,
        "",
        message || "Message:",
      ]
        .filter(Boolean)
        .join("\n"),
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="w-full text-left"
      aria-label="Contact Symbia"
    >
      <div className="mb-10 grid gap-4 md:grid-cols-[1fr_1fr] md:items-end">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/60">
            Get in touch
          </p>
          <h2 className="font-display text-4xl font-bold text-cream">
            Let&apos;s work together
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-cream/50 md:text-right">
          We read every note. We&apos;ll respond from{" "}
          <a
            className="text-cream/70 underline decoration-cream/20 underline-offset-4 transition hover:text-coral"
            href={`mailto:${email}`}
          >
            {email}
          </a>
          .
        </p>
      </div>

      <div className="card-surface rounded-2xl p-7">
        <form
          onSubmit={handleSubmit}
          className="grid gap-5 md:grid-cols-2"
          autoComplete="off"
        >
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.1em] text-cream/40">Your name</span>
            <input
              className="w-full rounded-xl border border-blush/10 bg-black/20 px-4 py-3 text-sm text-cream outline-none transition placeholder:text-cream/20 focus:border-coral/40 focus:bg-black/10"
              name="name"
              type="text"
              placeholder="Rayden Yap"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.1em] text-cream/40">Email</span>
            <input
              className="w-full rounded-xl border border-blush/10 bg-black/20 px-4 py-3 text-sm text-cream outline-none transition placeholder:text-cream/20 focus:border-coral/40 focus:bg-black/10"
              name="email"
              type="email"
              placeholder="you@example.com"
            />
          </label>

          <label className="md:col-span-2 space-y-2">
            <span className="text-xs uppercase tracking-[0.1em] text-cream/40">How can we help?</span>
            <textarea
              className="min-h-[120px] w-full rounded-xl border border-blush/10 bg-black/20 px-4 py-3 text-sm text-cream outline-none transition placeholder:text-cream/20 focus:border-coral/40 focus:bg-black/10"
              name="message"
              placeholder="Tell us about your product, collaboration, or event."
              required
            />
          </label>

          <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-cream/30">
              Submitting opens your email client with the details pre-filled.
            </p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-soft transition hover:bg-amber-warm"
            >
              Send message
              <span aria-hidden>↗</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
