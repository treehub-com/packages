const BabiliPlugin = require('babili-webpack-plugin');

const config = {
  entry: {
    route: './src/route.js',
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  plugins: [],
};

if (process.env.ENV === 'production') {
  config.plugins.push(new BabiliPlugin({
    comments: false,
  }));
}

module.exports = config;
