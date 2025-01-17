/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ilhhxjajdfiflqltyhcw.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/products_image/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
