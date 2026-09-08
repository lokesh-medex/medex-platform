import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "medex.co.th", pathname: "/**" },
      { protocol: "https", hostname: "medex.co", pathname: "/**" },
      { protocol: "https", hostname: "jivi.co", pathname: "/**" },
      { protocol: "https", hostname: "api.medex.co", pathname: "/**" },
      {
        protocol: "https",
        hostname: "ert5385cfau.exactdn.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
