import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/Icons";
import { SPORT_LIST } from "@/lib/mockData";

const NOTES = [
  "All prices are in Brunei Dollar (BND) and shown per hour, per court.",
  "Bookings are hourly — select 1, 2, or 3 consecutive hours at checkout.",
  "Payment is collected online at the time of booking.",
  "Cancellations made at least 24 hours in advance are eligible for a full refund — see our Refund Policy.",
];

export default function PricingPage() {
  return (
    <div className="container-px mx-auto max-w-[1400px] py-14 lg:py-20">
      <p className="text-sm font-semibold tracking-wide text-brand">// PRICING</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">SIMPLE, HOURLY PRICING</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        No memberships, no hidden fees. Pay by the hour for the court you want, when you want it.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        {SPORT_LIST.map((sport, i) => (
          <div key={sport.slug} className="rounded-xl border border-border p-8">
            <p className="text-sm font-semibold text-brand">{(i + 1).toString().padStart(2, "0")}</p>
            <h2 className="mt-1 text-xl font-bold uppercase tracking-tight">{sport.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{sport.shortDescription}</p>

            <div className="mt-6 flex items-end gap-2">
              <span className="text-4xl font-extrabold text-brand">${sport.pricePerHour.toFixed(2)}</span>
              <span className="pb-1 text-sm text-muted">BND / hour</span>
            </div>

            <ul className="mt-6 space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-brand">{">"}</span>
                {sport.courtsCount} {sport.courtsCount > 1 ? "courts" : "court"} available
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand">{">"}</span>
                Book 1–3 hours per session
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand">{">"}</span>
                Secure cashless checkout
              </li>
            </ul>

            <Link
              href={`/booking/${sport.slug}`}
              className="mt-7 flex items-center justify-center gap-2 rounded-md border border-brand py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
            >
              _BOOK NOW
              <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-xl border border-border p-8">
        <p className="text-sm font-semibold tracking-wide text-brand">// GOOD TO KNOW</p>
        <ul className="mt-4 space-y-2.5 text-sm text-muted">
          {NOTES.map((note) => (
            <li key={note} className="flex items-start gap-2">
              <span className="mt-0.5 text-brand">{">"}</span>
              {note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
