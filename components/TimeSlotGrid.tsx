"use client";

import type { Court, SlotAvailability, TimeSlot } from "@/lib/types";

import type { Selection } from "@/lib/types";

interface Props {
  courts: Court[];
  slots: SlotAvailability[];
  selectedCourtId: string | null;
  selectedTimeStart: string | null;
  onSelect: (courtId: string, time: TimeSlot) => void;
  cartItems?: Selection[];
}

export default function TimeSlotGrid({ courts, slots, selectedCourtId, selectedTimeStart, onSelect, cartItems = [] }: Props) {
  // Helper function to check if a court+time falls inside any cart item's
  // booked span (a cart item can now cover more than one hour once
  // consecutive slots have been merged into a single order).
  const isInCart = (courtId: string, timeStart: string): boolean => {
    const t = toMinutes(timeStart);
    return cartItems.some((item) => {
      if (item.courtId !== courtId) return false;
      const start = toMinutes(item.time.start);
      const end = toMinutes(item.time.end);
      return t >= start && t < end;
    });
  };

  // Get status for a slot, taking cart into account
  const getSlotStatus = (courtStatus: "available" | "booked" | "selected" | "past", courtId: string, timeStart: string): "available" | "booked" | "selected" | "past" | "in-cart" => {
    if (isInCart(courtId, timeStart)) {
      return "in-cart";
    }
    return courtStatus;
  };

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold tracking-wide text-muted">
          _SELECT TIME SLOT (1 HOUR)
        </p>
        <Legend />
      </div>

      {/* Desktop / tablet: table grid */}
      <div className="mt-4 hidden overflow-x-auto rounded-lg border border-border md:block">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-background">
              <th className="sticky left-0 z-10 border-b border-r border-border bg-background px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted">
                TIME
              </th>
              {courts.map((court) => (
                <th
                  key={court.id}
                  className="border-b border-border px-3 py-3 text-center text-xs font-semibold tracking-wide text-muted"
                >
                  {court.label.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.time.start} className="border-b border-border last:border-b-0">
                <td className="sticky left-0 z-10 border-r border-border bg-background px-4 py-2.5 text-xs font-medium text-foreground/80">
                  {slot.time.label}
                </td>
                {slot.courts.map((c) => {
                  const selected = selectedCourtId === c.courtId && selectedTimeStart === slot.time.start;
                  const status = getSlotStatus(c.status, c.courtId, slot.time.start);
                  const inCart = isInCart(c.courtId, slot.time.start);
                  return (
                    <td key={c.courtId} className="px-2 py-2 text-center">
                      <SlotButton
                        status={selected ? "selected" : status}
                        onClick={() => !inCart && onSelect(c.courtId, slot.time)}
                        fullWidth
                        disabled={inCart}
                        isInCart={inCart}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked time rows with touch-friendly court chips */}
      <div className="mt-4 space-y-3 md:hidden">
        {slots.map((slot) => (
          <div key={slot.time.start} className="rounded-lg border border-border p-3">
            <p className="text-xs font-semibold text-foreground/80">{slot.time.label}</p>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {slot.courts.map((c) => {
                const selected = selectedCourtId === c.courtId && selectedTimeStart === slot.time.start;
                const court = courts.find((ct) => ct.id === c.courtId);
                const status = getSlotStatus(c.status, c.courtId, slot.time.start);
                const inCart = isInCart(c.courtId, slot.time.start);
                return (
                  <SlotButton
                    key={c.courtId}
                    status={selected ? "selected" : status}
                    onClick={() => !inCart && onSelect(c.courtId, slot.time)}
                    label={court?.label}
                    disabled={inCart}
                    isInCart={inCart}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function toMinutes(time24: string): number {
  const [h, m] = time24.split(":").map(Number);
  return h * 60 + m;
}

function Legend() {
  return (
    <div className="flex items-center gap-4 text-xs text-muted">
      <span className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-sm bg-available-bg" />
        Available
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-sm bg-brand" />
        Selected
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-sm bg-brand/50" />
        In Cart
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-sm bg-booked-bg" />
        Booked
      </span>
    </div>
  );
}

function SlotButton({
  status,
  onClick,
  fullWidth,
  label,
  disabled: disabledProp,
  isInCart,
}: {
  status: "available" | "booked" | "selected" | "past" | "in-cart";
  onClick: () => void;
  fullWidth?: boolean;
  label?: string;
  disabled?: boolean;
  isInCart?: boolean;
}) {
  const disabled = disabledProp || status === "booked" || status === "past" || status === "in-cart";
  const text = status === "past" ? "Unavailable" : status === "booked" ? "Booked" : status === "in-cart" ? "In Cart" : status === "selected" ? "Selected" : "Available";

  const base = "rounded-md py-2.5 text-xs font-medium transition-colors min-h-[40px]";
  const styles = {
    available: "bg-available-bg text-available-text hover:opacity-80 cursor-pointer",
    booked: "bg-booked-bg text-booked-text cursor-not-allowed",
    past: "bg-booked-bg text-booked-text/70 cursor-not-allowed",
    selected: "bg-brand text-white cursor-pointer",
    "in-cart": "bg-brand/50 text-white cursor-not-allowed opacity-75",
  }[status];

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${styles} ${fullWidth ? "w-full" : ""}`}
    >
      {label ? `${label.replace("Court ", "C")} · ${text}` : text}
    </button>
  );
}
