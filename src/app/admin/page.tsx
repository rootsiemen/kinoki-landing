import { cookies } from "next/headers";
import { listOrders, type Order } from "@/lib/db";
import LoginForm from "./login-form";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const expected = process.env.ADMIN_PASSWORD;
  const cookieStore = await cookies();
  const authed = !!expected && cookieStore.get("kinoki_admin")?.value === expected;

  if (!authed) {
    return (
      <main className="admin-wrap">
        <LoginForm />
      </main>
    );
  }

  const orders: Order[] = await listOrders();
  const revenue = orders.reduce((s, o) => s + o.total, 0);

  return (
    <main className="admin-wrap">
      <h1>Orders Panel</h1>
      <p className="admin-stats">
        {orders.length} orders · SAR {revenue} total (cash on delivery)
      </p>
      <p>
        <a href="/api/admin/export" className="export-btn">⬇ Download orders — Excel file</a>
      </p>

      <div className="sheet">
        <div className="sheet-titlebar">
          <span className="sheet-icon">▦</span> Orders Sheet
          <span className="sheet-hint">Naye orders yahan khud-ba-khud lag jayenge</span>
        </div>
        <div className="table-scroll">
          <table className="orders-table sheet-table">
            <thead>
              <tr>
                <th className="rownum-head"></th>
                <th>Order #</th><th>Date (UTC)</th><th>Name</th><th>Phone</th><th>City</th>
                <th>Address</th><th>Bundle</th><th>Total (SAR)</th><th>Status</th><th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={o.id}>
                  <td className="rownum">{i + 1}</td>
                  <td>{o.id}</td>
                  <td>{o.created_at}</td>
                  <td>{o.name}</td>
                  <td>{o.phone}</td>
                  <td>{o.city}</td>
                  <td>{o.address}</td>
                  <td>{o.bundle}</td>
                  <td>{o.total}</td>
                  <td>{o.status}</td>
                  <td>{o.notes}</td>
                </tr>
              ))}
              {Array.from({ length: Math.max(0, 12 - orders.length) }).map((_, k) => (
                <tr key={`blank-${k}`} className="blank-row">
                  <td className="rownum">{orders.length + k + 1}</td>
                  <td colSpan={10}></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {orders.length === 0 && (
          <p className="sheet-empty-note">Abhi sheet khaali hai — jab pehla order ayega to data yahan lag jayega.</p>
        )}
      </div>
    </main>
  );
}
