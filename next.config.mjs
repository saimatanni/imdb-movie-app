/** @type {import('next').NextConfig} */
const nextConfig = {
    // images:{
    //     domains:['image.tmdb.org'],
    // }
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "image.tmdb.org",
          },
        ],
      },
};

export default nextConfig;
