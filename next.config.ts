import type { NextConfig } from "next";
import "./env";

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
