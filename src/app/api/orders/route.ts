import { NextResponse } from "next/server";
import { insertOrder, type NewOrder } from "@/lib/db";
import { notifyOrderByEmail } from "@/lib/mail";

const BUNDLES: Record<string, { label: string; total: number }> = {
  "4-boxes": { label: "4 boxes", total: 119 },
  "8-boxes": { label: "8 boxes", total: 149 },
};

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const city = String(body.city ?? "").trim();
  const address = String(body.address ?? "").trim();
  const bundleKey = String(body.bundle ?? "");
  const notes = String(body.notes ?? "").trim().slice(0, 500);

  if (name.length < 2) return NextResponse.json({ error: "Please enter your full name" }, { status: 400 });
  if (!/^[+\d][\d\s-]{6,}$/.test(phone)) return NextResponse.json({ error: "Please enter a valid phone number" }, { status: 400 });
  if (city.length < 2) return NextResponse.json({ error: "Please enter your city" }, { status: 400 });
  if (address.length < 5) return NextResponse.json({ error: "Please enter your full address" }, { status: 400 });
  const bundle = BUNDLES[bundleKey];
  if (!bundle) return NextResponse.json({ error: "Please choose a bundle" }, { status: 400 });

  const order: NewOrder = { name, phone, city, address, bundle: bundle.label, total: bundle.total, notes };
  const id = await insertOrder(order);

  // Email is best-effort: never fail the order because of mail.
  notifyOrderByEmail({ ...order, id }).catch(() => undefined);

  return NextResponse.json({ ok: true, orderId: id, total: bundle.total });
}
