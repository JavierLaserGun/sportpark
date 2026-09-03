"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import BookingSummary from "./BookingSummary";
import { CardIcon, LockIcon } from "./Icons";
import { useBooking } from "@/lib/bookingContext";
import type { Sport } from "@/lib/types";

export default function BookingPayment({ sport }: { sport: Sport }) {
  const router = useRouter();
  const { selection, pendingCustomer, confirmBooking, hydrated } = useBooking();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated && (!selection || selection.sport !== sport.slug || !pendingCustomer)) {
      router.replace(`/booking/${sport.slug}`);
    }
  }, [hydrated, selection, pendingCustomer, sport.slug, router]);

  if (!hydrated || !selection || selection.sport !== sport.slug || !pendingCustomer) {
    return (
      <div className="container-px mx-auto max-w-[1400px] py-16 text-sm text-muted">
        Loading your booking…
      </div>
    );
  }

  function handlePay() {
    if (!pendingCustomer) return;
    setError(null);
    setProcessing(true);
    // Mock payment processing delay — no real card/payment data is
    // collected or transmitted anywhere in this demo flow.
    setTimeout(() => {
      const booking = confirmBooking(pendingCustomer);
      setProcessing(false);
      if (!booking) {
        setError(
          "Sorry, this slot was just booked by someone else. Please choose another time."
        );
        return;
      }
      router.push(`/booking/confirmation?ref=${booking.reference}`);
    }, 900);
  }

  return (
    <div className="container-px mx-auto max-w-[1400px] py-10 lg:py-12">
      <p className="text-xs font-semibold tracking-wide text-brand">
        <Link href={`/booking/${sport.slug}`} className="hover:underline">
          _BOOKING {">"} {sport.name.toUpperCase()}
        </Link>{" "}
        {">"} PAYMENT
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">PAYMENT</h1>
      <p className="mt-2 text-sm text-muted">Review the amount due and confirm your booking.</p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
        <div>
          <div className="lg:sticky lg:top-24">
            <BookingSummary sport={sport} selection={selection} hideAction />
          </div>
        </div>

        <div className="rounded-xl border border-border p-6">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-brand">
            <LockIcon className="h-4 w-4" />
            // SECURE PAYMENT (DEMO)
          </p>

          <div className="mt-5 flex items-center gap-3 rounded-md border border-border bg-brand-tint p-4">
            <CardIcon className="h-6 w-6 shrink-0 text-brand" />
            <div className="text-sm">
              <p className="font-semibold">Cashless checkout</p>
              <p className="text-muted">
                This is a demo checkout — no real card details are collected or charged.
              </p>
            </div>
          </div>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Booking for</dt>
              <dd className="font-medium">{pendingCustomer.fullName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">
                {sport.name} · Court {selection.courtNumber}
              </dt>
              <dd className="font-medium">
                {selection.durationHours} hr{selection.durationHours > 1 ? "s" : ""}
              </dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
              <dt>Total due</dt>
              <dd className="text-brand">
                BND ${(selection.pricePerHour * selection.durationHours).toFixed(2)}
              </dd>
            </div>
          </dl>

          {error && (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handlePay}
            disabled={processing}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70"
          >
            {processing ? "PROCESSING…" : "_PAY & CONFIRM BOOKING"}
          </button>
        </div>
      </div>
    </div>
  );
}
