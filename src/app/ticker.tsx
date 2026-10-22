"use client";

import { useEffect, useState } from "react";

// Sample recent-order notifications. Edit or remove these in ticker.tsx.
const EVENTS = [
  { name: "Aisha", city: "Buraydah", item: "8 boxes" },
  { name: "Omar", city: "Riyadh", item: "4 boxes" },
  { name: "Fatimah", city: "Najran", item: "8 boxes" },
  { name: "Sara", city: "Hofuf", item: "4 boxes" },
  { name: "Noura", city: "Jeddah", item: "8 boxes" },
  { name: "Rajab", city: "Makkah", item: "4 boxes" },
  { name: "Dalia", city: "Riyadh", item: "8 boxes" },
  { name: "Tala", city: "Dammam", item: "4 boxes" },
];

export default function Ticker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setVisible(true);
      hideTimer = setTimeout(() => {
        setVisible(false);
        setIdx((i) => (i + 1) % EVENTS.length);
        showTimer = setTimeout(cycle, 7000);
      }, 4500);
    };
    showTimer = setTimeout(cycle, 4000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const ev = EVENTS[idx];
  return (
    <div className={`order-toast ${visible ? "show" : ""}`} aria-hidden={!visible}>
      <span className="toast-dot">●</span>
      <span>
        <strong>{ev.name}</strong> from {ev.city} just ordered <strong>{ev.item}</strong>
      </span>
    </div>
  );
}
