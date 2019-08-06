const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin')
const webpack = require('webpack')

//出入口
const entry = {
	index: path.resolve(__dirname, '../src/index.ts')
}

const output = {
	path: path.resolve(__dirname, '../dist'),
	chunkFilename: '[name].bundle.js',
	filename: '[name].[chunkhash].js'
}


//插件
const html = new HtmlWebpackPlugin({
	name: 'hello world',
	filename: 'index.html',
	template: path.resolve(__dirname, '../public/index.html')
})

const clean = new CleanWebpackPlugin()



//代码分离
const optimization = {
	splitChunks: {
		cacheGroups: {
			commons: {
				chunks: "initial",
				minChunks: 2,
				maxInitialRequests: 5,
				minSize: 0
			},
			vendor: {
				test: /node_modules/,
				chunks: "initial",
				name: "vendor",
				priority: 10,
				enforce: true
			}
		}
	}
}


const externals = {
	lodash: '_'
}


//通用  配置css 图片 等
const rules = (reg, ...loader) => {
	return {
		test: reg,
		use: loader
	}
}

const style = rules(/\.(css|sass|scss)$/, 'style-loader', 'css-loader', 'sass-loader')
const image = rules(/\.(jpg|png|gif|svg)$/, 'file-loader')
const ts = {
	test: /\.tsx?$/,
	use: 'ts-loader',
	exclude: /node_modules/
}

const extensions = ['.tsx', '.ts', '.js']


module.exports = {
	entry,
	output,
	html,
	clean,
	optimization,
	externals,
	style,
	image,
	ts,
	extensions
}