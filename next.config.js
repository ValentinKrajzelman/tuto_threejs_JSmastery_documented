/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // en next hay que hacer whitelist a los origenes de los recursos (imagenes)
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
