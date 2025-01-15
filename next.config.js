/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ilhhxjajdfiflqltyhcw.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/products_image/**",
      },
    ],
  },
  // ...
};

module.exports = nextConfig;
