const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
  devtool: 'source-map',
  entry: slsw.lib.entries,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  plugins: [
  ],
  target: 'node',
};
