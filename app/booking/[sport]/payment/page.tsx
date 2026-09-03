import { notFound } from "next/navigation";
import BookingPayment from "@/components/BookingPayment";
import { SPORTS } from "@/lib/mockData";
import type { SportSlug } from "@/lib/types";

export function generateStaticParams() {
  return Object.keys(SPORTS).map((sport) => ({ sport }));
}

export default async function BookingPaymentPage({ params }: { params: Promise<{ sport: string }> }) {
  const { sport: sportParam } = await params;
  if (!isSportSlug(sportParam)) notFound();
  return <BookingPayment sport={SPORTS[sportParam]} />;
}

function isSportSlug(value: string): value is SportSlug {
  return value === "pickleball" || value === "futsal";
}
