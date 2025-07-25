/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      })
    );
    return config;
  },
  env: {
    BASEURL: process.env.BASEURL,
  },
  images: {
    domains: [
      'encamp-media-files.s3.amazonaws.com',
      'encamp-media-files.s3.ap-south-1.amazonaws.com',
      'encampadventures.com',
      'via.placeholder.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encampadventures.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
