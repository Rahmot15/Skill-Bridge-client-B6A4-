import type { NextConfig } from "next";

const AUTH_API_BASE =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_SERVER_BASE_URL ||
  "https://skill-bridge-server-woad.vercel.app";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${AUTH_API_BASE}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
