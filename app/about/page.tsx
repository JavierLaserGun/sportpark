import Link from "next/link";
import { ArrowUpRightIcon, CalendarIcon, CardIcon, ClockIcon, PinIcon } from "@/components/Icons";

const VALUES = [
  { icon: CalendarIcon, title: "EASY BOOKING", description: "A booking system built for how students and staff actually plan their day." },
  { icon: CardIcon, title: "SECURE PAYMENT", description: "Cashless, transparent pricing with no hidden charges." },
  { icon: ClockIcon, title: "FLEXIBLE SCHEDULE", description: "Open daily from 08:00 to 22:00 to fit around classes and work." },
  { icon: PinIcon, title: "PRIME LOCATION", description: "Located on campus at Laksamana College of Business, Bandar Seri Begawan." },
];

export default function AboutPage() {
  return (
    <div className="container-px mx-auto max-w-[1400px] py-14 lg:py-20">
      <p className="text-sm font-semibold tracking-wide text-brand">// ABOUT US</p>
      <h1 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
        BUILT FOR PLAYERS, STUDENTS, AND THE LCB COMMUNITY.
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
        Sport Park is Laksamana College of Business&apos; indoor sports facility — two premium
        courts built to give students, staff, and the wider community a proper place to train,
        compete, and unwind. We built the booking experience the way we&apos;d want to use it
        ourselves: fast, clear, and no back-and-forth over the phone.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v) => (
          <div key={v.title}>
            <div className="flex h-11 w-11 items-center justify-center rounded-md border border-border">
              <v.icon className="h-5 w-5 text-brand" />
            </div>
            <h3 className="mt-4 text-sm font-bold tracking-wide">{v.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{v.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 rounded-xl border border-border p-8 lg:grid-cols-[1.2fr_1fr] lg:p-10">
        <div>
          <p className="text-sm font-semibold tracking-wide text-brand">// LAKSAMANA COLLEGE OF BUSINESS</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Laksamana College of Business (LCB) is a higher-education institution in Bandar Seri
            Begawan, Brunei Darussalam. Sport Park is part of LCB&apos;s campus facilities,
            supporting student wellbeing and community sport alongside academic life.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-3 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <p className="text-sm">
            <span className="text-brand">{">"}</span> Bandar Seri Begawan, Brunei Darussalam
          </p>
          <p className="text-sm">
            <span className="text-brand">{">"}</span> Open daily, 08:00 – 22:00
          </p>
          <Link
            href="/booking"
            className="mt-2 flex w-fit items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            _BOOK NOW
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
