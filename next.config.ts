import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    env: {
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        AUTH_SECRET: process.env.AUTH_SECRET,
    },
};

export default nextConfig;
