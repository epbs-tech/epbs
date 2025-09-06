// next.config.ts
import type { NextConfig } from 'next';
import { join } from 'path';

const nextConfig: NextConfig = {
  // Webpack loader for SVGs
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },

  // Enable Turbopack
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Packages to treat as external in server components
  serverExternalPackages: [], 

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'refonte-epbs.vercel.app' },
      { protocol: 'https', hostname: 'site-web-epbs.vercel.app' },
      { protocol: 'https', hostname: 'epbs-consulting.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: process.env.NODE_ENV === 'development',
    loader: 'default',
  },

  async headers() {
    return [
      {
        source: '/api/audio/:path*',
        headers: [
          { key: 'Accept-Ranges', value: 'bytes' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/api/hidrive/files/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=31536000' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, HEAD, OPTIONS' },
          { key: 'Accept-Ranges', value: 'bytes' },
          { key: 'Content-Type', value: 'image/*' },
        ],
      },
      {
        source: '/_next/image',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  serverRuntimeConfig: {
    audioUploadDir: join(process.cwd(), 'public', 'uploads', 'audio'),
  },

  publicRuntimeConfig: {
    audioBaseUrl: '/uploads/audio',
  },

  async rewrites() {
    return [
      {
        source: '/uploads/audio/:path*',
        destination: '/api/audio/:path*',
      },
    ];
  },
};

export default nextConfig;
