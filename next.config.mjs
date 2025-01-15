/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ilhhxjajdfiflqltyhcw.supabase.co",
        pathname: "/storage/v1/object/sign/products/**",
      },
    ],
  },
};

export default nextConfig;
