"use client";

import { Truck } from "lucide-react";
import { useDeliveryStatus } from "@/lib/useDeliveryStatus";
import { deliveryZones } from "@/lib/data";

export default function DeliveryStrip() {
  const status = useDeliveryStatus();
  return (
    <div className="mt-6 rounded-lg bg-accent-soft/50 px-4 py-3 text-sm text-ink">
      <p className="flex items-center gap-2 font-medium">
        <Truck size={16} className="text-accent shrink-0" />
        <span className="min-h-5">{status?.message ?? "משלוח עד הבית בחולון והסביבה"}</span>
      </p>
      <p className="text-xs text-ink/60 mt-1 pr-6">
        {deliveryZones.map((z) => `${z.city} – ${z.costLabel}`).join(" · ")}
      </p>
    </div>
  );
}
