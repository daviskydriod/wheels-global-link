import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  CarFront,
  ChevronRight,
  ClipboardList,
  FileText,
  LayoutDashboard,
  PackageCheck,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_BASE_URL, apiRequest, checkApiReady } from "@/lib/vehicle-platform";
import { vehicles } from "@/lib/inventory";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard | AWA AUTO MALL" }] }),
  component: AdminPage,
});

type Summary = {
  totalVehicles: number;
  availableVehicles: number;
  inquiries: number;
  activeOrders: number;
};
const previewSummary: Summary = {
  totalVehicles: vehicles.length,
  availableVehicles: 4,
  inquiries: 18,
  activeOrders: 7,
};
const inquiries = [
  {
    name: "Kwame Mensah",
    type: "Vehicle quote",
    vehicle: "2024 Toyota Land Cruiser",
    time: "12 min ago",
    status: "New",
  },
  {
    name: "Sarah Okafor",
    type: "Sourcing request",
    vehicle: "2023 Lexus RX 350",
    time: "48 min ago",
    status: "Contacted",
  },
  {
    name: "David Chen",
    type: "Shipping question",
    vehicle: "BMW 5 Series",
    time: "2 hrs ago",
    status: "New",
  },
  {
    name: "Amara Bello",
    type: "Vehicle quote",
    vehicle: "Range Rover Sport",
    time: "Yesterday",
    status: "Quoted",
  },
];
const orders = [
  {
    reference: "AWA-24091",
    customer: "Michael Mensah",
    vehicle: "Toyota Land Cruiser",
    status: "Inspection / Preparation",
    progress: 48,
  },
  {
    reference: "AWA-24088",
    customer: "Nadia Ibrahim",
    vehicle: "Lexus RX 350",
    status: "Export Processing",
    progress: 66,
  },
  {
    reference: "AWA-24074",
    customer: "Emeka Nwosu",
    vehicle: "Mercedes-Benz E-Class",
    status: "Shipped",
    progress: 82,
  },
];
const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Vehicles", href: "/admin/vehicles", icon: CarFront },
  { label: "Inquiries", href: "/admin/inquiries", icon: ClipboardList, count: 18 },
  { label: "Orders", href: "/admin/orders", icon: PackageCheck },
  { label: "Content", href: "/admin/content", icon: FileText },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function AdminPage() {
  const [active, setActive] = useState("Overview");
  const [summary, setSummary] = useState<Summary>(previewSummary);
  const [loading, setLoading] = useState(Boolean(API_BASE_URL));
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    if (!API_BASE_URL) {
      setLoading(false);
      return;
    }
    checkApiReady()
      .then((ready) => {
        setConnected(ready);
        if (!ready) return;
        return apiRequest<Summary>("/admin/summary")
          .then(setSummary)
          .catch(() => setConnected(false));
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-foreground">
      <div className="flex min-h-screen">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-[#101b33] text-white lg:flex">
          <AdminBrand />
          <nav className="flex-1 space-y-1 px-3 py-6">
            {navItems.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </nav>
          <div className="m-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />{" "}
              {connected ? "PHP API connected" : "Development preview"}
            </div>
            <p className="mt-2 text-xs leading-5 text-white/50">
              {connected ? API_BASE_URL : "Connect your PHP API when the UI is approved."}
            </p>
          </div>
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-primary font-bold">
                AW
              </div>
              <div>
                <p className="text-sm font-semibold">AWA Admin</p>
                <p className="text-xs text-white/45">Super administrator</p>
              </div>
              <Settings className="ml-auto h-4 w-4 text-white/50" />
            </div>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
            <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
              <div className="min-w-0">
                <p className="hidden text-xs font-bold uppercase tracking-widest text-primary sm:block">
                  AWA AUTO MALL · OPERATIONS
                </p>
                <h1 className="truncate text-xl font-extrabold sm:text-2xl">
                  Good morning, AWA team
                </h1>
              </div>
              <div className="ml-auto flex items-center gap-2 sm:gap-4">
                <div className="hidden max-w-xs items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 md:flex">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    placeholder="Search dashboard"
                    className="w-36 bg-transparent text-sm outline-none"
                  />
                </div>
                <button
                  type="button"
                  className="relative grid h-10 w-10 place-items-center rounded-lg border border-slate-200"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
                </button>
                <Button asChild size="sm" variant="automotive" className="hidden sm:inline-flex">
                  <Link to="/cars">
                    View website <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 pb-24 pt-5 sm:px-6 sm:pb-10 sm:pt-7 lg:px-8">
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant={connected ? "default" : "secondary"}>
                      {connected ? "LIVE API" : "DEV PREVIEW"}
                    </Badge>
                    <span className="text-xs font-semibold text-slate-500">
                      {loading
                        ? "Syncing with PHP API…"
                        : connected
                          ? "Last synced just now"
                          : "Sample data · safe to preview"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    Here is what is happening across your vehicle business today.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText /> Export
                  </Button>
                  <Button variant="automotive" size="sm">
                    <Plus /> <span className="hidden sm:inline">Add vehicle</span>
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Metric
                  label="Total vehicles"
                  value={summary.totalVehicles}
                  change="12%"
                  icon={CarFront}
                  tone="blue"
                />
                <Metric
                  label="Available vehicles"
                  value={summary.availableVehicles}
                  change="8%"
                  icon={ShieldCheck}
                  tone="green"
                />
                <Metric
                  label="New inquiries"
                  value={summary.inquiries}
                  change="24%"
                  icon={ClipboardList}
                  tone="orange"
                />
                <Metric
                  label="Active orders"
                  value={summary.activeOrders}
                  change="5%"
                  icon={PackageCheck}
                  tone="purple"
                />
              </div>
              <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Performance overview
                      </p>
                      <h2 className="mt-1 text-xl font-extrabold">Inquiry conversion</h2>
                    </div>
                    <select className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs">
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                    </select>
                  </div>
                  <div className="mt-6 flex h-48 items-end gap-2 sm:gap-4">
                    {[38, 55, 45, 70, 62, 78, 68, 84, 76, 92, 81, 96].map((height, index) => (
                      <div key={index} className="group flex flex-1 flex-col items-center gap-2">
                        <div
                          className="relative w-full rounded-t-md bg-primary/15 transition-colors group-hover:bg-primary"
                          style={{ height: `${height}%` }}
                        >
                          <span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 text-xs font-bold group-hover:block">
                            {height}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {["May 1", "5", "10", "15", "20", "25", "30"][index % 7]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                    <span>
                      <i className="mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
                      Inquiries received
                    </span>
                    <span>
                      <i className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                      Quotes sent
                    </span>
                  </div>
                </section>
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Inventory health
                      </p>
                      <h2 className="mt-1 text-xl font-extrabold">Vehicle status</h2>
                    </div>
                    <CarFront className="text-primary" />
                  </div>
                  <div className="mt-6 space-y-5">
                    <StatusBar
                      label="Available"
                      value={summary.availableVehicles}
                      total={summary.totalVehicles}
                      color="bg-emerald-500"
                    />
                    <StatusBar
                      label="Reserved"
                      value={2}
                      total={summary.totalVehicles}
                      color="bg-amber-400"
                    />
                    <StatusBar
                      label="Sold"
                      value={1}
                      total={summary.totalVehicles}
                      color="bg-primary"
                    />
                    <StatusBar
                      label="Made to order"
                      value={1}
                      total={summary.totalVehicles}
                      color="bg-violet-500"
                    />
                  </div>
                  <Button variant="outline" className="mt-6 w-full">
                    Manage inventory <ChevronRight />
                  </Button>
                </section>
              </div>
              <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Needs attention
                      </p>
                      <h2 className="mt-1 text-xl font-extrabold">Recent inquiries</h2>
                    </div>
                    <Button variant="ghost" size="sm">
                      View all <ChevronRight />
                    </Button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {inquiries.map((item) => (
                      <div key={item.name} className="flex items-center gap-3 p-4 sm:gap-4 sm:px-6">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {item.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold">{item.name}</p>
                          <p className="truncate text-xs text-slate-500">
                            {item.type} · {item.vehicle}
                          </p>
                        </div>
                        <div className="hidden text-right sm:block">
                          <Badge variant={item.status === "New" ? "default" : "secondary"}>
                            {item.status}
                          </Badge>
                          <p className="mt-1 text-[11px] text-slate-400">{item.time}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-300 sm:hidden" />
                      </div>
                    ))}
                  </div>
                </section>
                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Post-purchase
                      </p>
                      <h2 className="mt-1 text-xl font-extrabold">Active orders</h2>
                    </div>
                    <PackageCheck className="text-primary" />
                  </div>
                  <div className="space-y-5 p-5 sm:p-6">
                    {orders.map((order) => (
                      <div key={order.reference}>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-bold text-primary">{order.reference}</p>
                            <p className="mt-1 text-sm font-bold">{order.customer}</p>
                            <p className="text-xs text-slate-500">{order.vehicle}</p>
                          </div>
                          <span className="text-right text-[11px] font-semibold text-slate-500">
                            {order.progress}%<br />
                            complete
                          </span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                        <p className="mt-2 text-xs text-slate-500">{order.status}</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      Track all orders <ChevronRight />
                    </Button>
                  </div>
                </section>
              </div>
              <section className="mt-6 rounded-2xl border border-dashed border-primary/30 bg-primary/[.04] p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-3">
                    <Activity className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h2 className="font-extrabold">API-ready development view</h2>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        This dashboard currently uses safe preview data. Connect{" "}
                        <code className="font-bold">VITE_API_BASE_URL</code> and the summary loader
                        will request <code className="font-bold">/admin/summary</code>. Add the
                        remaining PHP endpoints without changing the layout.
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="shrink-0">
                    API mapping guide <ArrowUpRight />
                  </Button>
                </div>
              </section>
            </div>
          </main>
          <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(15,23,42,.08)] backdrop-blur-xl lg:hidden">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.label}
                to={item.href}
                activeOptions={{ exact: item.href === "/admin" }}
                className="relative flex min-h-16 flex-col items-center justify-center gap-1 text-[10px] font-bold text-slate-400 data-[status=active]:text-primary"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
                {item.count && (
                  <span className="absolute right-4 top-2 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[9px] text-white">
                    {item.count}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
function AdminBrand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/admin" className="flex items-center gap-3 px-4 py-5">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary font-display text-xl font-bold">
        A
      </div>
      {!compact && (
        <div>
          <p className="font-display text-xl font-extrabold tracking-wide">AWA</p>
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/45">
            Auto mall
          </p>
        </div>
      )}
    </Link>
  );
}
function NavItem({ item }: { item: (typeof navItems)[number] }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.href}
      activeOptions={{ exact: item.href === "/admin" }}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-white/60 transition hover:bg-white/5 hover:text-white data-[status=active]:bg-primary data-[status=active]:text-white data-[status=active]:shadow-lg data-[status=active]:shadow-primary/20"
    >
      <Icon className="h-4 w-4" />
      {item.label}
      {item.count && (
        <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 text-[10px]">
          {item.count}
        </span>
      )}
    </Link>
  );
}
function Metric({
  label,
  value,
  change,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  change: string;
  icon: typeof CarFront;
  tone: string;
}) {
  const toneClass =
    tone === "green"
      ? "bg-emerald-50 text-emerald-600"
      : tone === "orange"
        ? "bg-orange-50 text-orange-600"
        : tone === "purple"
          ? "bg-violet-50 text-violet-600"
          : "bg-blue-50 text-blue-600";
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${toneClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
          <ArrowUpRight className="h-3 w-3" />
          {change}
        </span>
      </div>
      <p className="mt-5 text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-extrabold tracking-tight">{value}</p>
      <p className="mt-1 text-[11px] text-slate-400">vs last month</p>
    </div>
  );
}
function StatusBar({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) {
  const percentage = Math.max(8, Math.round((value / Math.max(total, 1)) * 100));
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-semibold">{label}</span>
        <span className="text-slate-500">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
