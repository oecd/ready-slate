const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withTM = require('next-transpile-modules')(['@oecd-pac/ready-slate']);

const plugins = [withBundleAnalyzer, withTM];

const nextConfig = {
  assetPrefix: '/ready-slate',
  eslint: {
    // lint is made separately
    ignoreDuringBuilds: true,
    dirs: ['src'],
  },
};

// ******************************************************************************
// no live transpilation for testing using real @oecd-pac/ready-slate dependency
// ******************************************************************************

// const plugins = [withBundleAnalyzer];

// const nextConfig = {
//   eslint: {
//     // lint is made separately
//     ignoreDuringBuilds: true,
//     dirs: ['src'],
//   },
// };

module.exports = withPlugins(plugins, nextConfig);
