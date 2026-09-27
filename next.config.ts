import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/apps/react',
  assetPrefix: '/apps/react',
  images: { unoptimized: true },
};

export default nextConfig;