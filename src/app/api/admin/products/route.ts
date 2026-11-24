import { NextResponse } from "next/server";
import { createProduct } from "@/lib/db";
import { isAdminRequest } from "@/lib/adminAuth";
import { parseProductInput } from "@/lib/productInput";

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }

  const input = parseProductInput(await request.json().catch(() => null));
  if (!input) {
    return NextResponse.json({ error: "חסרים פרטים או שהם לא תקינים" }, { status: 400 });
  }

  try {
    const product = await createProduct(input);
    return NextResponse.json({ product });
  } catch (error) {
    console.error("Failed to create product", error);
    const message = String(error).includes("duplicate key")
      ? "כבר קיים מוצר עם המזהה הזה"
      : "שגיאה בשמירת המוצר";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
