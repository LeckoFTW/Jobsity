/**
 * @author Andres Felipe Gonzalez
 * */

const path = require('path');
const APP_FOLDER = path.resolve(__dirname, './src');
const DIST_FOLDER = path.resolve(__dirname, './dist');
const webpack = require('webpack');
module.exports = {
  entry: [
    './src/webapp/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })

  ],
  output: {
    path: DIST_FOLDER,
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  resolve: {
    extensions: [ '.jsx', '.js', '.scss', '.css' ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        include: [ APP_FOLDER ],
        exclude: /(node_modules|bower_components)/,
        options: {
          presets: [ 'react', 'es2015', 'stage-0' ],
          plugins: [ 'transform-decorators-legacy', 'transform-class-properties' ]
        }
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.svg$/,
        use: [
          'svg-loader'
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader?name=images/[name]-[hash].[ext]",
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader?name=fonts/[name]-[hash].[ext]",
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './public'
  },
  devtool: "#inline-source-map"
};
