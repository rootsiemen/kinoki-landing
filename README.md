# Kinoki COD Landing Page (Next.js)

Public ecommerce landing page for Kinoki Cleansing Detox Foot Pads with a real backend:

- **Public page** (`/`) — hero, how-it-works, benefits, product details, reviews,
  recent-order notifications, returns policy, sticky order bar and a floating
  **WhatsApp button**.
- **Orders backend** (`POST /api/orders`) — every order is saved in a
  libSQL/Turso database and a notification email is sent (if SMTP is set).
- **Orders panel** (`/admin`) — password-protected list of all orders.

## Run locally

```bash
cp .env.example .env   # fill in the values
npm install
npm run dev
```

Without `TURSO_DATABASE_URL`, orders are saved to a local file DB (`orders.db`).

## Deploy on Vercel

1. Push this folder to a GitHub repo and import it in Vercel.
2. Create a Turso database and set `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN`.
3. Set `ADMIN_PASSWORD`, the SMTP variables (Gmail App Password works),
   `ORDER_NOTIFY_EMAIL`, and `NEXT_PUBLIC_WHATSAPP_NUMBER`.
4. Deploy. Orders appear at `https://your-site/admin`.

## Things to edit

- Prices/bundles: `src/app/page.tsx`, `src/app/order-form.tsx`, and the
  `BUNDLES` map in `src/app/api/orders/route.ts` (keep all three in sync).
- Brand name / copy: `src/app/page.tsx`.
- Recent-order notifications (sample data): `src/app/ticker.tsx` — edit or delete.
- WhatsApp number: `NEXT_PUBLIC_WHATSAPP_NUMBER` env var.
