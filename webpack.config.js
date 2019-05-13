const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const paths = {
  dir: path.resolve(__dirname),
  src: path.resolve(__dirname, 'src'),
  main: path.resolve(__dirname, 'src', 'js', 'main.js' ),
  dist: path.resolve(__dirname, 'dist'),
  bin: path.resolve(__dirname, 'dist', 'bin'),
  public: path.resolve(__dirname, 'dist', 'public'),
};
// const images = path.resolve(paths.src, 'images');
// const css = path.resolve(paths.src, 'css', 'index.css');
const favicon = path.resolve(paths.src, 'favicon.ico');
const html = path.resolve(paths.src, 'pug_views', 'index.pug');

const pluginOptions = {
  filename: path.resolve(paths.public, 'index.html'), 
  excludeChunks: ['vendors~main'],
  disable: false
};
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
  watchOptions: {
    ignored: /node_modules/
  },
  context: paths.dir,
  entry:{
    main: paths.main,
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    // `jsonpScriptType:` Allows customization of the script type 
    // webpack injects script tags into the DOM to download async chunks
    // options >> `text/javascript` || `module`
    jsonpScriptType : 'module',
    filename: dev_mode ? 'js/[name].bundle.js' : 'js/[hash:6].js',
    chunkFilename: dev_mode ? 'js/[id].bundle.js' : 'js/[chunkhash:8].js',
    devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource-path]?[loaders]',
    path: paths.public,
    publicPath: '/',
    pathinfo: false,
  },
  devServer: {
    hot: true,
    open: true,
    stats: {
      colors: true,
    },
    contentBase: paths.public,
    compress: true,
  },
  optimization: {
    noEmitOnErrors: true,
    splitChunks: false,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
      sourceMap: false,
      })
    ]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        //single entry point indentified for transpile performance
        include: paths.main,
        // exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: true
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        //single entry point indentified for transpile performance
        include: paths.main,
        // exclude: /node_modules/
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
      new CopyWebpackPlugin([copyICON]),
      new HtmlWebpackPlugin(Object.assign(pluginOptions, htmlOptions)),
      new GenerateSW({ 
        chunks: ['main','runtime', 'commons', 'vendors']
      }),
      new PreloadWebpackPlugin({
         rel: 'preload',
         include: ['runtime', 'main']
       }),
  ]
};

module.exports = config;
