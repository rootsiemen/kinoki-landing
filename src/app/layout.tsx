import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kinoki Detox Foot Pads — NoorCare Pharmacy | Cash on Delivery",
  description:
    "Stick one pad on each sole before bed, peel it off in the morning. 10 pads per box, free delivery across Saudi Arabia, pay cash when your parcel arrives.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
