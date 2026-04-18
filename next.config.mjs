/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bmxdirect.asia',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
