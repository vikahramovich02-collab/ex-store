import type { NextConfig } from "next";

const isProd = process.env.GITHUB_ACTIONS === "true";
const base = isProd ? "/ex-store" : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: base,
  assetPrefix: base,
  env: {
    NEXT_PUBLIC_BASE_PATH: base,
  },
};

export default nextConfig;
