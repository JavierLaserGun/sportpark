import Link from "next/link";
import { CourtIcon, CalendarIcon, ClockIcon } from "./Icons";
import { formatDateLong } from "@/lib/mockData";
import type { Selection, Sport } from "@/lib/types";

export default function BookingSummary({
  sport,
  selection,
  onProceed,
  disabled,
  hideAction,
}: {
  sport: Sport;
  selection: Selection | null;
  onProceed?: () => void;
  disabled?: boolean;
  hideAction?: boolean;
}) {
  const price = selection ? selection.pricePerHour * selection.durationHours : sport.pricePerHour;

  return (
    <div className="rounded-xl border border-border p-6">
      <p className="text-xs font-semibold tracking-wide text-brand">_YOUR BOOKING</p>

      <dl className="mt-5 space-y-4">
        <Row icon={CourtIcon} label="COURT TYPE" value={sport.name} />
        <Row
          icon={CourtIcon}
          label="COURT"
          value={selection ? `Court ${selection.courtNumber}` : "Select a slot"}
          muted={!selection}
        />
        <Row
          icon={CalendarIcon}
          label="DATE"
          value={selection ? formatDateLong(selection.date) : "—"}
          muted={!selection}
        />
        <Row
          icon={ClockIcon}
          label="TIME"
          value={selection ? formatTimeRange(selection) : "—"}
          muted={!selection}
        />
        <Row icon={ClockIcon} label="DURATION" value={`${selection?.durationHours ?? 1} Hour${(selection?.durationHours ?? 1) > 1 ? "s" : ""}`} />
      </dl>

      <div className="mt-5 border-t border-border pt-5">
        <p className="text-xs font-semibold tracking-wide text-muted">PRICE</p>
        <p className="mt-1.5 text-2xl font-bold text-brand">BND ${price.toFixed(2)}</p>
      </div>

      {hideAction ? null : onProceed ? (
        <button
          type="button"
          disabled={!selection || disabled}
          onClick={onProceed}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          _PROCEED TO BOOKING
          <span aria-hidden>↗</span>
        </button>
      ) : (
        <Link
          href="/booking"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          _PROCEED TO BOOKING
          <span aria-hidden>↗</span>
        </Link>
      )}
    </div>
  );
}

function formatTimeRange(selection: Selection) {
  return `${to12h(selection.time.start)} – ${to12h(addHours(selection.time.start, selection.durationHours))}`;
}

function to12h(time24: string) {
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

function addHours(time24: string, hours: number) {
  const [h, m] = time24.split(":").map(Number);
  const total = h + hours;
  return `${total.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function Row({
  icon: Icon,
  label,
  value,
  muted,
}: {
  icon: (props: { className?: string }) => React.JSX.Element;
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-muted">
        <Icon className="h-4 w-4 text-brand" />
        {label}
      </div>
      <span className={`text-right text-sm font-medium ${muted ? "text-muted" : "text-foreground"}`}>
        {value}
      </span>
    </div>
  );
}
