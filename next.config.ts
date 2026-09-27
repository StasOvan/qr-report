import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/apps/React/qr-report',
  assetPrefix: '/apps/React/qr-report',
  images: { unoptimized: true },
};

export default nextConfig;