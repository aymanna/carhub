/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  swcMinify: true,
  images: {
    domains: ['cdn.imagin.studio']
  }
}

module.exports = nextConfig
