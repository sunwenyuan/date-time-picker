var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'libs': './src/ui/libs.ts',
    'app': './src/ui/app.ts'
  },

  resolve: {
    modules: [
      helpers.root('src'),
      'node_modules'
    ],
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {loader: 'tslint-loader'}
        ]
      },
      {
        test: /\.ts$/,
        use: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: [
          'file-loader?name=assets/[name].[hash].[ext]'
        ]
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'ui', 'application'),
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'ui', 'application'),
        use: [
          { loader: 'raw-loader' }
        ]
      },
      {
        test: /\.less$/,
        include: helpers.root('src', 'ui', 'application'),
        loader: ['raw-loader', 'less-loader']
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'libs']
    }),

    new HtmlWebpackPlugin({
      template: 'src/ui/index.html'
    }),

    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    ),

    new ExtractTextPlugin("style.css")
  ]
};
