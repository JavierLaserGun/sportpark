import BookingSchedule from "@/components/BookingSchedule";
import { SPORT_LIST } from "@/lib/mockData";

export function generateStaticParams() {
  return SPORT_LIST.map((sport) => ({ sport: sport.slug }));
}

export default async function BookingSportPage({ params }: { params: Promise<{ sport: string }> }) {
  const { sport: sportSlug } = await params;

  // Find the sport from the slug
  const sport = SPORT_LIST.find((s) => s.slug === sportSlug);

  if (!sport) {
    return (
      <div className="container-px mx-auto max-w-[1400px] py-14 lg:py-20">
        <p className="text-center text-muted">Sport not found</p>
      </div>
    );
  }

  return <BookingSchedule sport={sport} />;
}
