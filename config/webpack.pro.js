const merge = require('webpack-merge')
const common = require('./webpack.config')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')


const uglify = new UglifyJSPlugin()


module.exports = merge(common, {
	plugins: [uglify]
})