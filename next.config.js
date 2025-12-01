/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Bundle optimization with aggressive splitting
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Aggressive tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Advanced code splitting for mobile performance
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 15000, // Smaller chunks for mobile
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 25, // Reduce for mobile
        maxInitialRequests: 25, // Reduce for mobile
        enforceSizeThreshold: 40000,
        cacheGroups: {
          // Critical React chunks
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            priority: 20,
            chunks: 'initial', // Load immediately
          },
          // Next.js framework - defer
          nextjs: {
            test: /[\\/]node_modules[\\/]next[\\/]/,
            name: 'nextjs',
            priority: 15,
            chunks: 'async', // Load on demand
          },
          // Vendor libraries - split by size
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)?.[1];
              return `vendor.${packageName}`.replace('@', '');
            },
            priority: 10,
            chunks: 'async', // Load on demand for mobile
            minSize: 8000, // Smaller vendor chunks
          },
          // Common modules - defer
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            chunks: 'async',
            reuseExistingChunk: true,
          },
        },
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