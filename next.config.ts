import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Pages may load content only from this site, Vercel Analytics and Cloudflare
// Turnstile. Vercel Analytics serves its script from this site in production
// and from va.vercel-scripts.com in development. Next.js inlines the scripts
// that start each page, so inline scripts are allowed; development also needs
// eval, which React uses for debugging, and inline styles for hot reloading.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com https://challenges.cloudflare.com`,
  `style-src 'self'${isDev ? " 'unsafe-inline'" : ""}`,
  "img-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // This folder is the project root; without this, a lockfile in a parent
  // folder makes Turbopack look above it.
  turbopack: { root: __dirname },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          ...securityHeaders,
          // The site stays out of search engines until Kian approves the launch.
          // Remove this header (and `robots` in app/layout.tsx) at launch.
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
