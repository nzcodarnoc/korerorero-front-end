require("dotenv").config();

const envalid = require("envalid");
const { url } = require("envalid");

const env = envalid.cleanEnv(process.env, {
  ORCHESTRATION_ENDPOINT: url(),
});

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
  env: {
    ORCHESTRATION_ENDPOINT: env.ORCHESTRATION_ENDPOINT,
  },
};
