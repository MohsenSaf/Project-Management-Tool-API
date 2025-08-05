/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://localhost:3000/api/:path*",
      },
    ]
  },
}

export default nextConfig
