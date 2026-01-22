import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGitHubPages ? '/hankuyumculuk' : '';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Static export için tüm sayfaları dahil et - Apache için true olmalı
  trailingSlash: true,
  ...(isGitHubPages && {
    basePath,
    assetPrefix: basePath,
  }),
  // Make basePath available to client-side
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
