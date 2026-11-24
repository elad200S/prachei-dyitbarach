import { NextResponse } from "next/server";
import { getProducts } from "@/lib/db";

// Public, read-only — used by the client-side search overlay, which can't
// query the database directly from the browser.
export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Failed to load products", error);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}
