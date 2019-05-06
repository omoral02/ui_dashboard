
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
// import CopyWebpackPlugin from 'copy-webpack-plugin';
// copy plugin omitted while grunt handles the copying for now. 

module.exports = {
			mode: 'development',
			watch: true,
			entry: path.resolve(__dirname, 'src', 'js', 'main.js'),
			output: {
		        path: path.resolve(__dirname, 'dist', 'public', 'javascripts'),
		        publicPath: '/',
		        filename: 'bundle.js'    
	   		},
	   		module: {
			  rules: [
			    {
			  		test: /\.html$/,
			  		exclude: /node_modules/,
			  		use: {
			  			loader: 'raw'
		 		 	}
			  	},
			  	{
		    		test: /\.css$/,
		    		use: ['style-loader', 'css-loader'] 
		    	},
		    	{
			      	test: /\.js$/,
			     	exclude: /node_modules/,
			     	use: {
				        loader: 'babel-loader',
				        options: {
						  presets: ['@babel/preset-env'],
						  plugins: ['@babel/plugin-transform-classes', '@babel/plugin-transform-spread']
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
        		// new CopyWebpackPlugin([{from: 'index.html', to: 'index.html'}])
			]
}
