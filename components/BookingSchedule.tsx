"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DateSelector from "./DateSelector";
import TimeSlotGrid from "./TimeSlotGrid";
import BookingCart from "./BookingCart";
import { getAvailabilityForDate, getCourtsForSport, todayISOInBrunei } from "@/lib/mockData";
import { useBooking } from "@/lib/bookingContext";
import type { Sport, TimeSlot } from "@/lib/types";

export default function BookingSchedule({
  sport,
  initialDate,
  initialDuration,
}: {
  sport: Sport;
  initialDate?: string;
  initialDuration?: number;
}) {
  const router = useRouter();
  const { bookedKeys, addToCart, cart } = useBooking();
  const today = todayISOInBrunei();
  const startDate = initialDate && initialDate >= today ? initialDate : today;

  const [selectedDate, setSelectedDate] = useState(startDate);
  const [windowStart, setWindowStart] = useState(startDate);
  const [durationHours] = useState(initialDuration ?? 1);
  const [pick, setPick] = useState<{ courtId: string; courtNumber: number; time: TimeSlot } | null>(
    null
  );

  const courts = useMemo(() => getCourtsForSport(sport.slug), [sport.slug]);
  const slots = useMemo(
    () => getAvailabilityForDate(sport.slug, selectedDate, bookedKeys),
    [sport.slug, selectedDate, bookedKeys]
  );

  function handleSelectDate(date: string) {
    setSelectedDate(date);
    setPick(null);
  }

  function handleShiftWindow(days: number) {
    const next = addDaysClamped(windowStart, days, today);
    setWindowStart(next);
  }

  function handleSelectSlot(courtId: string, time: TimeSlot) {
    const courtInfo = courts.find((c) => c.id === courtId);
    if (!courtInfo) return;
    const already = pick?.courtId === courtId && pick.time.start === time.start;
    setPick(already ? null : { courtId, courtNumber: courtInfo.number, time });
  }

  const selection = pick
    ? {
        sport: sport.slug,
        courtId: pick.courtId,
        courtNumber: pick.courtNumber,
        date: selectedDate,
        time: pick.time,
        durationHours,
        pricePerHour: sport.pricePerHour,
      }
    : null;

  function handleAddToCart() {
    if (!selection) return;
    addToCart(selection);
    setPick(null);
  }

  function handleCheckout() {
    if (cart.length === 0) return;
    router.push(`/booking/${sport.slug}/details`);
  }

  return (
    <div className="container-px mx-auto max-w-[1400px] py-10 lg:py-12">
      <p className="text-xs font-semibold tracking-wide text-brand">
        _BOOKING {">"} {sport.name.toUpperCase()} {">"} SELECT TIME
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {sport.name.toUpperCase()} COURT BOOKING
      </h1>
      <p className="mt-2 text-sm text-muted">Choose your date and time slot. Add multiple courts to your cart.</p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
        <div className="lg:order-1">
          <div className="lg:sticky lg:top-24">
            <BookingCart
              sport={sport}
              currentSelection={selection}
              onAddToCart={handleAddToCart}
              onCheckout={handleCheckout}
              cartItems={cart}
            />
          </div>
        </div>

        <div className="lg:order-2">
          <div className="rounded-xl border border-border p-5 sm:p-6">
            <DateSelector
              windowStart={windowStart}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              onShiftWindow={handleShiftWindow}
            />

            <div className="mt-7">
              <TimeSlotGrid
                courts={courts}
                slots={slots}
                selectedCourtId={pick?.courtId ?? null}
                selectedTimeStart={pick?.time.start ?? null}
                onSelect={handleSelectSlot}
                cartItems={cart}
              />
            </div>
          </div>

          <p className="mt-4 text-xs text-muted">
            Prices shown in Brunei Dollar (BND). Times shown in Brunei local time (UTC+8).{" "}
            <Link href="/pricing" className="text-brand">
              View full pricing
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function addDaysClamped(iso: string, days: number, floor: string) {
  const d = new Date(`${iso}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + days);
  const next = d.toISOString().slice(0, 10);
  return next < floor ? floor : next;
}
