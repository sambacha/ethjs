const path = require('path');
const webpack = require('webpack'); // eslint-disable-line

const env = process.env.NODE_ENV;   // eslint-disable-line
const filename = 'ethjs';      // eslint-disable-line
const library = 'Eth';          // eslint-disable-line
const config = {                    // eslint-disable-line
  entry: [
    './lib/index.js',
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: env,
  devtool: 'cheap-module-source-map',
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: filename + '.js',       // eslint-disable-line
    library: library,                 // eslint-disable-line
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: [
    new webpack.BannerPlugin({ banner: ' /* eslint-disable */ ', raw: true, entryOnly: true }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};


if (env === 'production') {
  config.output.filename = filename + '.min.js'; // eslint-disable-line

  config.optimization = {
    minimize: true,
  };
}


module.exports = config;
