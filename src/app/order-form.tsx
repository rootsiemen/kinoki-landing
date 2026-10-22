"use client";

import { useState } from "react";

const BUNDLES = [
  { key: "4-boxes", label: "4 boxes", pads: "40 pads", price: 119, tag: "Starter" },
  { key: "8-boxes", label: "8 boxes", pads: "80 pads", price: 149, tag: "Best value — most ordered" },
];

export default function OrderForm() {
  const [bundle, setBundle] = useState("8-boxes");
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "", notes: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ orderId: number; total: number } | null>(null);

  const selected = BUNDLES.find((b) => b.key === bundle)!;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, bundle }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok) {
      setDone({ orderId: data.orderId, total: data.total });
    } else {
      setError(data.error || "Something went wrong. Please try again.");
    }
  }

  if (done) {
    return (
      <div className="order-success">
        <div className="success-check">✓</div>
        <h3>Order received — thank you!</h3>
        <p>
          Your order number is <strong>#{done.orderId}</strong>. Pay{" "}
          <strong>SAR {done.total}</strong> in cash when your parcel arrives.
          We will call you on your phone number to confirm before dispatch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="order-form">
      <div className="bundle-grid">
        {BUNDLES.map((b) => (
          <label key={b.key} className={`bundle-card ${bundle === b.key ? "selected" : ""}`}>
            <input
              type="radio"
              name="bundle"
              value={b.key}
              checked={bundle === b.key}
              onChange={() => setBundle(b.key)}
            />
            <span className="bundle-tag">{b.tag}</span>
            <span className="bundle-label">{b.label}</span>
            <span className="bundle-pads">{b.pads}</span>
            <span className="bundle-price">SAR {b.price}</span>
          </label>
        ))}
      </div>

      <input
        placeholder="Full name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        placeholder="Phone number (e.g. 05xxxxxxxx)"
        inputMode="tel"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        required
      />
      <input
        placeholder="City"
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
        required
      />
      <textarea
        placeholder="Full address (district, street, building)"
        rows={2}
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        required
      />
      <input
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="order-btn" disabled={busy}>
        {busy ? "Placing your order…" : `Confirm Order — SAR ${selected.price} · Cash on Delivery`}
      </button>
      <p className="form-note">No prepayment. Pay only when the parcel is in your hands.</p>
    </form>
  );
}
