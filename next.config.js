/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io", "uploadthing.com", "lh3.googleusercontent.com"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
