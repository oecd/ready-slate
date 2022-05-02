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

module.exports = withPlugins(plugins, nextConfig);
