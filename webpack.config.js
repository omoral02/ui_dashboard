
module.exports = env => {
const no_dist = (env && env.dist === 'false');
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
return {
			entry: path.resolve(__dirname + '/src/index.js'),
			output: {
		        path: path.resolve(__dirname + '/myapp/public/javascripts'),
		        publicPath: '/',
		        filename: 'bundle.js'    
	   		},
	   		mode: 'development',
		  	module: {
			  rules: [
			    {
			      test: /\.m?js$/,
			      exclude: /(node_modules)/,
			      use: {
			        loader: 'babel-loader',
			        options: {
			          presets: ['@babel/preset-env', 'es2015', 'react'],
			          plugins: ['@babel/plugin-proposal-object-rest-spread']
			        }
			      }
			    }
			  ]
			},
			optimization: {
				noEmitOnErrors: true,
				minimizer: [
					new UglifyJsPlugin({
					sourceMap: true,
					})
				]
			},
			devtool: 'source-map',
			plugins: [
				new webpack.SourceMapDevToolPlugin({
				// this is the url of our local sourcemap server
				publicPath: 'https://localhost:5050/',
				filename: '[file].map',
				}),
				new WebpackCleanupPlugin('target', {verbose: true}),
        		new CopyWebpackPlugin([{from: 'index.html', to: 'index.html'}])
			]
	}
};
