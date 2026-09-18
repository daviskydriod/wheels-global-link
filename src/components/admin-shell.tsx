import { Link } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Bell,
  CarFront,
  ClipboardList,
  FileText,
  LayoutDashboard,
  PackageCheck,
  Settings,
  Wifi,
} from "lucide-react";
import type { ReactNode } from "react";
import { API_BASE_URL } from "@/lib/vehicle-platform";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Vehicles", href: "/admin/vehicles", icon: CarFront },
  { label: "Inquiries", href: "/admin/inquiries", icon: ClipboardList },
  { label: "Orders", href: "/admin/orders", icon: PackageCheck },
  { label: "Content", href: "/admin/content", icon: FileText },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminModuleShell({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-foreground">
      <div className="flex min-h-screen">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-[#101b33] text-white lg:flex">
          <AdminBrand />
          <nav className="flex-1 space-y-1 px-3 py-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                activeOptions={{ exact: item.href === "/admin" }}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/60 transition hover:bg-white/5 hover:text-white data-[status=active]:bg-primary data-[status=active]:text-white"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="m-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-bold uppercase text-emerald-300">
              {API_BASE_URL ? "API configured" : "Development preview"}
            </p>
            <p className="mt-2 text-xs leading-5 text-white/50">
              {API_BASE_URL || "Local inventory data is active until the PHP API is healthy."}
            </p>
          </div>
          <div className="border-t border-white/10 p-4 text-sm font-semibold">
            AWA Admin <span className="ml-2 text-xs text-white/40">Administrator</span>
          </div>
        </aside>
        <div className="min-w-0 flex-1 lg:pl-64">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:h-[4.5rem] lg:px-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                AWA AUTO MALL · OPERATIONS
              </p>
              <h1 className="text-xl font-extrabold sm:text-2xl">{title}</h1>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <span className="hidden text-xs font-semibold text-slate-400 sm:block">
                {eyebrow}
              </span>
              <Bell className="h-4 w-4 text-slate-400" />
              <Settings className="h-4 w-4 text-slate-400" />
            </div>
          </header>
          <main className="px-4 pb-24 pt-6 sm:px-6 sm:pb-10 lg:px-8">
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
                <Pulse label="Workspace status" value="Ready" icon={Activity} tone="green" />
                <Pulse label="Today's activity" value="24 updates" icon={Bell} tone="blue" />
                <Pulse label="Needs attention" value="8 items" icon={ClipboardList} tone="orange" />
                <Pulse label="Data source" value="Preview inventory" icon={Wifi} tone="purple" />
              </div>
              {children}
              <section className="mt-8 rounded-2xl border border-dashed border-primary/30 bg-primary/[.04] p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  Operations playbook
                </p>
                <h2 className="mt-2 text-xl font-extrabold">Keep the next action visible</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-sm font-bold">Review new activity</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Check today's inquiries and status changes before leaving the workspace.
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-sm font-bold">Confirm the source</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Preview inventory remains active until the PHP API health check succeeds.
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-sm font-bold">Prepare the handoff</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Capture documents, customer notes, and the next milestone for your team.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </main>
          <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-lg backdrop-blur-xl lg:hidden">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                activeOptions={{ exact: item.href === "/admin" }}
                className="flex min-h-16 flex-col items-center justify-center gap-1 text-[10px] font-bold text-slate-400 data-[status=active]:text-primary"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
function Pulse({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: typeof Activity;
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
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex items-center gap-2">
        <span className={`grid h-8 w-8 place-items-center rounded-lg ${toneClass}`}>
          <Icon className="h-4 w-4" />
        </span>
        <span className="truncate text-[10px] font-bold uppercase text-slate-400 sm:text-xs">
          {label}
        </span>
      </div>
      <p className="mt-3 truncate text-sm font-extrabold sm:text-base">{value}</p>
    </div>
  );
}
function AdminBrand() {
  return (
    <Link to="/admin" className="flex items-center gap-3 px-4 py-5">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary font-display text-xl font-bold">
        A
      </div>
      <div>
        <p className="font-display text-xl font-extrabold tracking-wide">AWA</p>
        <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/45">
          Auto mall
        </p>
      </div>
    </Link>
  );
}
