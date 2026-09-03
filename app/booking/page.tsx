"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowUpRightIcon } from "@/components/Icons";
import { SPORT_LIST } from "@/lib/mockData";
import { useBooking } from "@/lib/bookingContext";

const COURT_IMAGES = { pickleball: "/pickleball-court.png", futsal: "/futsal-court.png" };

export default function BookingSportSelect() {
  const router = useRouter();
  const { account, hydrated } = useBooking();

  useEffect(() => {
    if (hydrated && !account) {
      router.push("/login");
    }
  }, [hydrated, account, router]);

  // Show loading state while checking auth
  if (!hydrated || !account) {
    return (
      <div className="container-px mx-auto max-w-[1400px] py-14 lg:py-20">
        <p className="text-center text-muted">Checking login status...</p>
      </div>
    );
  }

  return (
    <div className="container-px mx-auto max-w-[1400px] py-14 lg:py-20">
      <p className="text-xs font-semibold tracking-wide text-brand">_BOOKING {">"} SELECT SPORT</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">CHOOSE YOUR SPORT</h1>
      <p className="mt-2 max-w-lg text-sm text-muted">
        Pick Pickleball or Futsal to see live court availability and book your hourly slot.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        {SPORT_LIST.map((sport, i) => {
          const imageUrl = COURT_IMAGES[sport.image];
          return (
            <Link
              key={sport.slug}
              href={`/booking/${sport.slug}`}
              className="group overflow-hidden rounded-xl border border-border transition-shadow hover:shadow-md"
            >
              <div className="relative h-64 w-full overflow-hidden bg-gray-50 sm:h-72 flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt={`${sport.name} Court Diagram`}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-brand">{(i + 1).toString().padStart(2, "0")}</p>
                <h2 className="mt-1 text-xl font-bold uppercase tracking-tight">{sport.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{sport.shortDescription}</p>
                <p className="mt-4 text-lg font-bold">
                  BND ${sport.pricePerHour.toFixed(2)} <span className="text-sm font-normal text-muted">/ HOUR</span>
                </p>
                <span className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-brand py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-brand-dark">
                  _SELECT DATE & TIME
                  <ArrowUpRightIcon className="h-4 w-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
