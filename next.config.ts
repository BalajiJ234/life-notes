import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Base path for path-based routing (balaji-dev.in/life-sync/notes)
  basePath: "/life-sync/notes",

  // Asset prefix for CDN/subpath deployment
  assetPrefix: "/life-sync/notes",
};

export default nextConfig;
