/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this 'images' block
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
