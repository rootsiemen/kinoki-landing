import nodemailer from "nodemailer";
import type { NewOrder } from "./db";

// Sends an order notification email. If SMTP is not configured, it quietly
// skips (the order is still saved in the database).
export async function notifyOrderByEmail(order: NewOrder & { id: number }): Promise<void> {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, ORDER_NOTIFY_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ORDER_NOTIFY_EMAIL) return;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const text = [
    `New Kinoki order #${order.id}`,
    ``,
    `Name:    ${order.name}`,
    `Phone:   ${order.phone}`,
    `City:    ${order.city}`,
    `Address: ${order.address}`,
    `Bundle:  ${order.bundle}`,
    `Total:   SAR ${order.total} (cash on delivery)`,
    order.notes ? `Notes:   ${order.notes}` : ``,
  ].join("\n");

  await transporter.sendMail({
    from: `"Kinoki Orders" <${SMTP_USER}>`,
    to: ORDER_NOTIFY_EMAIL,
    subject: `New order #${order.id} — ${order.bundle} — SAR ${order.total}`,
    text,
  });
}
