export type StaticAsset = string | { src: string };

/**
 * Vite exposes imported images as URL strings, while Next.js exposes them as
 * StaticImageData objects. Normalize both forms before passing an asset to a
 * native <img> element or storing it in client-side data.
 */
export function assetUrl(asset: StaticAsset): string {
  return typeof asset === "string" ? asset : asset.src;
}
