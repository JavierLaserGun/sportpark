"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import BookingSummary from "./BookingSummary";
import BookingForm from "./BookingForm";
import { useBooking } from "@/lib/bookingContext";
import type { CustomerInfo, Sport } from "@/lib/types";

export default function BookingReview({ sport }: { sport: Sport }) {
  const router = useRouter();
  const { selection, pendingCustomer, setPendingCustomer, hydrated } = useBooking();

  useEffect(() => {
    if (hydrated && (!selection || selection.sport !== sport.slug)) {
      router.replace(`/booking/${sport.slug}`);
    }
  }, [hydrated, selection, sport.slug, router]);

  if (!hydrated || !selection || selection.sport !== sport.slug) {
    return (
      <div className="container-px mx-auto max-w-[1400px] py-16 text-sm text-muted">
        Loading your selection…
      </div>
    );
  }

  function handleSubmit(info: CustomerInfo) {
    setPendingCustomer(info);
    router.push(`/booking/${sport.slug}/payment`);
  }

  return (
    <div className="container-px mx-auto max-w-[1400px] py-10 lg:py-12">
      <p className="text-xs font-semibold tracking-wide text-brand">
        <Link href={`/booking/${sport.slug}`} className="hover:underline">
          _BOOKING {">"} {sport.name.toUpperCase()}
        </Link>{" "}
        {">"} REVIEW & DETAILS
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
        REVIEW YOUR BOOKING
      </h1>
      <p className="mt-2 text-sm text-muted">Confirm your selection and enter your details.</p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
        <div>
          <div className="lg:sticky lg:top-24">
            <BookingSummary sport={sport} selection={selection} hideAction />
          </div>
        </div>

        <div>
          <BookingForm initial={pendingCustomer ?? undefined} onSubmit={handleSubmit} submitLabel="_CONTINUE TO PAYMENT" />
        </div>
      </div>
    </div>
  );
}
