const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Bundle optimization for mobile-first
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Aggressive tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Mobile-optimized code splitting  
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 10000, // Smaller chunks for mobile
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 20, // Reduce for mobile
        maxInitialRequests: 15, // Reduce for mobile
        enforceSizeThreshold: 25000,
        cacheGroups: {
          // Critical React - load immediately
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            priority: 30,
            chunks: 'initial',
            enforce: true,
          },
          // Critical framework
          framework: {
            test: /[\\/]node_modules[\\/]next[\\/]/,
            name: 'framework',
            priority: 25,
            chunks: 'initial',
            enforce: true,
          },
          // Non-critical vendors - defer
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            priority: 20,
            chunks: 'async',
            minSize: 5000,
          },
          // Common modules - defer
          common: {
            name: 'common',
            minChunks: 2,
            priority: 15,
            chunks: 'async',
            reuseExistingChunk: true,
          },
        },
      };
      
      // Reduce bundle size
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, './src'),
      };
    }
    return config;
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Image optimization
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
}

module.exports = nextConfig