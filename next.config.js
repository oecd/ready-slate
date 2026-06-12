const withBundleAnalyzer = require('@next/bundle-analyzer')();

const localLibSourcePath = process.env.LOCAL_LIB_SOURCE_PATH;
const env = process.env.NODE_ENV;
const assetPrefix = process.env.ASSET_PREFIX;

const nextConfig = {
  output: 'export',
  assetPrefix,
  ...(localLibSourcePath && env === 'development'
    ? {
        turbopack: {
          resolveAlias: {
            '@oecd-pac/ready-slate': localLibSourcePath,
          },
        },
        transpilePackages: ['@oecd-pac/ready-slate'],
      }
    : {}),
};

module.exports =
  process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig;
