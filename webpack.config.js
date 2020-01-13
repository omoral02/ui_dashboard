const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');
const paths = {
    dir: path.resolve(__dirname),
    node_modules: path.resolve(__dirname, 'node_modules'),
    src: path.resolve(__dirname, 'src'),
    css: path.resolve(__dirname, 'src', 'css'),
    utilities: path.resolve(__dirname, 'src', 'js', 'gator_components', 'utilities'),
    require: path.resolve(__dirname, 'src', 'js', 'gator_components', 'utilities', 'require.js'),
    main: path.resolve(__dirname, 'src', 'js', 'gator_components', 'utilities', 'main.js'),
    favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
    html: path.resolve(__dirname, 'src', 'pug_views', 'main_app', 'index.pug'),
    plxPugTemplate: path.resolve(__dirname, 'src', 'js', 'gator_components', 'plx', 'templates', 'higher_order_component.pug'),
    dist: path.resolve(__dirname, 'dist'),
    bin: path.resolve(__dirname, 'dist', 'bin'),
    public: path.resolve(__dirname, 'dist', 'public'),
    jsPublic: path.resolve(__dirname, 'dist', 'public', 'js'),
    htmlBuildFilename: path.resolve(__dirname, 'dist', 'public', 'index.html'),
    plxHtmlTemplateFileName: path.resolve(__dirname, 'dist', 'public', 'plxhigherOrder.html'),
    copyIcon: {
      to: path.resolve(__dirname, 'dist', 'public', 'favicon.ico'),
      from: path.resolve(__dirname, 'src', 'favicon.ico'),
    },
    copyRequire: {
      to: path.resolve(__dirname, 'dist', 'public', 'js', 'require.js'),
      from: path.resolve(__dirname, 'src', 'js', 'gator_components', 'utilities', 'require.js')
    },
};

const dev_mode = process.env.NODE_ENV !== 'production';

const indexPluginOptions = {
  filename: paths.htmlBuildFilename,
  excludeChunks: ['vendors~main'],
  disable: false,
};
const indexHtmlOptions = {
  template: paths.html,
  inject: true,
  hash: false,
  minify: {
    removeComments: dev_mode ? false : true,
    collapseWhitespace: dev_mode ? false : true,
    minifyJS: dev_mode ? false : true,
    minifyCSS: dev_mode ? false : true,
    useShortDoctype: dev_mode ? false : true,
  },
  appMountId: 'app',
};

const plxTemplatePluginOptions = {
  filename: paths.plxHtmlTemplateFileName,
  excludeChunks: ['vendors~main'],
  disable: true,
};
const plxTemplateHtmlOptions = {
  template: paths.plxPugTemplate,
  inject: true,
  hash: false,
  minify: {
    removeComments: dev_mode ? false : true,
    collapseWhitespace: dev_mode ? false : true,
    minifyJS: dev_mode ? false : true,
    minifyCSS: dev_mode ? false : true,
    useShortDoctype: dev_mode ? true : true,
  },
  appMountId: 'template',
};

const config = {
  mode: dev_mode ? 'development' : 'production',
  watch: false,
  watchOptions: {
    ignored: /node_modules/
  },
  stats: 'verbose',
  context: paths.dir,
  entry:{
    main: paths.main,
  },
  performance: {
    maxEntrypointSize: 400000,
    maxAssetSize: 250000
  },
  devtool: dev_mode ? 'cheap-module-eval-source-map' : 'hidden-source-map' ,
  // externals: [nodeExternals()  // nodeExternals()- externalizes core Node pkgs for client-side use
    // {'require': 'require'},{'strip-ansi':'strip-ansi'}
  // ],
  output: {
    // `jsonpScriptType:` Allows customization of the script type
    // webpack injects script tags into the DOM to download async chunks
    // options >> `text/javascript` || `module`
    jsonpScriptType : 'text/javascript',
    // filename: dev_mode ? 'js/[name].[id].js' : 'js/[name].[id].js',
    // chunkFilename: dev_mode ? 'js/[name].[chunk].js' : 'js/[name].js',
    filename: dev_mode ? 'js/[name].dev.bundle.js' : 'js/[name].[hash].js',
    chunkFilename: dev_mode ? 'js/[name].dev.bundle.js' : 'js/[name].[hash].js',
    devtoolModuleFilenameTemplate: 'webpack://[resource-path]?[loaders]',
    // library: 'require',    // define here your client-side external lib packages 
    // libraryTarget: 'amd', // is your exported script going to be considered an AMD module? 
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
    minimize: true,
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
        //single pre-entry point identified for transpile performance
        include: paths.main,
        exclude: /node_modules/,
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
        //entry point identified for transpile performance
        include: paths.main,
        exclude: /node_modules/
      },
      {
        test: /\.html$/i,
        use: [ 
            {
              loader: 'file-loader',
              options: {
                minimize: true
              }
            }
        ]
      },
      {
        test: /\.pug$/i,
        use: 'pug-loader'
      },
      {
        test: /\.css$/i,
        use: [
          // { loader: 'style-loader'},
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: paths.public,
              hmr: dev_mode ? 'development' : 'production',
              reloadAll: true,
            },
          },
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
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: '[name].css',
        chunkFilename: '[name].[id].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      new CopyWebpackPlugin([paths.copyIcon]),
      // new CopyWebpackPlugin([paths.copyRequire]),
      new HtmlWebpackPlugin(Object.assign(indexPluginOptions, indexHtmlOptions)),
      new HtmlWebpackPlugin(Object.assign(plxTemplatePluginOptions, plxTemplateHtmlOptions)),
      new GenerateSW({
        chunks: ['main','runtime', 'commons', 'vendors']
      }),
      new PreloadWebpackPlugin({
         rel: 'prefetch',
        //  option/attribute for preload not used for prefetch
        //  as: 'text/javacript',
         include: ['main', 'runtime']
       }),
      new JavaScriptObfuscator(
         {rotateUnicodeArray: true}, ['runtime.*']
      )
  ]
};
//output main config options
console.log('\n \n \t      Is build `mode:` property set to `development` ? ', dev_mode.toString().toUpperCase());
console.log('\n \n \t      Is build `watch:` property set to `true` ? ', config.watch.toString().toUpperCase());
console.log('\n \n \t      To confirm, Webpack\'s `config.mode` was flag-flipped to: ', config.mode.toString().toUpperCase(), 'MODE', '\n \n' );
module.exports = config;
