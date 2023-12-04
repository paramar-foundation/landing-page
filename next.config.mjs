await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'paramar-foundation.sirv.com',
        port: '',
        pathname: '/Images/**',
      },
    ],
  },
};

export default config;
