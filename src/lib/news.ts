import image from "@/assets/awa-global.jpg";
import type { NewsArticle } from "@/components/news";

export const localArticles: NewsArticle[] = [
  {
    slug: "guangzhou-sourcing-guide",
    title: "Inside The Guangzhou Sourcing Network",
    excerpt:
      "How a clear vehicle brief helps our team search the right market with less guesswork.",
    content:
      "A useful vehicle search begins before the first listing is opened. We start by understanding the make, model, year, budget, condition, and destination that matter to the customer.\n\nThat brief gives our team a practical filter for the Guangzhou market. Instead of sending a long, generic list, we can focus on vehicles that fit the intended use and share the details needed for a sensible comparison.\n\nThe strongest sourcing conversations stay open about what is confirmed, what still needs checking, and which next step will give the customer more confidence.",
    cover_image: image,
    published_at: "2026-02-18",
  },
  {
    slug: "vehicle-inspection-basics",
    title: "The Details Worth Checking Before Purchase",
    excerpt:
      "A practical look at condition, specification, and the questions that make a vehicle review useful.",
    content:
      "A vehicle review should make the important questions easier to answer. Condition, mileage, specification, service history, ownership records, and available images all help create a clearer picture of the car.\n\nIt is also important to separate confirmed information from details that still require inspection. Asking those questions early helps avoid surprises and gives the buyer a better basis for comparing options.\n\nOur role is to make the review practical: show what is known, identify what needs verification, and keep the decision connected to the original vehicle brief.",
    cover_image: image,
    published_at: "2026-01-30",
  },
  {
    slug: "shipping-planning",
    title: "Planning A Smoother Vehicle Journey",
    excerpt:
      "The key information to prepare when a vehicle is headed from China to an international market.",
    content:
      "Shipping planning is easier when the destination is part of the conversation from the beginning. Country requirements, documentation, vessel schedules, port arrangements, and local delivery can all affect the final plan.\n\nThe first step is to confirm the vehicle and the destination together. Once those are known, the export and delivery requirements can be reviewed in the right order.\n\nTimelines vary by route and availability, so clear updates matter. A good plan explains what has been arranged, what is pending, and what the customer should expect next.",
    cover_image: image,
    published_at: "2026-01-12",
  },
];
