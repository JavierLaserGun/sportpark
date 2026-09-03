import { CalendarIcon, CardIcon, ClockIcon, PinIcon } from "./Icons";

const FEATURES = [
  {
    icon: CalendarIcon,
    title: "EASY BOOKING",
    description: "Book your court in seconds online.",
  },
  {
    icon: CardIcon,
    title: "SECURE PAYMENT",
    description: "Safe and cashless transactions.",
  },
  {
    icon: ClockIcon,
    title: "FLEXIBLE SCHEDULE",
    description: "Hourly bookings that fit your time.",
  },
  {
    icon: PinIcon,
    title: "PRIME LOCATION",
    description: "Conveniently located at Laksamana College of Business.",
  },
];

export default function FeatureColumns() {
  return (
    <section className="border-y border-border bg-background">
      <div className="container-px mx-auto grid max-w-[1400px] grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {FEATURES.map((f) => (
          <div key={f.title}>
            <div className="flex h-11 w-11 items-center justify-center rounded-md border border-border">
              <f.icon className="h-5 w-5 text-brand" />
            </div>
            <h3 className="mt-4 text-sm font-bold tracking-wide">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.description}</p>
            <a href="#" className="mt-2 inline-block text-sm text-brand">
              {"> more info"}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
