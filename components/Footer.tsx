import Link from "next/link";
import { PinIcon, PhoneIcon, MailIcon } from "./Icons";

const NAV = [
  { href: "/", label: "_Home" },
  { href: "/courts", label: "_Courts" },
  { href: "/booking", label: "_Booking" },
  { href: "/pricing", label: "_Pricing" },
  { href: "/about", label: "_About Us" },
  { href: "/contact", label: "_Contact" },
];

const SUPPORT = [
  { href: "/contact#faqs", label: "_FAQs" },
  { href: "/contact#terms", label: "_Terms & Conditions" },
  { href: "/contact#privacy", label: "_Privacy Policy" },
  { href: "/contact#refund", label: "_Refund Policy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-px mx-auto max-w-[1400px] py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-base font-bold">
              <span className="text-brand">{"</>"}</span>
              <span>SPORT_PARK.play</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Providing premium sports facilities for students, professionals, and the community.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {["IG", "FB", "TT", "@"].map((s) => (
                <span
                  key={s}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-[10px] text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <FooterCol title="_NAVIGATION" items={NAV} />
          <FooterCol title="_SUPPORT" items={SUPPORT} />

          <div>
            <h4 className="text-sm font-bold tracking-wide">_CONTACT US</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <Link
                  href="https://maps.app.goo.gl/RyvfZpjp3TWPy5MR6"
                  target="_blank"
                  className="hover:text-brand transition-colors"
                >
                  Laksamana College of Business
                  <br />
                  Bandar Seri Begawan, Brunei
                </Link>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="h-4 w-4 shrink-0 text-brand" />
                <span>+673 8730004</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon className="h-4 w-4 shrink-0 text-brand" />
                <span>sportpark@laksamanacollege.edu.bn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Sport Park By Laksamana College of Business. All rights reserved.</span>
          <span className="text-brand">_CODE YOUR GAME_</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-bold tracking-wide">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-muted">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="transition-colors hover:text-brand">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
