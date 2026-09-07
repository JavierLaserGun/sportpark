import BookingCheckoutDetails from "@/components/BookingCheckoutDetails";
import { SPORT_LIST } from "@/lib/mockData";

export function generateStaticParams() {
  return SPORT_LIST.map((sport) => ({ sport: sport.slug }));
}

export default function Page() {
  return <BookingCheckoutDetails />;
}
