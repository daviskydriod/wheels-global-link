import { createFileRoute } from "@tanstack/react-router";
import { Edit3, Eye, FileText, ImagePlus, Plus, Search } from "lucide-react";
import { AdminModuleShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export const Route = createFileRoute("/admin/content")({
  head: () => ({ meta: [{ title: "Content | AWA Admin" }] }),
  component: ContentAdminPage,
});
const content = [
  {
    title: "How to import a vehicle",
    type: "Automotive guide",
    status: "Published",
    updated: "Sep 16, 2026",
  },
  {
    title: "Understanding vehicle shipping",
    type: "Automotive guide",
    status: "Draft",
    updated: "Sep 14, 2026",
  },
  {
    title: "Homepage hero and trust bar",
    type: "Homepage block",
    status: "Published",
    updated: "Sep 12, 2026",
  },
  {
    title: "FAQ: payments and inspection",
    type: "FAQ collection",
    status: "Review",
    updated: "Sep 10, 2026",
  },
];
function ContentAdminPage() {
  return (
    <AdminModuleShell title="Content studio" eyebrow="Publishing">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          Keep vehicle guides, homepage messaging, and FAQs current.
        </p>
        <Button variant="automotive">
          <Plus /> New content
        </Button>
      </div>
      <div className="mb-5 flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input placeholder="Search content" className="pl-9" />
        </div>
        <Button variant="outline">All content</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {content.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <Badge variant={item.status === "Published" ? "default" : "secondary"}>
                {item.status}
              </Badge>
            </div>
            <p className="mt-5 text-xs font-bold uppercase text-primary">{item.type}</p>
            <h2 className="mt-1 text-xl font-extrabold uppercase">{item.title}</h2>
            <p className="mt-2 text-xs text-slate-500">Last updated {item.updated}</p>
            <div className="mt-5 flex gap-2">
              <Button variant="outline" className="flex-1">
                <Edit3 /> Edit
              </Button>
              <Button variant="outline" size="icon">
                <Eye />
              </Button>
              <Button variant="outline" size="icon">
                <ImagePlus />
              </Button>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-dashed border-primary/30 bg-primary/[.04] p-5 text-sm leading-6 text-slate-600">
        <strong className="block text-slate-900">API-ready publishing</strong>Map these cards to
        your PHP content endpoints when ready. The layout supports drafts, review states,
        publishing, images, homepage content blocks, FAQs, and automotive guides.
      </div>
    </AdminModuleShell>
  );
}
