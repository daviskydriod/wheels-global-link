import { createFileRoute } from "@tanstack/react-router";
import { ContactStrip } from "@/components/site-shell";
import { InquirySection } from "@/components/home-page";
import { PageIntro, SectionHeading } from "@/components/marketplace";
import image from "@/assets/awa-global.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AWA AUTO MALL" },
      { name: "description", content: "Contact AWA AUTO MALL in Guangzhou, China about sourcing your next vehicle." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return <>
    <PageIntro eyebrow="Contact AWA AUTO MALL" title="Let's Talk About Your Next Vehicle" copy="Reach our team in Guangzhou for sourcing questions, vehicle requirements, and purchase guidance." image={image} />
    <section className="section-pad bg-background"><div className="container-shell"><SectionHeading eyebrow="Reach us directly" title="Choose The Way That Works For You"/><ContactStrip/></div></section>
    <InquirySection />
    <section className="section-pad bg-secondary"><div className="container-shell"><SectionHeading eyebrow="Find us" title="Guangzhou, China" copy="Our sourcing work is based in Guangzhou, one of the world's major automotive and trading centers."/><iframe title="AWA AUTO MALL location in Guangzhou" src="https://www.google.com/maps?q=Guangzhou%2C%20China&output=embed" className="h-[420px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></section>
  </>;
}
