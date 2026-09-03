import { notFound } from "next/navigation";
import BookingPayment from "@/components/BookingPayment";
import { SPORT_LIST } from "@/lib/mockData";
import type { SportSlug } from "@/lib/types";

export function generateStaticParams() {
  return Object.keys(SPORT_LIST).map((sport) => ({ sport }));
}

export default async function BookingPaymentPage({ params }: { params: Promise<{ sport: string }> }) {
  const { sport: sportParam } = await params;
  if (!isSportSlug(sportParam)) notFound();
  return <BookingPayment sport={SPORT_LIST[sportParam]} />;
}

function isSportSlug(value: string): value is SportSlug {
  return value === "pickleball" || value === "futsal";
}
