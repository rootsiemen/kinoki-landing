import OrderForm from "./order-form";
import Ticker from "./ticker";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923258774221";
const WA_LINK = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  "Hello, I want to order Kinoki detox foot pads."
)}`;

const REVIEWS = [
  {
    name: "Reem A.",
    city: "Riyadh",
    stars: 5,
    text: "I put them on at night and forget they are there. Peeling them off in the morning takes two seconds and the sheet stays clean. Third box already.",
  },
  {
    name: "Khalid M.",
    city: "Jeddah",
    stars: 5,
    text: "Ordered the 8-box bundle on Monday, the parcel reached me with free delivery. Paid the courier in cash, exactly SAR 149, nothing extra.",
  },
  {
    name: "Huda S.",
    city: "Dammam",
    stars: 4,
    text: "They stay fixed on the sole the whole night — that was my only worry. My husband started using them too, so the bigger bundle makes sense for us.",
  },
  {
    name: "Mariam K.",
    city: "Madinah",
    stars: 5,
    text: "Simple routine: peel, stick, sleep. I keep a box in the drawer next to the bed now. Ordering took less than a minute.",
  },
];

function Stars({ n }: { n: number }) {
  return <span className="stars">{"★".repeat(n)}{"☆".repeat(5 - n)}</span>;
}

export default function Home() {
  return (
    <>
      <a href="#order" className="skip-link">Skip to order form</a>
      <div className="topbar">
        <span className="brand">NoorCare Pharmacy</span>
        <span className="topbar-offer">Free delivery · Cash on delivery</span>
      </div>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-text">
            <p className="eyebrow">Kinoki Cleansing Detox Foot Pads</p>
            <h1>Stick it on before bed. Peel it off in the morning.</h1>
            <p className="hero-sub">
              One pad on each sole while you sleep — that is the whole routine.
              Every box carries 10 pads, delivery is free anywhere in Saudi
              Arabia, and you pay cash only when the parcel reaches your door.
            </p>
            <div className="price-row">
              <span className="price-now">SAR 119</span>
              <span className="price-note">4 boxes · or 8 boxes for just SAR 149</span>
            </div>
            <a href="#order" className="cta-btn">Shop now</a>
            <ul className="hero-points">
              <li>✓ 10 pads in every box</li>
              <li>✓ Free delivery, no prepayment</li>
              <li>✓ Questions? Chat with us on WhatsApp</li>
            </ul>
          </div>
          <div className="hero-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero.webp" alt="Kinoki Cleansing Detox Foot Pads boxes with a foot pad" />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="steps">
          <h2>Three steps, done while you rest</h2>
          <div className="steps-grid">
            <div className="step-card">
              <span className="step-num">1</span>
              <h3>Peel</h3>
              <p>Take a fresh pad out of the box and remove the backing paper.</p>
            </div>
            <div className="step-card">
              <span className="step-num">2</span>
              <h3>Press</h3>
              <p>Press the pad firmly onto the center of your sole before sleep.</p>
            </div>
            <div className="step-card">
              <span className="step-num">3</span>
              <h3>Remove</h3>
              <p>In the morning, peel it off in one pull and throw it away. Done.</p>
            </div>
          </div>
          <div className="wide-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/soles.webp" alt="Foot pads worn on the soles overnight" />
          </div>
        </section>

        {/* WHY */}
        <section className="why">
          <h2>Why people keep a box by the bed</h2>
          <div className="why-grid">
            <div>
              <h3>Bamboo vinegar core</h3>
              <p>The pad's center is made with bamboo vinegar extract, the traditional ingredient Kinoki pads are known for.</p>
            </div>
            <div>
              <h3>Works overnight</h3>
              <p>No routine to remember during the day — the pad sits on your sole while you rest.</p>
            </div>
            <div>
              <h3>Stays in place</h3>
              <p>The adhesive border holds through the night and comes off cleanly in the morning.</p>
            </div>
            <div>
              <h3>Honest pricing</h3>
              <p>Two bundles, one price each, delivery included. What you see is what you hand to the courier.</p>
            </div>
          </div>
        </section>

        {/* DETAILS */}
        <section className="details">
          <h2>Product details</h2>
          <table className="info-table">
            <tbody>
              <tr><th>Product</th><td>Kinoki Cleansing Detox Foot Pads</td></tr>
              <tr><th>Box contents</th><td>10 pads per box</td></tr>
              <tr><th>How to use</th><td>Stick one pad on each sole before rest, remove in the morning</td></tr>
              <tr><th>Bundles</th><td>4 boxes — SAR 119 · 8 boxes — SAR 149</td></tr>
              <tr><th>Delivery</th><td>Free across Saudi Arabia</td></tr>
              <tr><th>Payment</th><td>Cash on delivery</td></tr>
            </tbody>
          </table>
          <div className="badges">
            <div className="badge"><span>✔</span> Quality Checked<small>Every batch inspected before dispatch</small></div>
            <div className="badge"><span>✔</span> Genuine Product<small>Sealed Kinoki boxes, as pictured</small></div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="reviews">
          <h2>What customers say</h2>
          <div className="reviews-grid">
            {REVIEWS.map((r) => (
              <article key={r.name} className="review-card">
                <Stars n={r.stars} />
                <p>{r.text}</p>
                <footer>{r.name} — {r.city}</footer>
              </article>
            ))}
          </div>
        </section>

        {/* ORDER */}
        <section className="order" id="order">
          <h2>Place your order</h2>
          <p className="order-sub">Fill in your details and tap confirm. We call you to verify, then the courier brings your parcel — pay in cash at your door.</p>
          <OrderForm />
        </section>

        {/* RETURNS */}
        <section className="returns">
          <h2>Returns &amp; exchanges</h2>
          <ol>
            <li>Changed your mind? Message us within 7 days of receiving your parcel and we will arrange a return or exchange.</li>
            <li>The box should be unused and still in its original packing.</li>
            <li>Damaged parcel or wrong contents? We replace it and cover the delivery.</li>
            <li>Fastest way to reach us is on LINE — tap the button below and we will reply with the next step.</li>
          </ol>
          <a href="https://lin.ee/QXp84HX" target="_blank" rel="noopener noreferrer" className="line-btn">Message us on LINE</a>
        </section>

        <footer className="site-footer">
          <p>NoorCare Pharmacy — Kinoki Cleansing Detox Foot Pads. Cash on delivery, free delivery across Saudi Arabia.</p>
        </footer>
      </main>

      {/* Sticky LINE bar (replaces the cash-on-delivery bar) */}
      <a href="https://lin.ee/QXp84HX" target="_blank" rel="noopener noreferrer" className="sticky-bar line-bar">Chat with us on LINE</a>

      {/* WhatsApp button */}
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
          <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5.1 2.4 7.2L4.5 29l7.1-1.9c1.4.8 2.9 1.1 4.4 1.1 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm0 21.7c-1.4 0-2.8-.4-4-1.1l-.3-.2-3 .8.8-2.9-.2-.3a9.7 9.7 0 0 1-1.5-5.2C7.8 10.4 11.5 6.7 16 6.7c4.5 0 8.2 3.7 8.2 8.2S20.5 24.7 16 24.7zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a8.2 8.2 0 0 1-4-3.5c-.3-.5.3-.5.6-1.6a.6.6 0 0 0 0-.5c-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3z"/>
        </svg>
      </a>

      <Ticker />
    </>
  );
}
