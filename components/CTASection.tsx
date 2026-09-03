import Link from "next/link";
import { ArrowUpRightIcon } from "./Icons";

export default function CTASection() {
  return (
    <section className="container-px mx-auto max-w-[1400px] pb-16 lg:pb-24">
      <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-border bg-brand-tint p-8 sm:flex-row sm:items-center lg:p-10">
        <div>
          <p className="text-sm font-semibold tracking-wide text-brand">/{">"} READY TO PLAY?</p>
          <p className="mt-2 text-sm text-foreground/70">
            Join the Sport Park community and book your court today.
          </p>
        </div>
        <Link
          href="/booking"
          className="flex shrink-0 items-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          _BOOK NOW
          <ArrowUpRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
