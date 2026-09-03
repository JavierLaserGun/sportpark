"use client";

import { CourtIcon, CalendarIcon, ClockIcon, CloseIcon } from "./Icons";
import { formatDateLong } from "@/lib/mockData";
import { useBooking } from "@/lib/bookingContext";
import type { Selection, Sport } from "@/lib/types";

export default function BookingCart({
  sport,
  currentSelection,
  onAddToCart,
  onCheckout,
  cartItems,
}: {
  sport: Sport;
  currentSelection: Selection | null;
  onAddToCart: () => void;
  onCheckout: () => void;
  cartItems: Selection[];
}) {
  const { removeFromCart } = useBooking();
  const currentPrice = currentSelection ? currentSelection.pricePerHour * currentSelection.durationHours : 0;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.pricePerHour * item.durationHours, 0);

  return (
    <div className="space-y-4">
      {/* Current Selection */}
      <div className="rounded-xl border border-border p-6">
        <p className="text-xs font-semibold tracking-wide text-brand">_CURRENT SELECTION</p>

        <dl className="mt-5 space-y-4">
          <Row icon={CourtIcon} label="COURT TYPE" value={sport.name} />
          <Row
            icon={CourtIcon}
            label="COURT"
            value={currentSelection ? `Court ${currentSelection.courtNumber}` : "Select a slot"}
            muted={!currentSelection}
          />
          <Row
            icon={CalendarIcon}
            label="DATE"
            value={currentSelection ? formatDateLong(currentSelection.date) : "—"}
            muted={!currentSelection}
          />
          <Row
            icon={ClockIcon}
            label="TIME"
            value={currentSelection ? formatTimeRange(currentSelection) : "—"}
            muted={!currentSelection}
          />
          <Row icon={ClockIcon} label="DURATION" value={`${currentSelection?.durationHours ?? 1} Hour${(currentSelection?.durationHours ?? 1) > 1 ? "s" : ""}`} />
        </dl>

        <div className="mt-5 border-t border-border pt-5">
          <p className="text-xs font-semibold tracking-wide text-muted">PRICE</p>
          <p className="mt-1.5 text-2xl font-bold text-brand">BND ${currentPrice.toFixed(2)}</p>
        </div>

        <button
          type="button"
          disabled={!currentSelection}
          onClick={onAddToCart}
          className="mt-6 w-full rounded-md bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          _ADD TO CART
        </button>
      </div>

      {/* Shopping Cart */}
      {cartItems.length > 0 && (
        <div className="rounded-xl border border-brand bg-brand-tint p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wide text-brand">_SHOPPING CART</p>
            <span className="rounded bg-brand px-2 py-1 text-xs font-bold text-white">
              {cartItems.length} ITEM{cartItems.length > 1 ? "S" : ""}
            </span>
          </div>

          <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex items-start justify-between gap-2 rounded-md bg-white p-3 text-sm">
                <div className="flex-1">
                  <p className="font-semibold">Court {item.courtNumber}</p>
                  <p className="text-xs text-muted">{formatDateLong(item.date)}</p>
                  <p className="text-xs text-muted">{formatTimeRange(item)}</p>
                  <p className="mt-1 font-bold text-brand">BND ${(item.pricePerHour * item.durationHours).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(idx)}
                  className="text-muted hover:text-red-500 transition-colors"
                  aria-label="Remove item"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-brand pt-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-muted">TOTAL</p>
              <p className="text-2xl font-bold text-brand">BND ${totalPrice.toFixed(2)}</p>
            </div>
            <button
              onClick={onCheckout}
              className="w-full rounded-md bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              _CHECKOUT ({cartItems.length})
            </button>
          </div>
        </div>
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