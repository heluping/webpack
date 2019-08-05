const merge = require('webpack-merge')
const common = require('./webpack.config')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')


const uglify = new UglifyJSPlugin({
	sourceMap: true
})


module.exports = merge(common, {
	devtool: 'source-map',
	plugins: [uglify]
})