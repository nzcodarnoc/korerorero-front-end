const webpack = require('webpack')
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    return config;
  },
  assetPrefix: process.env.SELF_PATH,
};
