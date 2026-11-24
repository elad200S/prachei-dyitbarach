import { NextResponse } from "next/server";
import { upsertCartSession, type OrderItem } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { id, senderName, senderPhone, senderEmail, city, items, subtotal } = body ?? {};

  if (typeof id !== "string" || !id || !Array.isArray(items) || typeof subtotal !== "number") {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  // Only worth storing once there's a way to reach the person.
  if (!senderPhone && !senderEmail) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  try {
    await upsertCartSession({
      id,
      senderName,
      senderPhone,
      senderEmail,
      city,
      items: items as OrderItem[],
      subtotal,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to save cart session", error);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
