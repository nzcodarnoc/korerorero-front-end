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
  publicRuntimeConfig: {
    SELF_PATH: process.env.SELF_PATH,
    ORCHESTRATION_ENDPOINT: process.env.ORCHESTRATION_ENDPOINT,
    RECOGNIZER_HOST: process.env.RECOGNIZER_HOST,
    RECOGNIZER_PATH: process.env.RECOGNIZER_PATH,
  }
};

