import type { Vehicle } from "./inventory";
import { getVehicleCategory } from "./vehicle-platform";

export type ComparisonGroup = {
  title: string;
  description: string;
  rows: Array<{ label: string; getValue: (vehicle: Vehicle) => string }>;
};

export const comparisonGroups: ComparisonGroup[] = [
  {
    title: "Identity & availability",
    description: "The basics to confirm whether each option fits your brief.",
    rows: [
      { label: "Brand", getValue: (v) => v.brand },
      { label: "Model", getValue: (v) => v.model },
      { label: "Year", getValue: (v) => String(v.year) },
      { label: "Vehicle type", getValue: (v) => getVehicleCategory(v) },
      { label: "Condition", getValue: (v) => v.condition },
      { label: "Availability", getValue: (v) => v.availability },
    ],
  },
  {
    title: "Performance & efficiency",
    description: "Powertrain information for everyday driving and intended use.",
    rows: [
      { label: "Engine", getValue: (v) => v.engine },
      { label: "Fuel type", getValue: (v) => v.fuel },
      { label: "Transmission", getValue: (v) => v.transmission },
      { label: "Mileage", getValue: (v) => v.mileage },
      { label: "Drive type", getValue: (v) => v.driveType ?? "Confirm with AWA" },
    ],
  },
  {
    title: "Ownership & sourcing",
    description: "Details that affect your purchase conversation and destination planning.",
    rows: [
      { label: "Indicative price", getValue: (v) => v.price },
      { label: "Exterior colour", getValue: (v) => v.color },
      { label: "Source market", getValue: (v) => v.source ?? "Guangzhou, China" },
      { label: "Inspection", getValue: () => "Available on request" },
      { label: "Shipping support", getValue: () => "Available through AWA" },
    ],
  },
];

export function getComparisonHighlights(selected: Vehicle[]) {
  if (!selected.length) return [];
  const newestYear = Math.max(...selected.map((vehicle) => vehicle.year));
  return selected.map((vehicle) => ({
    slug: vehicle.slug,
    label:
      vehicle.year === newestYear
        ? "Newest model year"
        : vehicle.condition === "New"
          ? "New condition"
          : "Strong alternative",
    detail:
      vehicle.year === newestYear
        ? `${vehicle.year} model year`
        : `${vehicle.condition} · ${vehicle.mileage}`,
  }));
}

export function buildQuoteMessage(selected: Vehicle[]) {
  const list = selected
    .map((vehicle) => `${vehicle.year} ${vehicle.brand} ${vehicle.model}`)
    .join(", ");
  return `Hello AWA AUTO MALL, I would like a quote comparison for: ${list}. Please confirm availability, inspection, shipping and final pricing.`;
}
