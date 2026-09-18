import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, PackageCheck, Search, Ship, Truck } from "lucide-react";
import { AdminModuleShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export const Route = createFileRoute("/admin/orders")({
  head: () => ({ meta: [{ title: "Orders | AWA Admin" }] }),
  component: OrderAdminPage,
});
const orders = [
  {
    ref: "AWA-24091",
    customer: "Michael Mensah",
    vehicle: "Toyota Land Cruiser",
    destination: "Accra, Ghana",
    status: "Inspection / Preparation",
    progress: 48,
  },
  {
    ref: "AWA-24088",
    customer: "Nadia Ibrahim",
    vehicle: "Lexus RX 350",
    destination: "Dubai, UAE",
    status: "Export Processing",
    progress: 66,
  },
  {
    ref: "AWA-24074",
    customer: "Emeka Nwosu",
    vehicle: "Mercedes-Benz E-Class",
    destination: "Lagos, Nigeria",
    status: "Shipped",
    progress: 82,
  },
];
function OrderAdminPage() {
  return (
    <AdminModuleShell title="Orders & tracking" eyebrow="Post-purchase">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <p className="text-sm text-slate-500">
          Move each order from confirmation through shipping and delivery.
        </p>
        <Button variant="automotive">Create order</Button>
      </div>
      <div className="mb-5 flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input placeholder="Search reference, customer or vehicle" className="pl-9" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {orders.map((order) => (
          <article
            key={order.ref}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase text-primary">{order.ref}</p>
                <h2 className="mt-1 text-xl font-extrabold">{order.customer}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {order.vehicle} · {order.destination}
                </p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Order progress</span>
              <span>{order.progress}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${order.progress}%` }}
              />
            </div>
            <p className="mt-3 text-sm font-semibold">{order.status}</p>
            <div className="mt-5 grid grid-cols-4 gap-2 text-center text-[10px] text-slate-400">
              <span className="text-primary">
                <PackageCheck className="mx-auto mb-1 h-4 w-4" />
                Confirmed
              </span>
              <span className="text-primary">
                <Truck className="mx-auto mb-1 h-4 w-4" />
                Sourced
              </span>
              <span className={order.progress >= 66 ? "text-primary" : ""}>
                <Ship className="mx-auto mb-1 h-4 w-4" />
                Shipped
              </span>
              <span>Delivered</span>
            </div>
            <div className="mt-6 flex gap-2">
              <Button className="flex-1">
                Update status <ArrowRight />
              </Button>
              <Button variant="outline">Documents</Button>
            </div>
          </article>
        ))}
      </div>
    </AdminModuleShell>
  );
}
