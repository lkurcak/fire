import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.CI ? '/fire' : '',
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig;
