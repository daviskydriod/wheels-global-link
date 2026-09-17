import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro, SectionHeading } from "@/components/marketplace";
import { vehicles } from "@/lib/inventory";
import image from "@/assets/awa-cars-category.jpg";

export const Route = createFileRoute("/compare")({
  validateSearch: (search) => ({ ids: typeof search.ids === "string" ? search.ids : "" }),
  head: () => ({
    meta: [
      { title: "Compare Vehicles | AWA AUTO MALL" },
      { name: "description", content: "Compare vehicle specifications side by side through AWA AUTO MALL." },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const { ids } = Route.useSearch();
  const selected = ids.split(",").map((id) => vehicles.find((vehicle) => vehicle.slug === id)).filter((vehicle): vehicle is typeof vehicles[number] => Boolean(vehicle)).slice(0, 3);
  const rows: [string, (vehicle: typeof vehicles[number]) => string][] = [["Brand", (vehicle) => vehicle.brand], ["Model", (vehicle) => vehicle.model], ["Year", (vehicle) => String(vehicle.year)], ["Condition", (vehicle) => vehicle.condition], ["Fuel", (vehicle) => vehicle.fuel], ["Transmission", (vehicle) => vehicle.transmission], ["Engine", (vehicle) => vehicle.engine], ["Mileage", (vehicle) => vehicle.mileage], ["Price", (vehicle) => vehicle.price]];

  return <>
    <PageIntro eyebrow="Vehicle comparison" title="Compare Your Shortlist" copy="Review key vehicle specifications side by side before you make an inquiry." image={image} />
    <section className="section-pad">
      <div className="container-shell">
        <Link to="/cars" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to cars
        </Link>
        {selected.length < 2 ? (
          <EmptyCompare />
        ) : (
          <>
            <div className="mb-6 border-l-2 border-primary bg-secondary px-5 py-4 text-sm">
              <p className="font-bold uppercase text-primary">Comparison note</p>
              <p className="mt-1 text-muted-foreground">
                {selected.length === 2
                  ? "You can add one more vehicle to compare up to three options."
                  : "You are comparing the maximum of three vehicles."}
              </p>
            </div>
            <div className="overflow-x-auto border-l border-t border-border">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr>
                    <th className="w-40 border-b border-r border-border bg-secondary p-4 text-xs font-bold uppercase">
                      Specification
                    </th>
                    {selected.map((vehicle) => (
                      <th key={vehicle.slug} className="border-b border-r border-border p-4 align-top">
                        <img
                          src={vehicle.image}
                          alt={`${vehicle.year} ${vehicle.brand} ${vehicle.model}`}
                          className="mb-4 aspect-[16/10] w-full min-w-32 object-cover"
                        />
                        <span className="block text-xs font-bold uppercase text-primary">
                          {vehicle.brand}
                        </span>
                        <span className="mt-1 block text-xl font-bold uppercase">
                          {vehicle.model}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([label, getValue]) => (
                    <tr key={label}>
                      <th className="border-b border-r border-border bg-secondary p-4 text-xs font-bold uppercase text-muted-foreground">
                        {label}
                      </th>
                      {selected.map((vehicle) => (
                        <td
                          key={`${vehicle.slug}-${label}`}
                          className="border-b border-r border-border p-4 text-sm font-semibold"
                        >
                          {getValue(vehicle)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  </>;
}

function EmptyCompare() { return <div className="border border-border bg-secondary p-8 text-center"><CheckCircle2 className="mx-auto h-10 w-10 text-primary"/><SectionHeading eyebrow="Choose two or three cars" title="Your Comparison Is Empty" copy="Add vehicles from the Cars page to see their specifications side by side."/><Button asChild size="lg"><Link to="/cars">Browse Cars<ArrowRight/></Link></Button></div>; }
