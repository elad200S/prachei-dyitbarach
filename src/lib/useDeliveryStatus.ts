"use client";

import { useEffect, useState } from "react";

export interface DeliveryStatus {
  sameDay: boolean;
  /** Milliseconds left until the same-day cutoff (only when sameDay). */
  msLeft: number;
  message: string;
}

const CUTOFF_HOUR = 14;

// Current Israel time, regardless of the visitor's timezone.
function israelNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jerusalem",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    weekday: get("weekday"),
    seconds: Number(get("hour")) * 3600 + Number(get("minute")) * 60 + Number(get("second")),
  };
}

function compute(): DeliveryStatus {
  const { weekday, seconds } = israelNow();
  const closedDay = weekday === "Sat";
  const left = CUTOFF_HOUR * 3600 - seconds;
  if (!closedDay && left > 0) {
    const h = Math.floor(left / 3600);
    const m = Math.floor((left % 3600) / 60);
    const when = h > 0 ? `${h} שעות ו-${m} דקות` : `${m} דקות`;
    return {
      sameDay: true,
      msLeft: left * 1000,
      message: `הזמינו בתוך ${when} – משלוח היום בחולון והסביבה`,
    };
  }
  return { sameDay: false, msLeft: 0, message: "הזמינו עכשיו – משלוח ביום העסקים הקרוב" };
}

/** Null on the server and first render, so there is no hydration mismatch. */
export function useDeliveryStatus(): DeliveryStatus | null {
  const [status, setStatus] = useState<DeliveryStatus | null>(null);
  useEffect(() => {
    const tick = () => setStatus(compute());
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return status;
}
