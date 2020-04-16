// See https://github.com/docker/compose/issues/6889
// for why this project is not using a .env file
// TL:DR; .env may be broken for docker-compose 

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
    ORCHESTRATION_ENDPOINT: "http://localhost:8000/orchestration",
  },
};
