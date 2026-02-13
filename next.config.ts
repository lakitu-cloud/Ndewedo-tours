import type { NextConfig } from "next";

const nextConfig: NextConfig = {
output: 'export', // this enables static HTML export
images: {
unoptimized: true, // necessary if using next/image for static export
},
};

export default nextConfig;
