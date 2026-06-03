import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Serve imagens direto de public/ sem cache de otimização.
  // Portfolio com poucas imagens — tradeoff irrelevante.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
