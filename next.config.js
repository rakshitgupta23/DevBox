/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      // Temporarily ignore type errors during build
      ignoreBuildErrors: true,
    },
    devIndicators: false,
    // Add any other Next.js config options you might need
  };
  
  module.exports = nextConfig;