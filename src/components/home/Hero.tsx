"use client";

import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Pause, Play } from "lucide-react";

const slides = [
  {
    image: "/hero/rotator/promo-20-off.webp",
    alt: "מבצע זר שני ב-20% הנחה",
    href: "/shop",
  },
  {
    image: "/hero/rotator/friday-delivery.webp",
    alt: "משלוחים בשישי בחולון בתוך שעה",
    href: "/delivery",
  },
  {
    image: "/hero/rotator/combo-offers.webp",
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
  const touchStartX = useRef(0);
  const swiped = useRef(false);
  const SWIPE_THRESHOLD = 50;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    swiped.current = false;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (Math.abs(e.touches[0].clientX - touchStartX.current) > 10) {
      swiped.current = true;
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX < 0) {
        setIndex((i) => (i + 1) % slides.length);
      } else {
        setIndex((i) => (i - 1 + slides.length) % slides.length);
      }
    }
  };

  const handleSlideClick = (e: MouseEvent) => {
    if (swiped.current) {
      e.preventDefault();
    }
  };

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
        className="relative w-full aspect-[1886/834] max-h-[85vh] overflow-hidden"
        style={{ touchAction: "pan-y" }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((s, i) => (
          <Link
            key={s.image}
            href={s.href}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
            onClick={handleSlideClick}
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

        <div className="absolute bottom-3 sm:bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
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
