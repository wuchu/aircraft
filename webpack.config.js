const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * @type import('webpack').Configuration
 */
const config = {
  entry: {
    app: './src/index.ts',
  },
  output: {
    filename: 'app.[hash:8].js',
    publicPath: 'http://wuchu.github.io/aircraft/',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(png|jpg|gif|mp3|plist)$/,
        loader: 'url-loader',
        options: {
          limit: false,
          name: '[name].[hash:8].[ext]',
        },
      },
    ],
  },
  externals: {
    cocos2d: 'cc',
  },
  devServer: {
    hot: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
    }),
  ],
};

module.exports = config;
