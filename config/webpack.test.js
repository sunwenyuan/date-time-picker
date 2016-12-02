var helpers = require('./helpers');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    modules: [
      helpers.root('src'),
      'node_modules'
    ],
    extensions: ['.ts', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'

      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'ui', 'application'),
        loader: 'null'
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'ui', 'application'),
        loader: 'raw'
      }
    ]
  }
}
