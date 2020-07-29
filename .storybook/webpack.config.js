module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [require.resolve("babel-preset-react-app")],
    },
  });
  config.module.rules.push({
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "sass-loader"],
  });
  config.resolve.extensions.push(".ts", ".tsx", "scss");
  //
  // CSS Modules
  // Many thanks to https://gist.github.com/justincy/b8805ae2b333ac98d5a3bd9f431e8f70
  //

  // First we prevent webpack from using Storybook CSS rules to process CSS modules
  config.module.rules.find(
    (rule) => rule.test.toString() === "/\\.css$/"
  ).exclude = /\.module\.css$/;

  // Then we tell webpack what to do with CSS modules
  config.module.rules.push({
    test: /\.module\.css$/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
          modules: true,
        },
      },
    ],
  });
  return config;
};
