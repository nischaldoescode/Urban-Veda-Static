import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },

  // compression
  compress: true,

  // production optimizations
  poweredByHeader: false,
  reactStrictMode: true,
};

module.exports = nextConfig;
