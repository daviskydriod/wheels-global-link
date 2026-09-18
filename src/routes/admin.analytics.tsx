import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Eye,
  Heart,
  MessageCircle,
  Users,
} from "lucide-react";
import { AdminModuleShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics | AWA Admin" }] }),
  component: AnalyticsAdminPage,
});
const stats = [
  { label: "Marketplace visits", value: "4,862", change: "+18.4%", icon: Eye, up: true },
  { label: "Quote requests", value: "126", change: "+24.1%", icon: MessageCircle, up: true },
  { label: "Saved vehicles", value: "309", change: "+11.8%", icon: Heart, up: true },
  { label: "Returning visitors", value: "42%", change: "-2.4%", icon: Users, up: false },
];
function AnalyticsAdminPage() {
  return (
    <AdminModuleShell title="Analytics" eyebrow="Performance">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          Understand what customers discover, save, and request.
        </p>
        <Button variant="outline">Last 30 days</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <stat.icon className="h-5 w-5 text-primary" />
              <span
                className={`flex items-center gap-1 text-xs font-bold ${stat.up ? "text-emerald-600" : "text-destructive"}`}
              >
                {stat.up ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="mt-5 text-xs font-semibold text-slate-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-extrabold">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Discovery trend
              </p>
              <h2 className="mt-1 text-xl font-extrabold">Visits and quote intent</h2>
            </div>
            <BarChart3 className="text-primary" />
          </div>
          <div className="mt-8 flex h-56 items-end gap-2 sm:gap-4">
            {[35, 48, 42, 60, 53, 72, 67, 80, 74, 88, 83, 96].map((height, index) => (
              <div key={index} className="flex flex-1 items-end">
                <div className="w-full rounded-t bg-primary/80" style={{ height: `${height}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-[10px] text-slate-400">
            <span>May 1</span>
            <span>May 15</span>
            <span>May 30</span>
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Top vehicles</p>
          <h2 className="mt-1 text-xl font-extrabold">Most viewed</h2>
          <div className="mt-6 space-y-5">
            {[
              ["Toyota Land Cruiser", "1,284", "42%"],
              ["Lexus RX 350", "944", "31%"],
              ["Range Rover Sport", "618", "20%"],
              ["BMW 5 Series", "354", "12%"],
            ].map(([name, views, percent]) => (
              <div key={name}>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{name}</span>
                  <span className="text-slate-500">{views}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-primary" style={{ width: percent }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="mt-6 rounded-2xl border border-dashed border-primary/30 bg-primary/[.04] p-5 text-sm leading-6 text-slate-600">
        <strong className="block text-slate-900">PHP analytics mapping</strong>These preview metrics
        are ready to be replaced with your PHP API responses for visits, vehicle views, saves,
        inquiries, quote conversion, traffic sources, and destination markets.
      </div>
    </AdminModuleShell>
  );
}
