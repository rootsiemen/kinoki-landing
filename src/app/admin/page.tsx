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
      {orders.length === 0 ? (
        <p>No orders yet. Orders placed on the landing page will appear here.</p>
      ) : (
        <div className="table-scroll">
          <table className="orders-table">
            <thead>
              <tr>
                <th>#</th><th>Date (UTC)</th><th>Name</th><th>Phone</th><th>City</th>
                <th>Address</th><th>Bundle</th><th>Total</th><th>Status</th><th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.created_at}</td>
                  <td>{o.name}</td>
                  <td>{o.phone}</td>
                  <td>{o.city}</td>
                  <td>{o.address}</td>
                  <td>{o.bundle}</td>
                  <td>SAR {o.total}</td>
                  <td>{o.status}</td>
                  <td>{o.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
