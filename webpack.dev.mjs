import { merge } from 'webpack-merge';
import { commonConfig } from './webpack.common.mjs';

const devConfig = merge(commonConfig, {
  mode: 'development',
  devtool: "source-map",
  devServer: {
    port: process.env.PORT || 3000,
    hot: true,
    liveReload: false,
    historyApiFallback: true,
  },
  output: {
    filename: '[name].bundle.js',
  },
});

export default devConfig;