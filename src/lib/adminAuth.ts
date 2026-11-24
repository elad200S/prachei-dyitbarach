import { cookies } from "next/headers";

// API routes under /api/admin/* aren't covered by the /admin/:path* page
// middleware, so anything that writes data needs its own check.
export async function isAdminRequest(): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;
  const store = await cookies();
  return store.get("admin_session")?.value === secret;
}
