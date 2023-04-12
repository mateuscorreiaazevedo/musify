/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.scdn.co',
      'thisis-images.scdn.co',
      'mosaic.scdn.co',
      'charts-images.scdn.co'
    ]
  }
}

module.exports = nextConfig
