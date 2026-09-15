import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/marketplace";
import { WhySection } from "@/components/home-page";
import image from "@/assets/awa-cars-category.jpg";

export const Route = createFileRoute("/why-awa")({
  head: () => ({
    meta: [
      { title: "Why Choose AWA AUTO MALL" },
      { name: "description", content: "See what makes AWA AUTO MALL a dependable vehicle sourcing partner in Guangzhou, China." },
    ],
  }),
  component: WhyAwaPage,
});

function WhyAwaPage() {
  return <>
    <PageIntro eyebrow="Why AWA" title="A Better Way To Source Your Next Car" copy="Professional guidance, clear updates, and a global sourcing perspective from Guangzhou, China." image={image} />
    <WhySection />
    <section className="section-pad bg-secondary"><div className="container-shell flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div className="max-w-2xl"><p className="text-sm font-bold uppercase text-primary">Ready when you are</p><h2 className="mt-3 text-4xl font-extrabold uppercase leading-none">Bring Us Your Vehicle Brief</h2></div><Button asChild size="lg"><Link to="/contact">Talk To Our Team<ArrowRight/></Link></Button></div></section>
  </>;
}
