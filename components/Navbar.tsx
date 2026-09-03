"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon, CloseIcon } from "./Icons";
import { useBooking } from "@/lib/bookingContext";
import { useAdmin } from "@/lib/adminContext";

const NAV_LINKS = [
  { href: "/", label: "_HOME" },
  { href: "/booking", label: "_BOOKING" },
  { href: "/pricing", label: "_PRICING" },
  { href: "/about", label: "_ABOUT" },
  { href: "/contact", label: "_CONTACT" },
  { href: "/terms", label: "_TERMS" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { account, hydrated } = useBooking();
  const { admin: adminUser, hydrated: adminHydrated } = useAdmin();
  const loggedIn = hydrated && !!account;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-px mx-auto flex h-[76px] max-w-[1400px] items-center justify-between">
        <Link href="/" className="flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="text-brand">{"</>"}</span>
            <span>SPORT_PARK.play</span>
          </span>
          <span className="text-[10px] text-muted">// by_Laksamana_College_of_Business</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  active ? "text-brand" : "text-foreground/80 hover:text-brand"
                }`}
              >
                {link.label}
                {active && <span className="mt-0.5 block h-[2px] bg-brand" />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={loggedIn ? "/account" : "/login"}
            className="flex items-center gap-2 rounded-md border border-brand px-4 py-2 text-sm text-brand transition-colors hover:bg-brand hover:text-white"
          >
            <UserGlyph />
            {loggedIn ? "_MY ACCOUNT" : "_LOGIN"}
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-px mx-auto flex max-w-[1400px] flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2.5 text-sm ${
                    active ? "bg-brand-tint text-brand" : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={loggedIn ? "/account" : "/login"}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md border border-brand px-3 py-2.5 text-center text-sm text-brand"
            >
              {loggedIn ? "_MY ACCOUNT" : "_LOGIN"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function UserGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8.2" r="3.2" />
      <path d="M5 20c1.2-3.6 4-5.4 7-5.4s5.8 1.8 7 5.4" strokeLinecap="round" />
    </svg>
  );
}
