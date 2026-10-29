import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // This folder is the project root; without this, a lockfile in a parent
  // folder makes Turbopack look above it.
  turbopack: { root: __dirname },
  // The site stays out of search engines until Kian approves the launch.
  // Remove this header (and `robots` in app/layout.tsx) at launch.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
