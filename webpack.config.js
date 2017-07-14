var path = require('path');

module.exports = {

	entry : './index.js',
	output: {
		path: __dirname,
		filename: './bundle.js',
	},
	module : {
		loaders : [

			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets : ['es2015']
				}
			},
			{
			    test: /\.css$/,
			    loader: 'style-loader!css-loader'
			}


		]
	},

	watch: true,
	devtool: 'source-map'


}