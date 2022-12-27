import { merge } from 'webpack-merge';
import {commonConfig} from './webpack.common.mjs';
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer"
import CopyPlugin from "copy-webpack-plugin";
import path from 'path';

const productionConfig = merge(commonConfig, {
  mode: 'production',
  optimization: {
    minimize: true,
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    filename: '[name]-[chunkhash].bundle.js',
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve('public', 'favicon'), to: 'favicon' },
        { from: path.resolve('public', 'site.webmanifest') },
      ]
    })
  ]
});

export default productionConfig;