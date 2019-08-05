const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin')
const webpack = require('webpack')

//出入口
const entry = path.resolve(__dirname, '../src/index.js')

const output = {
	path: path.resolve(__dirname, '../dist'),
	filename: '[name].bundle.js'
}


//插件
const html = new HtmlWebpackPlugin({
	name: 'hello world',
	filename: 'index.html',
	template: path.resolve(__dirname, '../public/index.html')
})

const clean = new CleanWebpackPlugin()

const NamedModulesPlugin = new webpack.NamedModulesPlugin()

const HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin()

//通用  配置css 图片 等
const rules = (reg, ...loader) => {
	return {
		test: reg,
		use: loader
	}
}

const style = rules(/\.(css|sass|scss)$/, 'style-loader', 'css-loader', 'sass-loader')
const image = rules(/\.(jpg|png|gif|svg)$/, 'file-loader')


module.exports = {
	entry,
	output,
	html,
	clean,
	NamedModulesPlugin,
	HotModuleReplacementPlugin,
	style,
	image
}