import { notFound } from "next/navigation";
import BookingPayment from "@/components/BookingPayment";
import { SPORT_LIST } from "@/lib/mockData";
import type { SportSlug } from "@/lib/types";

const sportMap = Object.fromEntries(SPORT_LIST.map(s => [s.slug, s]));

export function generateStaticParams() {
  return SPORT_LIST.map((sport) => ({ sport: sport.slug }));
}

export default async function BookingPaymentPage({ params }: { params: Promise<{ sport: string }> }) {
  const { sport: sportParam } = await params;
  if (!isSportSlug(sportParam)) notFound();
  return <BookingPayment sport={sportMap[sportParam]} />;
}

function isSportSlug(value: string): value is SportSlug {
  return value === "pickleball" || value === "futsal";
}
