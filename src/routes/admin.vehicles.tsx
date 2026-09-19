import { createFileRoute } from "@tanstack/react-router";
import { CarFront, Edit3, MoreHorizontal, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdminModuleShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { vehicles as localVehicles, type Vehicle } from "@/lib/inventory";
import { API_BASE_URL, adminCreate, adminDelete, adminList, adminUpdate } from "@/lib/vehicle-platform";

export const Route = createFileRoute("/admin/vehicles")({ head: () => ({ meta: [{ title: "Vehicle Inventory | AWA Admin" }] }), component: VehicleAdminPage });

function VehicleAdminPage() {
  const [items, setItems] = useState<Vehicle[]>(localVehicles);
  const [query, setQuery] = useState("");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(Boolean(API_BASE_URL));
  useEffect(() => {
    if (!API_BASE_URL) { setLoading(false); return; }
    adminList<Vehicle>("vehicles").then((result) => { setItems(result.data); setConnected(true); }).catch(() => setConnected(false)).finally(() => setLoading(false));
  }, []);
  async function editVehicle(vehicle: Vehicle) {
    if (!vehicle.id || !API_BASE_URL) { alert("Vehicle editing is available after the PHP API is connected."); return; }
    const availability = window.prompt("Availability", vehicle.availability);
    if (availability === null) return;
    const price = window.prompt("Price", vehicle.price);
    if (price === null) return;
    try { await adminUpdate("vehicles", vehicle.id, { availability, price }); setItems((all) => all.map((item) => item.id === vehicle.id ? { ...item, availability, price } : item)); } catch (error) { alert(error instanceof Error ? error.message : "Unable to update vehicle"); }
  }
  async function removeVehicle(vehicle: Vehicle) {
    if (!vehicle.id || !API_BASE_URL || !window.confirm(`Delete ${vehicle.brand} ${vehicle.model}?`)) return;
    try { await adminDelete("vehicles", vehicle.id); setItems((all) => all.filter((item) => item.id !== vehicle.id)); } catch (error) { alert(error instanceof Error ? error.message : "Unable to delete vehicle"); }
  }
  async function createVehicle() {
    if (!API_BASE_URL) { alert("Connect the PHP API before creating inventory."); return; }
    const brand = window.prompt("Brand"); const model = window.prompt("Model"); const year = window.prompt("Year", "2024");
    if (!brand || !model || !year) return;
    try { await adminCreate("vehicles", { brand, model, year: Number(year), slug: `${brand}-${model}-${year}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"), category: "SUV", condition_name: "New", fuel: "Petrol", transmission: "Automatic", availability: "Available", currency: "GHS", is_published: 1 }); loadVehicles(); } catch (error) { alert(error instanceof Error ? error.message : "Unable to create vehicle"); }
  }
  function loadVehicles() { adminList<Vehicle>("vehicles").then((result) => { setItems(result.data); setConnected(true); }).catch(() => setConnected(false)); }
  const filtered = useMemo(() => items.filter((vehicle) => `${vehicle.brand} ${vehicle.model} ${vehicle.slug}`.toLowerCase().includes(query.toLowerCase())), [items, query]);
  return <AdminModuleShell title="Vehicle inventory" eyebrow="Catalog management">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm text-slate-500">Manage the inventory shown on the public marketplace.</p><p className="mt-1 text-xs font-semibold text-slate-400">{loading ? "Syncing…" : connected ? "Live API data" : "Local preview data"}</p></div><Button variant="automotive" onClick={createVehicle}><Plus /> Add vehicle</Button></div>
    <div className="mb-5 flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="relative min-w-60 flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search make, model or reference" className="pl-9" /></div><Button variant="outline"><SlidersHorizontal /> Filters</Button></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((vehicle) => <article key={vehicle.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><img src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} className="aspect-[16/9] w-full object-cover" /><div className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase text-primary">{vehicle.brand} · {vehicle.year}</p><h2 className="mt-1 text-xl font-extrabold uppercase">{vehicle.model}</h2></div><button type="button" onClick={() => removeVehicle(vehicle)} aria-label="Delete vehicle"><MoreHorizontal className="text-slate-400" /></button></div><div className="mt-4 flex flex-wrap gap-2"><Badge>{vehicle.condition}</Badge><Badge variant="secondary">{vehicle.availability}</Badge></div><div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-500"><span>Mileage<strong className="mt-1 block text-sm text-slate-800">{vehicle.mileage}</strong></span><span>Price<strong className="mt-1 block text-sm text-slate-800">{vehicle.price}</strong></span></div><Button variant="outline" onClick={() => editVehicle(vehicle)} className="mt-5 w-full"><Edit3 /> Edit vehicle</Button></div></article>)}</div>
    {!connected && <div className="mt-8 rounded-2xl border border-dashed border-primary/30 bg-primary/[.04] p-5 text-sm leading-6 text-slate-600"><CarFront className="mb-3 text-primary" /><strong className="block text-slate-900">API fallback is intentional</strong>Set <code>VITE_API_BASE_URL</code> and the admin API key in the deployment environment to switch this screen from local preview data to the PHP catalog.</div>}
  </AdminModuleShell>;
}
