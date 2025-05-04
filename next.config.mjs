/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this to suppress environment variable warnings in development
  env: {
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://connected:already@localhost:5432/soulseer',
  },
  // Other config options...
};

export default nextConfig;
