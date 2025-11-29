import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Base path for path-based routing (lifesync.app/notes)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

  // Asset prefix for CDN/subpath deployment
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
