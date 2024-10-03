const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]'
  },
  //maps from bundle to source creating bundle.map file.
  devtool: 'source-map',
  devServer: {
    static: {
        directory: path.resolve(__dirname, 'dist'),  // serve static files from 'dist'
    },
    //changed from 3000 to 8080
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
   // Enable importing JS / JSX files without specifying their extension
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            // options: {
            //   //presets are defined in my .babelrc file including preset for react
            //     presets: ['@babel/preset-env']
            // },
        },
      },
      {
        //for being able to load images
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Solo Project', 
      filename: 'index.html',
      template: 'src/template.html' //relative path of template.html
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
