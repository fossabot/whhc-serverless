const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  mode: 'production',
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
    new FilterWarningsPlugin({
      exclude: [
        /mongodb/,
        /mssql/,
        /mysql/,
        /oracledb/,
        /pg-native/,
        /pg-query-stream/,
        /pg/,
        /react-native-sqlite-storage/,
        /redis/,
        /sql.js/,
        /sqlite3/,
      ],
    }),
  ],
  target: 'node',
};
