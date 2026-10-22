import { cookies } from "next/headers";
import { listOrders } from "@/lib/db";

// Downloads all orders as an Excel file (.xls, SpreadsheetML — opens
// directly in Microsoft Excel / Google Sheets with formatting).
export const dynamic = "force-dynamic";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const expected = process.env.ADMIN_PASSWORD;
  const cookieStore = await cookies();
  if (!expected || cookieStore.get("kinoki_admin")?.value !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

  const orders = await listOrders();
  const headers = ["Order #", "Date (UTC)", "Name", "Phone", "City", "Address", "Bundle", "Total (SAR)", "Status", "Notes"];
  const row = (cells: (string | number)[]) =>
    `<Row>${cells.map((c) => `<Cell><Data ss:Type="${typeof c === "number" ? "Number" : "String"}">${esc(String(c))}</Data></Cell>`).join("")}</Row>`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="Orders">
  <Table>
   ${row(headers)}
   ${orders.map((o) => row([o.id, o.created_at, o.name, o.phone, o.city, o.address, o.bundle, o.total, o.status, o.notes ?? ""])).join("\n   ")}
  </Table>
 </Worksheet>
</Workbook>`;

  const today = new Date().toISOString().slice(0, 10);
  return new Response(xml, {
    headers: {
      "Content-Type": "application/vnd.ms-excel; charset=utf-8",
      "Content-Disposition": `attachment; filename="kinoki-orders-${today}.xls"`,
    },
  });
}
