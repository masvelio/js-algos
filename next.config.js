module.exports = {
  webpack: function (config) {
    config.module.rules.push(
      {
        test: /\.md$/,
        use: "raw-loader",
      },
      {
        test: /\.test.js$/,
        loader: "ignore-loader",
      },
    );
    return config;
  },
};
