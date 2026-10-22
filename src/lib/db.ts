import { createClient, type Client } from "@libsql/client";

let client: Client | null = null;
let ready: Promise<void> | null = null;

function getClient(): Client {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL;
    if (url) {
      client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
    } else {
      client = createClient({ url: "file:orders.db" });
    }
  }
  return client;
}

async function ensureTable(): Promise<void> {
  if (!ready) {
    ready = getClient().execute(`
      CREATE TABLE IF NOT EXISTS kinoki_orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        city TEXT NOT NULL,
        address TEXT NOT NULL,
        bundle TEXT NOT NULL,
        total INTEGER NOT NULL,
        notes TEXT DEFAULT '',
        status TEXT DEFAULT 'new',
        created_at TEXT DEFAULT (datetime('now'))
      )
    `).then(() => undefined);
  }
  return ready;
}

export type NewOrder = {
  name: string;
  phone: string;
  city: string;
  address: string;
  bundle: string;
  total: number;
  notes?: string;
};

export async function insertOrder(o: NewOrder): Promise<number> {
  await ensureTable();
  const res = await getClient().execute({
    sql: "INSERT INTO kinoki_orders (name, phone, city, address, bundle, total, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",
    args: [o.name, o.phone, o.city, o.address, o.bundle, o.total, o.notes ?? ""],
  });
  return Number(res.lastInsertRowid);
}

export type Order = NewOrder & { id: number; status: string; created_at: string };

export async function listOrders(): Promise<Order[]> {
  await ensureTable();
  const res = await getClient().execute(
    "SELECT id, name, phone, city, address, bundle, total, notes, status, created_at FROM kinoki_orders ORDER BY id DESC LIMIT 500"
  );
  return res.rows.map((r) => ({
    id: Number(r.id),
    name: String(r.name),
    phone: String(r.phone),
    city: String(r.city),
    address: String(r.address),
    bundle: String(r.bundle),
    total: Number(r.total),
    notes: String(r.notes ?? ""),
    status: String(r.status),
    created_at: String(r.created_at),
  }));
}
