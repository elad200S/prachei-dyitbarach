"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Re-mounts on every navigation, giving a soft fade between pages.
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
