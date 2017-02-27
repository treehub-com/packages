const BabiliPlugin = require('babili-webpack-plugin');

const config = {
  entry: {
    components: ['package-manager-page', 'package-manager-taskbar'],
  },
  output: {
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /.html$/,
        loader: 'raw-loader',
      },
    ],
  },
  plugins: [],
};

if (process.env.ENV === 'production') {
  appConfig.plugins.push(new BabiliPlugin({
    comments: false,
  }));
}

module.exports = config;
