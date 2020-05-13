// See https://jaketrent.com/post/environment-variables-in-nextjs/
const { parsed: localEnv } = require('dotenv').config()

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
  assetPrefix: process.env.SELF_PATH
};
