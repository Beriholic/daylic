import type { NextConfig } from "next";

const rewrites = async () => {
  return [
    {
      source: "/api/:path*",
      destination: "http://localhost:8080/api/:path*",
    },
  ];
};

const nextConfig: NextConfig = {
  rewrites
};

export default nextConfig;
