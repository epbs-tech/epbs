// next.config.ts
import type { NextConfig } from 'next';
import { join } from 'path';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    serverActions: {
      bodySizeLimit: '20mb',
    },
    serverComponentsExternalPackages: [],
  },
  images: {
    // Utilisation de remotePatterns au lieu de domains (recommandé)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'refonte-epbs.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'site-web-epbs.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'epbs-consulting.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400, // 24 heures
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Désactive l'optimisation en développement pour éviter les timeouts
    unoptimized: process.env.NODE_ENV === 'development',

    // Configuration pour gérer les erreurs d'images
    loader: 'default',
    loaderFile: undefined,
  },
  // Configuration des headers pour améliorer la performance
  async headers() {
    return [
      {
        source: '/api/audio/:path*',
        headers: [
          {
            key: 'Accept-Ranges',
            value: 'bytes'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/api/hidrive/files/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=31536000',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, HEAD, OPTIONS',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
          // Ajout d'headers pour les images
          {
            key: 'Content-Type',
            value: 'image/*',
          },
        ],
      },
      // Headers spécifiques pour les images
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Configuration des chemins publics
  serverRuntimeConfig: {
    audioUploadDir: join(process.cwd(), 'public', 'uploads', 'audio')
  },
  publicRuntimeConfig: {
    audioBaseUrl: '/uploads/audio'
  },
  // Ajout du répertoire uploads dans les ressources statiques
  async rewrites() {
    return [
      {
        source: '/uploads/audio/:path*',
        destination: '/api/audio/:path*'
      }
    ];
  }
};

export default nextConfig;
