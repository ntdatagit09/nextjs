/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "localhost",
            },
            {
                protocol: 'https',
                hostname: 'quanlysanpham.test'
            }
        ],
    },
};

export default nextConfig;
