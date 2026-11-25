import type { NextConfig } from "next";

// Content Security Policy for the founding beta page. The form posts to the LoquiHQ API only.
// Next.js inlines its bootstrap scripts, so script-src needs 'unsafe-inline' (no third-party scripts load).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://api.loquihq.com",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    // Next's dev server needs eval for hot reload, so the CSP applies to production builds only
    if (process.env.NODE_ENV === "production") security.push({ key: "Content-Security-Policy", value: csp });
    return [{ source: "/:path*", headers: security }];
  },
  async redirects() {
    // One Privacy Policy and one set of Terms: the ones on loquihq.com
    return [
      { source: "/privacy", destination: "https://www.loquihq.com/privacy", permanent: false },
      { source: "/terms", destination: "https://www.loquihq.com/terms", permanent: false },
    ];
  },
};

export default nextConfig;
