import type { Vehicle } from "./inventory";

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");
export const API_HEALTH_PATH = import.meta.env.VITE_API_HEALTH_PATH ?? "/health";
const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY ?? "";
export type ApiEnvelope<T> = { ok: boolean; data: T; meta?: { page: number; per_page: number; total: number; pages: number }; error?: string };
export type ApiList<T> = ApiEnvelope<T[]>;
export type AdminSummary = { totalVehicles: number; publishedVehicles?: number; availableVehicles: number; newInquiries?: number; openInquiries?: number; inquiries?: number; activeOrders: number; publishedArticles?: number; pendingEmails?: number };

function apiUrl(path: string) { return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`; }
export async function checkApiReady(): Promise<boolean> { if (!API_BASE_URL) return false; try { const response = await fetch(apiUrl(API_HEALTH_PATH), { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(4000) }); return response.ok; } catch { return false; } }
export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> { const headers = new Headers(init?.headers); headers.set("Accept", "application/json"); if (init?.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json"); if (ADMIN_API_KEY) headers.set("X-Admin-Key", ADMIN_API_KEY); const response = await fetch(apiUrl(path), { ...init, headers }); const payload = await response.json().catch(() => ({})); if (!response.ok || payload?.ok === false) throw new Error(typeof payload?.error === "string" ? payload.error : `API request failed: ${response.status}`); return payload as T; }
export async function adminList<T>(resource: "vehicles" | "parts" | "inquiries" | "orders" | "articles", query = "") { return apiRequest<ApiList<T>>(`/admin/${resource}${query}`); }
export async function adminSummary() { return apiRequest<{ ok: true; data: AdminSummary }>("/admin/summary"); }
export function adminCreate<T extends Record<string, unknown>>(resource: string, payload: T) { return apiRequest<{ ok: true; id: number }>(`/admin/${resource}`, { method: "POST", body: JSON.stringify(payload) }); }
export function adminUpdate<T extends Record<string, unknown>>(resource: string, id: number, payload: T) { return apiRequest<{ ok: true }>(`/admin/${resource}/${id}`, { method: "PATCH", body: JSON.stringify(payload) }); }
export function adminDelete(resource: string, id: number) { return apiRequest<{ ok: true }>(`/admin/${resource}/${id}`, { method: "DELETE" }); }
export function adminAction(resource: string, id: number, action: string, payload: Record<string, unknown> = {}) { return apiRequest<{ ok: true }>(`/admin/${resource}/${id}/${action}`, { method: "POST", body: JSON.stringify(payload) }); }
export function adminBulk(resource: string, payload: Record<string, unknown>) { return apiRequest<{ ok: true; updated: number }>(`/admin/${resource}/bulk`, { method: "POST", body: JSON.stringify(payload) }); }
export function submitInquiry(payload: Record<string, unknown>) { return apiRequest<{ ok: true; id: number }>("/inquiries", { method: "POST", body: JSON.stringify(payload) }); }

const FAVORITES_KEY = "awa-favorite-vehicles";
export function getFavoriteSlugs(): string[] { if (typeof window === "undefined") return []; try { const value = JSON.parse(window.localStorage.getItem(FAVORITES_KEY) ?? "[]"); return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []; } catch { return []; } }
export function setFavoriteSlugs(slugs: string[]) { if (typeof window !== "undefined") window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(slugs)); }
export function toggleFavorite(slug: string): string[] { const current = getFavoriteSlugs(); const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]; setFavoriteSlugs(next); return next; }
export const currencyRates: Record<string, number> = { USD: 1, GHS: 12.4, AED: 3.67, CNY: 7.18, GBP: 0.79 };
export const currencySymbols: Record<string, string> = { USD: "$", GHS: "₵", AED: "د.إ", CNY: "¥", GBP: "£" };
export function formatIndicativePrice(vehicle: Vehicle, currency: string): string { if (!vehicle.price || vehicle.price.toLowerCase().includes("contact")) return "Contact for Price"; const numeric = Number(vehicle.price.replace(/[^\d.]/g, "")); if (!Number.isFinite(numeric)) return vehicle.price; const converted = numeric * (currencyRates[currency] ?? 1); return `${currencySymbols[currency] ?? currency} ${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`; }
export function getVehicleCategory(vehicle: Vehicle): string { return vehicle.category ?? (/land cruiser|rx 350|range rover|santa fe|sport/i.test(vehicle.model) ? "SUV" : "Sedan"); }
export function vehicleMatches(vehicle: Vehicle, query: string): boolean { return `${vehicle.brand} ${vehicle.model} ${vehicle.year} ${getVehicleCategory(vehicle)}`.toLowerCase().includes(query.trim().toLowerCase()); }
