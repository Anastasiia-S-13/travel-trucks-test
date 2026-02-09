/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ftp.goit.study',
        pathname: '/img/**', // дозволяємо всі зображення в цій папці
      },
    ],
  },
};

export default nextConfig;