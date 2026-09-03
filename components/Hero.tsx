import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "./Icons";
import QuickBooking from "./QuickBooking";

export default function Hero() {
  return (
    <section className="container-px mx-auto max-w-[1400px] pb-12 pt-10 lg:pb-20 lg:pt-16">
      <div className="space-y-4 mb-8">
        <p className="text-sm font-semibold tracking-wide text-brand">// PLAY. CONNECT. ELEVATE.</p>
        <h1 className="font-mono text-4xl font-extrabold leading-[1.08] tracking-tight text-brand sm:text-5xl lg:text-[3.4rem]">
          BOOK YOUR COURT.
          <br />
          PLAY YOUR GAME.
        </h1>
        <p className="max-w-md text-base leading-relaxed text-foreground/70">
          Premium facilities.
          <br />
          Central location.
          <br />
          Built for performance.
        </p>
        <div className="space-y-1.5 text-sm">
          <p>
            <span className="text-brand">{">"}</span> Pickleball
          </p>
          <p>
            <span className="text-brand">{">"}</span> Futsal
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/booking"
            className="flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            _BOOK NOW
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/courts"
            className="rounded-md border border-border-strong px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground"
          >
            _VIEW COURTS
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12 items-start">
        <div className="rounded-xl overflow-hidden border border-border bg-white flex flex-col">
          <div className="relative flex-1 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] w-full">
            <Image
              src="/sport-park-building.png"
              alt="Sport Park Building"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </div>
          <p className="px-4 py-3 text-xs text-muted text-center bg-slate-50">// sport_park.building.axonometric</p>
        </div>

        <div className="lg:sticky lg:top-24">
          <QuickBooking variant="card" />
        </div>
      </div>
    </section>
  );
}
