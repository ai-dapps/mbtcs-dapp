/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["mbtcs.s3.ap-northeast-2.amazonaws.com"],
  },
  reactStrictMode: false,
  swcMinify: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
