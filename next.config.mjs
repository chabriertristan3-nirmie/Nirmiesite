/** @type {import('next').NextConfig} */

// Public marketing pages are served from the approved static design bundle in
// /public (so design updates are a drop-in and stay pixel-faithful). The pro
// space (/pro/*) + Supabase remain a Next.js app.
const PUBLIC_PAGES = [
  "univers",
  "application",
  "animations-pro",
  "contact",
  "support",
  "mentions-legales",
  "confidentialite",
  "cgu",
];

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/index.html" },
        ...PUBLIC_PAGES.map((p) => ({ source: `/${p}`, destination: `/${p}.html` })),
      ],
    };
  },
};

export default nextConfig;
