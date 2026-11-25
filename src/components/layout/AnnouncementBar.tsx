"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDeliveryStatus } from "@/lib/useDeliveryStatus";

export default function AnnouncementBar() {
  const status = useDeliveryStatus();
  const [i, setI] = useState(0);
  const [rotate, setRotate] = useState(true);

  const messages = [
    status?.message ?? "משלוח היום בחולון והסביבה",
    "צילום הזר לפני משלוח",
    "תשלום מאובטח · מענה אישי בוואטסאפ",
  ];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRotate(false);
      return;
    }
    const id = setInterval(() => {
      if (document.documentElement.classList.contains("a11y-stop-animations")) return;
      setI((n) => (n + 1) % 3);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-accent text-center py-2 px-4 h-8 overflow-hidden" aria-live="off">
      {rotate ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={i}
            className="text-[11px] tracked-xs text-white leading-4"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {messages[i]}
          </motion.p>
        </AnimatePresence>
      ) : (
        <p className="text-[11px] tracked-xs text-white leading-4">{messages.join(" · ")}</p>
      )}
    </div>
  );
}
