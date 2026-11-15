"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Pause, Play, Zap } from "lucide-react";

const slides = [
  {
    image: "/hero/rotator/promo-20-off.png",
    alt: "מבצע זר שני ב-20% הנחה",
    href: "/shop",
  },
  {
    image: "/hero/rotator/friday-delivery.png",
    alt: "משלוחים בשישי בחולון בתוך שעה",
    href: "/delivery",
  },
  {
    image: "/hero/rotator/combo-offers.png",
    alt: "מבצעים שיגרמו לכם לחייך",
    href: "/shop",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [autoPaused, setAutoPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const paused = autoPaused || userPaused || hovering;

  // WCAG 2.2.2 (Pause, Stop, Hide): auto-advancing content needs a way to
  // stop it. We honor the OS-level reduced-motion preference, our own
  // accessibility widget's "stop animations" toggle, hover/focus, and a
  // visible manual pause button.
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const checkA11yStop = () => document.documentElement.classList.contains("a11y-stop-animations");

    const update = () => setAutoPaused(prefersReduced || checkA11yStop());
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 3000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="relative w-full">
      <div
        className="relative h-[52vh] md:h-[68vh] w-full overflow-hidden"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
      >
        {slides.map((s, i) => (
          <Link
            key={s.image}
            href={s.href}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
          >
            <Image
              src={s.image}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </Link>
        ))}

        <Link
          href="/best-sellers"
          className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1 bg-accent text-white rounded-2xl px-3 py-4 sm:px-5 sm:py-6 shadow-xl hover:brightness-110 transition-all text-center w-[88px] sm:w-[120px]"
        >
          <Zap size={20} className="shrink-0" />
          <span className="text-xs sm:text-sm font-semibold leading-tight">הזמנה מהירה</span>
          <span className="text-[10px] sm:text-xs text-white/85 leading-tight">עד 90 דקות</span>
          <span className="text-[8px] sm:text-[10px] bg-white/20 rounded-full px-2 py-0.5 mt-1 whitespace-nowrap">
            רק בחולון
          </span>
        </Link>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                aria-label={`שקופית ${i + 1}`}
                onClick={() => setIndex(i)}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === index ? 22 : 8,
                  backgroundColor: "white",
                  opacity: i === index ? 1 : 0.5,
                }}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label={userPaused ? "המשך החלפת שקופיות" : "עצור החלפת שקופיות"}
            onClick={() => setUserPaused((p) => !p)}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            {userPaused ? <Play size={11} /> : <Pause size={11} />}
          </button>
        </div>
      </div>

      <div className="relative z-10 flex justify-center -mt-6 px-4">
        <Link
          href="/shop"
          className="flex items-center gap-2 bg-accent text-white text-sm px-6 py-3 rounded-full shadow-lg hover:brightness-110 transition-all"
        >
          <CalendarDays size={16} />
          בחרו תאריך ואזור למשלוח
        </Link>
      </div>
    </section>
  );
}
