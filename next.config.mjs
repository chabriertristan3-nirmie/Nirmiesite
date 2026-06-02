/** @type {import('next').NextConfig} */
const nextConfig = {
  // The design system is ported as global CSS; we keep the build lean and rely on
  // TypeScript for correctness rather than ESLint during builds.
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
};

export default nextConfig;
