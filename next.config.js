// See https://github.com/docker/compose/issues/6889
// for why this project is not using a .env file
// TL:DR; .env may be broken for docker-compose
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
  assetPrefix: isProd ? "http://localhost:8000/front-end" : "",
  publicRuntimeConfig: {
    staticFolder: isProd ? "/front-end" : "",
    ORCHESTRATION_ENDPOINT: "http://localhost:8000/orchestration",
    RECOGNIZER_HOST: "http://localhost:8000",
    RECOGNIZER_PATH: "/recognizer/socket.io"
  },
};
