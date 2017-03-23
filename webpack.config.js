var webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: { path: './dist/', filename: 'bundle.js' },
  module: {
    rules: [{
      test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
    }]
  },
  watch: true
};
