"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS_HE = [
  "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
  "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר",
];
const DAYS_HE = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

function parseIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toIso(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatHebrew(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ב${MONTHS_HE[m - 1]} ${y}`;
}

export default function DeliveryDatePicker({
  value,
  onChange,
  min,
}: {
  value: string;
  onChange: (v: string) => void;
  min: string;
}) {
  const [open, setOpen] = useState(false);
  const minDate = parseIso(min);
  const [viewDate, setViewDate] = useState(() => {
    const base = value ? parseIso(value) : minDate;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const startOffset = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const canGoPrev = new Date(year, month, 1) > new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  const todayIso = toIso(new Date());

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="input flex items-center justify-between gap-2 text-right"
      >
        <span className={value ? "text-ink" : "text-ink/40"}>
          {value ? formatHebrew(value) : "בחרו תאריך משלוח"}
        </span>
        <Calendar size={16} className="text-ink/40 shrink-0" />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-72 rounded-lg border border-black/15 bg-white p-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              disabled={!canGoPrev}
              className="p-1 rounded hover:bg-black/5 disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
            <p className="text-sm font-medium text-ink">
              {MONTHS_HE[month]} {year}
            </p>
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="p-1 rounded hover:bg-black/5"
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAYS_HE.map((d) => (
              <div key={d} className="text-center text-[11px] text-ink/40">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((date, i) => {
              if (!date) return <div key={i} />;
              const iso = toIso(date);
              const disabled = date < minDate;
              const isSelected = iso === value;
              const isToday = iso === todayIso;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={`aspect-square rounded-md text-xs flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-accent text-white"
                      : disabled
                        ? "text-ink/20 cursor-not-allowed"
                        : isToday
                          ? "border border-accent text-ink"
                          : "text-ink hover:bg-accent-soft"
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
