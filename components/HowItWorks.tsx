import { CourtIcon, CalendarIcon, ClipboardIcon, SmileIcon, ArrowRightIcon } from "./Icons";

const STEPS = [
  {
    n: "01",
    icon: CourtIcon,
    title: "CHOOSE COURT",
    description: "Select Pickleball or Futsal.",
  },
  {
    n: "02",
    icon: CalendarIcon,
    title: "PICK DATE & TIME",
    description: "Choose your preferred booking date.",
  },
  {
    n: "03",
    icon: ClipboardIcon,
    title: "CONFIRM BOOKING",
    description: "Review the selected court, time and price.",
  },
  {
    n: "04",
    icon: SmileIcon,
    title: "PLAY & ENJOY",
    description: "Arrive at Sport Park and enjoy your game.",
  },
];

export default function HowItWorks() {
  return (
    <section className="container-px mx-auto max-w-[1400px] py-16 lg:py-20">
      <p className="text-sm font-semibold tracking-wide text-brand">// HOW IT WORKS</p>

      <div className="mt-8 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8 lg:flex lg:items-start lg:gap-3">
        {STEPS.map((step, i) => (
          <div key={step.n} className="contents">
            <div className="lg:flex-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-md border border-border">
                <step.icon className="h-5 w-5 text-brand" />
              </div>
              <p className="mt-4 text-xs font-semibold text-brand">{step.n}</p>
              <h3 className="mt-1 text-sm font-bold tracking-wide">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
            {i < STEPS.length - 1 && (
              <div className="hidden shrink-0 pt-5 lg:block">
                <ArrowRightIcon className="h-5 w-5 text-border-strong" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
