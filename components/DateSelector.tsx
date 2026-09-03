"use client";

import { useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";
import { addDays, formatDateShort, todayISOInBrunei } from "@/lib/mockData";

const VISIBLE_DAYS = 7;

export default function DateSelector({
  windowStart,
  selectedDate,
  onSelectDate,
  onShiftWindow,
}: {
  windowStart: string;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onShiftWindow: (days: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const today = todayISOInBrunei();
  const dates = Array.from({ length: VISIBLE_DAYS }, (_, i) => addDays(windowStart, i));
  const canGoBack = windowStart > today;

  useEffect(() => {
    const el = scrollRef.current?.querySelector<HTMLButtonElement>('[data-selected="true"]');
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [selectedDate]);

  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-muted">_SELECT DATE</p>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous dates"
          disabled={!canGoBack}
          onClick={() => onShiftWindow(-VISIBLE_DAYS)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>

        <div ref={scrollRef} className="no-scrollbar flex flex-1 gap-2 overflow-x-auto scroll-smooth">
          {dates.map((iso) => {
            const { weekday, day, month } = formatDateShort(iso);
            const selected = iso === selectedDate;
            return (
              <button
                key={iso}
                type="button"
                data-selected={selected}
                onClick={() => onSelectDate(iso)}
                className={`flex min-w-[84px] shrink-0 flex-col items-center rounded-md border px-3 py-2.5 text-sm transition-colors ${
                  selected
                    ? "border-brand bg-brand text-white"
                    : "border-border text-foreground hover:border-brand-dark"
                }`}
              >
                <span className={`text-[11px] tracking-wide ${selected ? "text-white/80" : "text-muted"}`}>
                  {weekday}
                </span>
                <span className="mt-0.5 font-semibold">
                  {day} {month}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Next dates"
          onClick={() => onShiftWindow(VISIBLE_DAYS)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
