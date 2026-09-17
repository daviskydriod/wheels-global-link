import type { Vehicle } from "./inventory";

/**
 * Frontend adapter for the existing PHP API. Keep the endpoint configurable so
 * deployments can point this UI at the user's API without changing components.
 */
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

const FAVORITES_KEY = "awa-favorite-vehicles";

export function getFavoriteSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(FAVORITES_KEY) ?? "[]");
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export function setFavoriteSlugs(slugs: string[]) {
  if (typeof window !== "undefined")
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(slugs));
}

export function toggleFavorite(slug: string): string[] {
  const current = getFavoriteSlugs();
  const next = current.includes(slug)
    ? current.filter((item) => item !== slug)
    : [...current, slug];
  setFavoriteSlugs(next);
  return next;
}

export const currencyRates: Record<string, number> = {
  USD: 1,
  GHS: 12.4,
  AED: 3.67,
  CNY: 7.18,
  GBP: 0.79,
};
export const currencySymbols: Record<string, string> = {
  USD: "$",
  GHS: "₵",
  AED: "د.إ",
  CNY: "¥",
  GBP: "£",
};

export function formatIndicativePrice(vehicle: Vehicle, currency: string): string {
  if (!vehicle.price || vehicle.price.toLowerCase().includes("contact")) return "Contact for Price";
  const numeric = Number(vehicle.price.replace(/[^\d.]/g, ""));
  if (!Number.isFinite(numeric)) return vehicle.price;
  const converted = numeric * (currencyRates[currency] ?? 1);
  return `${currencySymbols[currency] ?? currency} ${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

export function getVehicleCategory(vehicle: Vehicle): string {
  return (
    vehicle.category ??
    (/land cruiser|rx 350|range rover|santa fe|sport/i.test(vehicle.model) ? "SUV" : "Sedan")
  );
}

export function vehicleMatches(vehicle: Vehicle, query: string): boolean {
  return `${vehicle.brand} ${vehicle.model} ${vehicle.year} ${getVehicleCategory(vehicle)}`
    .toLowerCase()
    .includes(query.trim().toLowerCase());
}
