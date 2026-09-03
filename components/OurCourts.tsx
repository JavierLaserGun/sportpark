import CourtCard from "./CourtCard";
import { SPORT_LIST } from "@/lib/mockData";

export default function OurCourts() {
  return (
    <section className="container-px mx-auto max-w-[1400px] py-16 lg:py-20">
      <p className="text-sm font-semibold tracking-wide text-brand">// OUR COURTS</p>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {SPORT_LIST.map((sport, i) => (
          <CourtCard key={sport.slug} sport={sport} index={i + 1} />
        ))}
      </div>
    </section>
  );
}
