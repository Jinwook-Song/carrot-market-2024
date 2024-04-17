/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    taint: true, // 서버 컴포넌트에서 client에 데이터를 전달하는것을 방지
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      { hostname: 'avatars.githubusercontent.com' },
      { hostname: 'imagedelivery.net' },
    ],
  },
};

export default nextConfig;
