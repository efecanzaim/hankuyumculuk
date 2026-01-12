import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGitHubPages ? '/hankuyumculuk' : '';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
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
