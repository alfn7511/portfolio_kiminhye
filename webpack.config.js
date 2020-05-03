const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const mode = process.env.NODE_ENV || 'development'


module.exports = {
  devtool: mode === "development" ? 'cheap-module-eval-source-map' : '',
  mode: mode,
  entry: {
    main: './app.js'
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
  devServer: {
    overlay: true,
    stats: "errors-only",
    proxy: {
      "/api": "http://localhost:8081"
    },
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              sourceMap: mode === "development" ? true : false
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: mode === "development" ? true : false }
          }
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: "url-loader",
        options: {
          name: "[name].[ext]?[hash]",
          limit: 10000 // 10Kb
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader" // 바벨 로더를 추가한다
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `빌드 날짜: ${new Date().toLocaleString()}`
    }),
    new webpack.DefinePlugin({}),
    new HtmlWebpackPlugin({
      template: "./index.html",
      templateParameters: {
        env: mode === "development" ? "(개발용)" : ""
      },
      minify:
        mode === "production"
          ? {
            collapseWhitespace: true, // 빈칸 제거
            removeComments: true // 주석 제거
          }
          : false,
      hash: mode === "production"
    }),
    new CleanWebpackPlugin(),
    ...(mode === "production"
      ? [new MiniCssExtractPlugin({ filename: `[name].css` })]
      : [])
  ],
  externals: {
    axios: 'axios',
  },
}