import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ClipboardList, MessageCircle, Search } from "lucide-react";
import { AdminModuleShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export const Route = createFileRoute("/admin/inquiries")({
  head: () => ({ meta: [{ title: "Inquiries | AWA Admin" }] }),
  component: InquiryAdminPage,
});
const records = [
  {
    name: "Kwame Mensah",
    phone: "+233 592 656 665",
    email: "kwame@example.com",
    request: "2024 Toyota Land Cruiser",
    type: "Vehicle quote",
    status: "New",
    date: "Today, 12:04",
  },
  {
    name: "Sarah Okafor",
    phone: "+234 801 000 1222",
    email: "sarah@example.com",
    request: "2023 Lexus RX 350",
    type: "Sourcing request",
    status: "Contacted",
    date: "Today, 11:28",
  },
  {
    name: "David Chen",
    phone: "+971 50 000 2323",
    email: "david@example.com",
    request: "BMW 5 Series shipping",
    type: "Shipping question",
    status: "Quoted",
    date: "Yesterday",
  },
  {
    name: "Amara Bello",
    phone: "+234 802 555 0101",
    email: "amara@example.com",
    request: "Range Rover Sport",
    type: "Vehicle quote",
    status: "Negotiating",
    date: "Yesterday",
  },
];
function InquiryAdminPage() {
  return (
    <AdminModuleShell title="Inquiries" eyebrow="Lead management">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">
            Review, qualify, and move every customer conversation forward.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button variant="automotive">
            <MessageCircle /> Open WhatsApp
          </Button>
        </div>
      </div>
      <div className="mb-5 flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative min-w-60 flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input placeholder="Search customer or request" className="pl-9" />
        </div>
        {["All statuses", "All types", "This month"].map((label) => (
          <select
            key={label}
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
          >
            <option>{label}</option>
          </select>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-slate-400">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Request</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4">Received</th>
                <th className="p-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((record) => (
                <tr key={record.email}>
                  <td className="p-4">
                    <strong>{record.name}</strong>
                    <span className="mt-1 block text-xs text-slate-500">{record.phone}</span>
                  </td>
                  <td className="p-4 font-semibold">{record.request}</td>
                  <td className="p-4 text-slate-500">{record.type}</td>
                  <td className="p-4">
                    <Badge variant={record.status === "New" ? "default" : "secondary"}>
                      {record.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-slate-500">{record.date}</td>
                  <td className="p-4">
                    <Button size="sm" variant="outline">
                      Open
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="divide-y divide-slate-100 md:hidden">
          {records.map((record) => (
            <article key={record.email} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <strong>{record.name}</strong>
                  <p className="mt-1 text-xs text-slate-500">{record.phone}</p>
                </div>
                <Badge variant={record.status === "New" ? "default" : "secondary"}>
                  {record.status}
                </Badge>
              </div>
              <p className="mt-4 text-sm font-semibold">{record.request}</p>
              <p className="mt-1 text-xs text-slate-500">
                {record.type} · {record.date}
              </p>
              <Button size="sm" variant="outline" className="mt-4 w-full">
                <CheckCircle2 /> Open inquiry
              </Button>
            </article>
          ))}
        </div>
      </div>
    </AdminModuleShell>
  );
}
