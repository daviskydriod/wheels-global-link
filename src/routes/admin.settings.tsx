import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  CheckCircle2,
  Cloud,
  Globe2,
  KeyRound,
  Laptop,
  Lock,
  Save,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tablet,
  Wifi,
} from "lucide-react";
import { AdminModuleShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_BASE_URL, API_HEALTH_PATH } from "@/lib/vehicle-platform";
export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Settings | AWA Admin" }] }),
  component: SettingsAdminPage,
});
function SettingsAdminPage() {
  return (
    <AdminModuleShell title="Workspace settings" eyebrow="Configuration">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">
            Configure operations, devices, PWA behavior, integrations, and deployment readiness.
          </p>
        </div>
        <Badge variant="secondary">
          <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
          Preview safe mode
        </Badge>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
          <Header
            icon={ServerCog}
            title="PHP API connection"
            copy="Inventory-first until the health check passes successfully."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Field
              label="API base URL"
              value={API_BASE_URL}
              placeholder="https://api.example.com"
            />
            <Field label="Health endpoint" value={API_HEALTH_PATH} />
            <Field label="Admin summary endpoint" value="/admin/summary" />
          </div>
          <div className="mt-5 flex flex-col gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="h-4 w-4" /> Local inventory remains active until the PHP
              health endpoint returns 2xx.
            </span>
            <Button size="sm" variant="outline">
              Test API readiness
            </Button>
          </div>
          <Button className="mt-5">
            <Save /> Save API configuration
          </Button>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <Header
            icon={Sparkles}
            title="PWA & install experience"
            copy="Control the first-load onboarding and reminder behavior."
          />
          <div className="mt-6 space-y-4">
            <Toggle label="Show install onboarding on first load" checked />
            <Toggle label="Show reminder when installation is deferred" checked />
            <Toggle label="Register offline service worker" checked />
            <Toggle label="Use standalone app display mode" checked />
            <div className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              <strong className="block text-slate-900">Current behavior</strong>Android and Chrome
              show the native install prompt when available. iPhone and iPad receive Add to Home
              Screen guidance through Share. Desktop browsers receive Install App guidance through
              their browser menu.
            </div>
            <Button variant="outline" className="w-full">
              <Save /> Save PWA preferences
            </Button>
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <Header
            icon={Smartphone}
            title="Supported devices"
            copy="Verify the experience across your customer and admin devices."
          />
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Device icon={Smartphone} label="Android" status="Ready" />
            <Device icon={Smartphone} label="iPhone" status="Ready" />
            <Device icon={Tablet} label="iPad" status="Ready" />
            <Device icon={Laptop} label="Desktop" status="Ready" />
          </div>
          <div className="mt-5 rounded-xl border border-primary/20 bg-primary/[.04] p-4 text-sm leading-6 text-slate-600">
            <strong className="block text-slate-900">Install checklist</strong>Use HTTPS in
            production, serve the manifest and icons, keep the service worker at the domain root,
            and test installation in Chrome Android, Safari iOS, Edge, and Chrome desktop.
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <Header
            icon={Globe2}
            title="Organization profile"
            copy="Public contact, brand, localization, and customer-facing defaults."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Business name" value="AWA AUTO MALL" />
            <Field label="Operating location" value="Guangzhou, China" />
            <Field label="WhatsApp number" placeholder="International number" />
            <Field label="Default currency" value="USD" />
            <Field label="Default language" value="English" />
            <Field label="Timezone" value="Asia/Shanghai" />
          </div>
          <Button variant="outline" className="mt-5">
            <Save /> Save organization profile
          </Button>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <Header
            icon={Bell}
            title="Notifications & reminders"
            copy="Choose which operational events should create alerts."
          />
          <div className="mt-6 space-y-4">
            <Toggle label="New inquiry notifications" checked />
            <Toggle label="Order milestone alerts" checked />
            <Toggle label="Content review reminders" />
            <Toggle label="API health failure reminders" checked />
            <Toggle label="PWA install reminder for returning users" checked />
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <Header
            icon={ShieldCheck}
            title="Access, security & deployment"
            copy="Keep security-sensitive controls server-side in PHP."
          />
          <div className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
            <Note
              icon={Lock}
              text="Authentication, roles, permissions, rate limits, and audit logs must be enforced by the PHP API."
            />
            <Note
              icon={KeyRound}
              text="Never expose PHP secrets, database credentials, or private API keys in Vite environment variables."
            />
            <Note
              icon={Cloud}
              text="For Vercel, configure only public VITE_API_BASE_URL values and enable HTTPS/CORS on the PHP API."
            />
            <Note
              icon={Wifi}
              text="The offline service worker caches the app shell only; API data remains network-first and is not stored as offline business data."
            />
          </div>
          <Button variant="outline" className="mt-5 w-full">
            Open deployment checklist
          </Button>
        </section>
      </div>
    </AdminModuleShell>
  );
}
function Header({
  icon: Icon,
  title,
  copy,
}: {
  icon: typeof ServerCog;
  title: string;
  copy: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-xl font-extrabold">{title}</h2>
        <p className="text-xs text-slate-500">{copy}</p>
      </div>
    </div>
  );
}
function Field({
  label,
  value,
  placeholder,
}: {
  label: string;
  value?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase text-slate-500">{label}</span>
      <Input defaultValue={value} placeholder={placeholder} />
    </label>
  );
}
function Toggle({ label, checked = false }: { label: string; checked?: boolean }) {
  return (
    <label className="flex items-center justify-between gap-3 text-sm font-semibold">
      <span>{label}</span>
      <input type="checkbox" defaultChecked={checked} className="h-5 w-5 accent-primary" />
    </label>
  );
}
function Device({
  icon: Icon,
  label,
  status,
}: {
  icon: typeof Smartphone;
  label: string;
  status: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-3 text-center">
      <Icon className="mx-auto h-5 w-5 text-primary" />
      <p className="mt-2 text-xs font-bold">{label}</p>
      <p className="mt-1 text-[10px] text-emerald-600">{status}</p>
    </div>
  );
}
function Note({ icon: Icon, text }: { icon: typeof Lock; text: string }) {
  return (
    <p className="flex gap-2">
      <Icon className="mt-1 h-4 w-4 shrink-0 text-primary" />
      {text}
    </p>
  );
}
