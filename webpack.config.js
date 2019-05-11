const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const paths = {
  dir: path.resolve(__dirname),
  src: path.resolve(__dirname, 'src'),
  main: path.resolve(__dirname, 'src', 'js', 'main.js' ),
  dist: path.resolve(__dirname, 'dist'),
  public: path.resolve(__dirname, 'dist', 'public')
};
const images = path.resolve(paths.src, 'images');
const favicon = path.resolve(paths.src, 'favicon.ico');
const html = path.resolve(paths.src, 'pug_views', 'index.pug');
const css = path.resolve(paths.src, 'css', 'index.css');
const pluginOptions = {
  filename: path.resolve(paths.public, 'build.html'), 
  excludeChunks: ['vendors~main'],
  disable: false
};
// const copyCSS = {
//   from: css, 
//   to: path.resolve(paths.public, 'css')
// };
// const copyIMAGES = {
//   from: images, 
//   to: path.resolve(paths.public, 'images')
// };
const copyICON = {
  from: favicon, 
  to: path.resolve(paths.public, 'favicon.ico')
};
// 
//  Flip this flag to change development mode options
//  as process.env.NODE_ENV is, by default, not set to "production" 
//  within the build script webpack.config.js
//
const dev_mode = (process.env.NODE_ENV == 'production');
console.log('Development mode: ', dev_mode);

const htmlOptions = {
  template: html,
  inject: true,
  minify: {
    removeComments: dev_mode ? false : true,
    collapseWhitespace: dev_mode ? false : true,
    minifyJS: dev_mode ? false : true,
    minifyCSS: dev_mode ? false : true
  },
  appMountId: 'app'
};

const config = {
  watch: true,
  context: paths.dir,
  entry:{
    main: paths.main,
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(paths.public, 'javascripts'),
    filename: dev_mode ? 'js/[name].js' : 'js/[chunkhash].js',
    chunkFilename: dev_mode ? 'js/[name].bundle.js' : 'js/[chunkhash].js',
    path: paths.public,
    publicPath: '/'
  },
  optimization: {
    noEmitOnErrors: true,
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
      sourceMap: true,
      })
    ]
  },
  devServer: {
    contentBase: path.resolve(paths.dist),
    port: 9000
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: true
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader'},
          { loader: 'css-loader'}
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          { loader: 'url-loader'}
        ]
      }
    ]
  },
  plugins: [
      new webpack.ProgressPlugin(),
      // new CopyWebpackPlugin([copyCSS]),
      // new CopyWebpackPlugin([copyIMAGES]),
      new CopyWebpackPlugin([copyICON]),
      new HtmlWebpackPlugin(Object.assign(pluginOptions, htmlOptions)),
      new GenerateSW({ 
        chunks: ['main','runtime', 'commons', 'vendors']
      }),
      new PreloadWebpackPlugin({
         rel: 'preload',
         include: ['runtime', 'main']
       }),
      // new webpack.SourceMapDevToolPlugin({
			// 	// this is the url of our local sourcemap server
			// 	publicPath: 'https://localhost:7575/',
			// 	filename: '[file].map',
      //   }),
      // new WebpackCleanupPlugin('target', {verbose: true})
  ]
};

module.exports = config;
