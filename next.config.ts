import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so Next ignores stray lockfiles elsewhere on disk
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
