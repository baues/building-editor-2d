/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: process.env.GITHUB_ACTIONS && "/repository_name",
  trailingSlash: true,
};

module.exports = nextConfig;
