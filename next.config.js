/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/menu',
        permanent: false,
      },
    ]
  },
  images: {
    domains: ['images.ctfassets.net']
  }
}

module.exports = nextConfig
