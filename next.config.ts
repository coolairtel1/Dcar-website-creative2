import type { NextConfig } from "next";

// Static export: `npm run build` writes plain HTML/CSS/JS to ./out, deployable to any Hostinger plan.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // /san-pham/ -> /san-pham/index.html, no rewrite rules needed on LiteSpeed/Apache
  images: { unoptimized: true }, // no image-optimization server on static hosting
};

export default nextConfig;
