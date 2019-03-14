const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const paths = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  public: path.join(__dirname, 'dist', 'public')
};
const html = path.resolve(__dirname, paths.src, 'pug_views', 'layout.pug');
const css = path.resolve(__dirname, paths.src, 'css', 'index.css');
const devMode = process.env.NODE_ENV !== 'production';
const htmlOptions = {
  template: html,
  inject: true,
  minify: {
    removeComments: devMode ? false : true,
    collapseWhitespace: devMode ? false : true,
    minifyJS: devMode ? false : true,
    minifyCSS: devMode ? false : true
  },
  appMountId: 'app'
};
const htmlPluginOptions = {
  filename: path.join(paths.public, 'build.html'), 
  excludeChunks: ['modules', 'commons', 'server'],
  disable: false
};
const sourceMapPublicPath = paths.public;
const config = {
  watch: true,
  context: path.resolve(__dirname),
  entry:{
    main: path.resolve(paths.src, 'js', 'main.js' )
    // server: path.resolve(paths.dist, 'app.js')
  },
  output: {
    path: path.resolve(paths.public, 'javascripts'),
    filename: '[name].bundle.js',
    chunkFileName: '[name].bundle.js'
  },
  devtool: 'source-map',
  output: {
    filename: devMode ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    path: sourceMapPublicPath,
    publicPath: '/'
  },
  optimization: {
    noEmitOnErrors: true,
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: 'single'
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
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
          'style-loader',
          'css-loader'
        ]
      }
      // ,
      // {
      //   test: /\.png$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         mimetype: 'image/png'
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.ico$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         mimetype: 'image/ico'
      //       }
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
      new webpack.ProgressPlugin(),
      new CopyWebpackPlugin([{from: path.resolve(paths.src, 'css'), to: path.resolve(paths.dist, 'public', 'css')}]),
      new CopyWebpackPlugin([{from: path.resolve(paths.src, 'images'), to: path.resolve(paths.dist, 'public', 'images')}]),
      new CopyWebpackPlugin([{from: path.resolve(paths.src, 'favicon.ico'), to: path.resolve(paths.dist, 'public', 'favicon.ico')}]),
      new HtmlWebpackPlugin(Object.assign(htmlPluginOptions, htmlOptions)),
      new GenerateSW({ 
        chunks: ['main', 'modules', 'commons', 'server']
      }),
      new PreloadWebpackPlugin({
         rel: 'preload',
         include: ['runtime', 'main']
       })
  // new MiniCssExtractPlugin(cssPluginOptions) ,
  // new ExtractTextPlugin(Object.assign(cssPluginOptions)),
    ]

};

// const cssPluginOptions = {
//   filename: css, 
//   disable: false, 
//   allChunks: true
// };

module.exports = config;
