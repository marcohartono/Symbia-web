"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { useWaitlist } from "@/lib/waitlist-context";

type NavLink = {
  href: string;
  label: string;
  type: "section" | "route";
};

const navLinks: NavLink[] = [
  { href: "#home", label: "Home", type: "section" },
  { href: "/about", label: "About", type: "route" },
  { href: "#contact", label: "Contact", type: "section" },
];

type NavbarProps = {
  onHomePage?: boolean;
};

export default function Navbar({ onHomePage = false }: NavbarProps) {
  const { open } = useWaitlist();

  const handleNavClick =
    (id?: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (!id) return;
      event.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

  return (
    <nav className="sticky top-0 z-20 px-6 pt-5 pb-3">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-cream transition-colors hover:text-coral"
        >
          Symbia
        </Link>

        {/* Links */}
        <div className="flex items-center gap-7 text-xs uppercase tracking-[0.14em] text-cream/50">
          {navLinks.map((link) => {
            const href =
              link.type === "section"
                ? `${onHomePage ? "" : "/"}${link.href}`
                : link.href;
            return (
              <Link
                key={link.href}
                className="transition-colors hover:text-cream"
                href={href}
                onClick={
                  onHomePage && link.type === "section"
                    ? handleNavClick(link.href.slice(1))
                    : undefined
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <button
          onClick={open}
          className="rounded-full border border-coral/50 bg-coral/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-coral transition hover:bg-coral hover:text-soft"
        >
          Join waitlist
        </button>
      </div>
    </nav>
  );
}
