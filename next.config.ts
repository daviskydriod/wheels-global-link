import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  webpack(config) {
    const publicApiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL ??
      process.env.VITE_API_BASE_URL ??
      "https://api.awaautos.com/api";
    const publicHealthPath =
      process.env.NEXT_PUBLIC_API_HEALTH_PATH ?? process.env.VITE_API_HEALTH_PATH ?? "/health";
    const publicAdminApiKey =
      process.env.NEXT_PUBLIC_ADMIN_API_KEY ?? process.env.VITE_ADMIN_API_KEY ?? "";
    config.plugins.push(
      new webpack.DefinePlugin({
        "import.meta.env.VITE_API_BASE_URL": JSON.stringify(publicApiBaseUrl),
        "import.meta.env.VITE_API_HEALTH_PATH": JSON.stringify(publicHealthPath),
        "import.meta.env.VITE_ADMIN_API_KEY": JSON.stringify(publicAdminApiKey),
        "import.meta.env.DEV": JSON.stringify(process.env.NODE_ENV !== "production"),
      }),
    );
    config.module.rules.push({
      test: /\.csv$/i,
      resourceQuery: /raw/,
      type: "asset/source",
    });
    return config;
  },
};

export default nextConfig;
