const webpack = require('webpack')
// See https://jaketrent.com/post/environment-variables-in-nextjs/
const { parsed: localEnv } = require('dotenv').config()
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))

    return config;
  },
  assetPrefix: isProd ? "/front-end" : "",
};
