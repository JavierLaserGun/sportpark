import ContactForm from "@/components/ContactForm";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/Icons";

const FAQS = [
  {
    q: "How far in advance can I book a court?",
    a: "You can book any available slot up to 7 days ahead. The date selector on the booking page lets you scroll further out.",
  },
  {
    q: "Can I book more than one hour at a time?",
    a: "Yes — choose a duration of 1, 2, or 3 hours from the Quick Book widget or the booking page.",
  },
  {
    q: "What happens if my chosen slot gets booked while I'm checking out?",
    a: "Our system checks availability again at payment. If someone books it first, you'll be asked to pick another slot before anything is charged.",
  },
];

export default function ContactPage() {
  return (
    <div className="container-px mx-auto max-w-[1400px] py-14 lg:py-20">
      <p className="text-sm font-semibold tracking-wide text-brand">// CONTACT</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">GET IN TOUCH</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        Questions about bookings, facilities, or group sessions? Reach out and the Sport Park team
        will get back to you.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <InfoCard icon={PinIcon} title="ADDRESS" lines={["Laksamana College of Business", "Bandar Seri Begawan, Brunei"]} />
          <InfoCard icon={PhoneIcon} title="PHONE" lines={["+673 123 4567"]} />
          <InfoCard icon={MailIcon} title="EMAIL" lines={["info@sportpark-lcb.com"]} />
        </div>
        <ContactForm />
      </div>

      <section id="faqs" className="mt-20 scroll-mt-24">
        <p className="text-sm font-semibold tracking-wide text-brand">// FAQS</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">FREQUENTLY ASKED QUESTIONS</h2>
        <div className="mt-6 divide-y divide-border rounded-xl border border-border">
          {FAQS.map((f) => (
            <div key={f.q} className="p-5">
              <p className="font-semibold">{f.q}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="terms" className="mt-16 scroll-mt-24">
        <p className="text-sm font-semibold tracking-wide text-brand">// TERMS &amp; CONDITIONS</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          By booking a court at Sport Park, you agree to arrive on time, vacate the court promptly
          at the end of your session, and follow posted facility rules. Sport Park reserves the
          right to cancel bookings in cases of maintenance or unforeseen closures, in which case a
          full refund will be issued.
        </p>
      </section>

      <section id="privacy" className="mt-16 scroll-mt-24">
        <p className="text-sm font-semibold tracking-wide text-brand">// PRIVACY POLICY</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          We collect only the information needed to process your booking — name, mobile number,
          and email. This information is used solely for booking confirmation and facility
          communication, and is never sold to third parties.
        </p>
      </section>

      <section id="refund" className="mt-16 scroll-mt-24">
        <p className="text-sm font-semibold tracking-wide text-brand">// REFUND POLICY</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Cancellations made at least 24 hours before your booked start time are eligible for a
          full refund. Cancellations made within 24 hours are non-refundable, except in cases of
          facility closure.
        </p>
      </section>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  lines,
}: {
  icon: (props: { className?: string }) => React.JSX.Element;
  title: string;
  lines: string[];
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border">
        <Icon className="h-4 w-4 text-brand" />
      </div>
      <div>
        <p className="text-xs font-semibold tracking-wide text-muted">{title}</p>
        {lines.map((line) => (
          <p key={line} className="text-sm font-medium">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
