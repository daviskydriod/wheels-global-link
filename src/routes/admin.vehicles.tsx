import { createFileRoute } from "@tanstack/react-router";
import { CarFront, Edit3, MoreHorizontal, Plus, Search, SlidersHorizontal } from "lucide-react";
import { AdminModuleShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { vehicles } from "@/lib/inventory";
export const Route = createFileRoute("/admin/vehicles")({
  head: () => ({ meta: [{ title: "Vehicle Inventory | AWA Admin" }] }),
  component: VehicleAdminPage,
});
function VehicleAdminPage() {
  return (
    <AdminModuleShell title="Vehicle inventory" eyebrow="Catalog management">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">
            Manage the inventory shown on the public marketplace.
          </p>
        </div>
        <Button variant="automotive">
          <Plus /> Add vehicle
        </Button>
      </div>
      <div className="mb-5 flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative min-w-60 flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input placeholder="Search make, model or reference" className="pl-9" />
        </div>
        <Button variant="outline">
          <SlidersHorizontal /> Filters
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {vehicles.map((vehicle) => (
          <article
            key={vehicle.slug}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <img
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase text-primary">
                    {vehicle.brand} · {vehicle.year}
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold uppercase">{vehicle.model}</h2>
                </div>
                <button type="button" aria-label="More vehicle actions">
                  <MoreHorizontal className="text-slate-400" />
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>{vehicle.condition}</Badge>
                <Badge variant="secondary">{vehicle.availability}</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-500">
                <span>
                  Mileage
                  <strong className="mt-1 block text-sm text-slate-800">{vehicle.mileage}</strong>
                </span>
                <span>
                  Price
                  <strong className="mt-1 block text-sm text-slate-800">{vehicle.price}</strong>
                </span>
              </div>
              <Button variant="outline" className="mt-5 w-full">
                <Edit3 /> Edit vehicle
              </Button>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-dashed border-primary/30 bg-primary/[.04] p-5 text-sm leading-6 text-slate-600">
        <CarFront className="mb-3 text-primary" />
        <strong className="block text-slate-900">API-ready inventory controls</strong>Connect your
        PHP endpoints for create, edit, delete, image upload, 360° image sets, featured flags,
        availability, and price updates. Until then, this page intentionally previews the current
        local inventory.
      </div>
    </AdminModuleShell>
  );
}
