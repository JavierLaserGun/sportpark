"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircleIcon } from "./Icons";
import { formatDateLong, SPORT_LIST } from "@/lib/mockData";
import { useBooking } from "@/lib/bookingContext";

export default function BookingConfirmation() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const { bookings, hydrated } = useBooking();

  if (!hydrated) {
    return (
      <div className="container-px mx-auto max-w-[1400px] py-16 text-sm text-muted">Loading…</div>
    );
  }

  const booking = bookings.find((b) => b.reference === ref);

  if (!booking) {
    return (
      <div className="container-px mx-auto max-w-[900px] py-20 text-center">
        <h1 className="text-2xl font-bold">Booking not found</h1>
        <p className="mt-2 text-sm text-muted">
          We couldn&apos;t find that booking reference in this session.
        </p>
        <Link href="/booking" className="mt-6 inline-block text-sm text-brand">
          {"> "}Back to booking
        </Link>
      </div>
    );
  }

  const sport = SPORT_LIST[booking.sport];

  return (
    <div className="container-px mx-auto max-w-[760px] py-14 lg:py-20">
      <div className="rounded-xl border border-border p-8 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <CheckCircleIcon className="h-12 w-12 text-brand" />
          <p className="mt-4 text-sm font-semibold tracking-wide text-brand">// BOOKING CONFIRMED</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
            You&apos;re all set, {booking.customer.fullName.split(" ")[0]}!
          </h1>
          <p className="mt-2 max-w-sm text-sm text-muted">
            A confirmation has been recorded for your session. Show your booking reference at the
            front desk when you arrive.
          </p>
        </div>

        <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
          <Row label="BOOKING REFERENCE" value={booking.reference} strong />
          <Row label="SPORT" value={sport.name} />
          <Row label="COURT NUMBER" value={`Court ${booking.courtNumber}`} />
          <Row label="DATE" value={formatDateLong(booking.date)} />
          <Row label="TIME" value={booking.time.label} />
          <Row label="DURATION" value={`${booking.durationHours} Hour${booking.durationHours > 1 ? "s" : ""}`} />
          <Row label="TOTAL PAID" value={`BND $${booking.total.toFixed(2)}`} strong />
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/account"
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            _VIEW MY BOOKING
          </Link>
          <Link
            href="/"
            className="flex flex-1 items-center justify-center rounded-md border border-border-strong py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground"
          >
            _BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <dt className="text-xs font-semibold tracking-wide text-muted">{label}</dt>
      <dd className={strong ? "font-bold text-brand" : "font-medium"}>{value}</dd>
    </div>
  );
}
