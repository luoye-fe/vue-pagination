var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: path.join(__dirname, '../src/index.js'),
	output: {
		path: path.join(__dirname, '../dist'),
		filename: 'vue-pagination.js',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel' }
		]
	},
	babel: {
		presets: ['es2015']
	},
	devtool: 'source-map'
};
