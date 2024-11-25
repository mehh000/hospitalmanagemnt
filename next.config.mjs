/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "www.hopkinsmedicine.org", // Existing domain
      "www.mayoclinic.org", // Add this domain
      "img.freepik.com",
    ],
  },
};

export default nextConfig;
