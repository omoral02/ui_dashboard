const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const paths = {
    dir: path.resolve(__dirname),
    src: path.resolve(__dirname, 'src'),
    css: path.resolve(__dirname, 'src', 'css'),
    main: path.resolve(__dirname, 'src', 'js', 'gator_components', 'utilities', 'main.js'),
    favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
    html:path.resolve(__dirname, 'src', 'pug_views', 'index.pug'),
    dist: path.resolve(__dirname, 'dist'),
    bin: path.resolve(__dirname, 'dist', 'bin'),
    public: path.resolve(__dirname, 'dist', 'public'),
    htmlBuildFilename: path.resolve(__dirname, 'dist', 'public', 'index.html'),
    copyIcon: {
      to: path.resolve(__dirname, 'dist', 'public', 'favicon.ico'),
      from: path.resolve(__dirname, 'src', 'favicon.ico'), 
    },
};
 
//  Flip this boolean flag result to change development mode options
//  development mode -> const dev_mode = (process.env.NODE_ENV !== 'production');
//  production mdoe -> const dev_mode = (process.env.NODE_ENV == 'production');

const dev_mode = (process.env.NODE_ENV !== 'production');

const pluginOptions = {
  filename: paths.htmlBuildFilename,
  excludeChunks: ['vendors~main'],
  disable: false,
};
const htmlOptions = {
  template: paths.html,
  inject: true,
  hash: true,
  minify: {
    removeComments: dev_mode ? false : true,
    collapseWhitespace: dev_mode ? false : true,
    minifyJS: dev_mode ? false : true,
    minifyCSS: dev_mode ? false : true,
    useShortDoctype: dev_mode ? false : true,
  },
  appMountId: 'app',
};

const config = {
  mode: dev_mode ? 'development' : 'production',
  watch: false,
  watchOptions: {
    ignored: /node_modules/
  },
  context: paths.dir,
  entry:{
    main: paths.main,
  },
  devtool: dev_mode ? 'cheap-module-eval-source-map' : 'hidden-source-map' ,
  output: {
    // `jsonpScriptType:` Allows customization of the script type 
    // webpack injects script tags into the DOM to download async chunks
    // options >> `text/javascript` || `module`
    jsonpScriptType : 'text/javascript',
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
    compress: dev_mode ? false : true,
  },
  optimization: {
    noEmitOnErrors: true,
    splitChunks: false,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/i,
        //single entry point indentified for transpile performance
        include: paths.main,
        // exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
             options: {
                emitError: true
             }
          },
        ],
      },
      {
        test: /\.js$/i,
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
        test: /\.css$/i,
        use: [
          { loader: 'style-loader'},
          { loader: 'css-loader'}
        ]
      },
      {
        test: /\.(png|jpg|gif|ico)$/i,
        use: [
          { loader: 'url-loader'}
        ]
      }
    ]
  },
  plugins: [
      new webpack.ProgressPlugin(),
      new CopyWebpackPlugin([paths.copyIcon]),
      new HtmlWebpackPlugin(Object.assign(pluginOptions, htmlOptions)),
      new GenerateSW({ 
        chunks: ['main','runtime', 'commons', 'vendors']
      }),
      new PreloadWebpackPlugin({
         rel: 'prefetch',
        //  option/attribute for preload not used for prefetch
        //  as: 'text/javacript',  
         include: ['runtime', 'main']
       }),
  ]
};
//output main config options
console.log('\n \n \t      Is build `mode:` property set to `development` ? ', dev_mode.toString().toUpperCase());
console.log('\n \n \t      Is build `watch:` property set to `true` ? ', config.watch.toString().toUpperCase());
console.log('\n \n \t      To confirm, Webpack\'s `config.mode` was flag-flipped to: ', config.mode.toString().toUpperCase(), 'MODE', '\n \n' );
module.exports = config;
