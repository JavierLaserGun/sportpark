"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CalendarIcon, ClockIcon } from "./Icons";
import { SPORT_LIST, todayISOInBrunei } from "@/lib/mockData";
import type { SportSlug } from "@/lib/types";

export default function QuickBooking({ variant = "card" }: { variant?: "card" | "plain" }) {
  const router = useRouter();
  const [sport, setSport] = useState<SportSlug | "">("");
  const [date, setDate] = useState(todayISOInBrunei());
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("1");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const target = sport || "pickleball";
    const params = new URLSearchParams();
    if (date) params.set("date", date);
    if (time) params.set("time", time);
    if (duration) params.set("duration", duration);
    router.push(`/booking/${target}?${params.toString()}`);
  }

  const wrapClass =
    variant === "card"
      ? "w-full rounded-xl border border-border bg-background p-6 shadow-[0_8px_30px_-12px_rgba(20,80,240,0.25)]"
      : "w-full";

  const layoutClass = variant === "card" ? "space-y-4" : "space-y-4 lg:space-y-0 lg:flex lg:items-end lg:gap-4";

  return (
    <form onSubmit={handleSubmit} className={wrapClass}>
      <p className="text-xs font-semibold tracking-wide text-brand">// QUICK BOOK</p>

      <div className={`mt-5 ${layoutClass}`}>
        <Field label="SELECT COURT">
          <select
            value={sport}
            onChange={(e) => setSport(e.target.value as SportSlug)}
            className="field-input"
          >
            <option value="">Choose Court Type</option>
            {SPORT_LIST.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="DATE">
          <div className="relative">
            <input
              type="date"
              value={date}
              min={todayISOInBrunei()}
              onChange={(e) => setDate(e.target.value)}
              className="field-input pr-9"
            />
            <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          </div>
        </Field>

        <Field label="TIME">
          <div className="relative">
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="field-input pr-9 appearance-none"
            >
              <option value="">Select Time</option>
              {TIME_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ClockIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          </div>
        </Field>

        <Field label="DURATION">
          <select value={duration} onChange={(e) => setDuration(e.target.value)} className="field-input">
            <option value="1">1 Hour</option>
            <option value="2">2 Hours</option>
            <option value="3">3 Hours</option>
          </select>
        </Field>
      </div>

      <button
        type="submit"
        className={`${variant === "card" ? "mt-6 w-full" : "lg:min-w-[240px]"} rounded-md bg-brand px-6 py-2.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-brand-dark`}
      >
        _CHECK AVAILABILITY
      </button>

      <style jsx global>{`
        .field-input {
          width: 100%;
          border: 1px solid var(--border);
          border-radius: 0.375rem;
          padding: 0.62rem 0.75rem;
          font-size: 0.875rem;
          font-family: inherit;
          background: #fff;
          color: var(--foreground);
        }
        .field-input:focus {
          outline: none;
          border-color: var(--brand);
          box-shadow: 0 0 0 3px var(--brand-tint);
        }
      `}</style>
    </form>
  );
}

const TIME_OPTIONS = Array.from({ length: 14 }, (_, i) => {
  const h = 8 + i;
  return `${h.toString().padStart(2, "0")}:00`;
});

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block flex-1">
      <span className="mb-1.5 block text-[11px] font-semibold tracking-wide text-muted">{label}</span>
      {children}
    </label>
  );
}
