/* eslint-disable no-param-reassign */
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const localLibSourcePath = process.env.LOCAL_LIB_SOURCE_PATH;
const assetPrefix = process.env.ASSET_PREFIX;

const nextConfig = {
  assetPrefix,
  eslint: {
    // lint is made separately
    ignoreDuringBuilds: true,
    dirs: ['src'],
  },
  ...(localLibSourcePath
    ? {
        transpilePackages: ['@oecd-pac/ready-slate'],
        webpack(config) {
          config.resolve.alias['@oecd-pac/ready-slate$'] = path.join(
            localLibSourcePath,
            'src\\index',
          );

          return config;
        },
      }
    : {}),
};

module.exports = withBundleAnalyzer(nextConfig);
