import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * `npm run dev` opened through this computer's network IP (e.g. http://192.168.1.105:3000, to test on a phone):
 * Next.js blocks its dev scripts for any origin but localhost, so the page renders but nothing is clickable.
 * Allow this machine's own LAN addresses.
 */
const lanAddresses = Object.values(os.networkInterfaces())
  .flat()
  .filter(address => address && address.family === 'IPv4' && !address.internal)
  .map(address => address.address);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export (out/) – Netlify serves it as plain files, no server or plugin needed.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // The site is its own project inside the generator repo.
  turbopack: { root: path.dirname(fileURLToPath(import.meta.url)) },
  allowedDevOrigins: lanAddresses,
};

export default nextConfig;
