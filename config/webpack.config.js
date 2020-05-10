const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const CLIENT_DIR = path.resolve(__dirname, '../');

console.log('CLIENT_DIR:', CLIENT_DIR);

module.exports = {
  entry: {
    app: path.resolve(CLIENT_DIR, 'src/index.jsx'),
  },
  output: {
    path: path.resolve(CLIENT_DIR, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(ttf|woff|jpg|png|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'Hot Module Replacement',
      template: path.resolve(CLIENT_DIR, './src/index.html'),
      filename: path.resolve(CLIENT_DIR, './build/index.html')
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(CLIENT_DIR, './src/index.html'),
      filename: path.resolve(CLIENT_DIR, './build/index.html'),
      chunks: ['app']
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].style.css',
      chunkFilename: '[id].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(CLIENT_DIR, 'build'),
    compress: true,
    port: 3000
  },
  watch: true,
  devtool: 'source-map'
};