const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const entry = {
	index: path.resolve(__dirname, '../src/index.js'),
	app: path.resolve(__dirname, '../src/app.js')
}

const output = {
	path: path.resolve(__dirname, '../dist'),
	filename: '[name].bundle.js'
}

//html插件
const html = new HtmlWebpackPlugin({
	filename: 'index.html',
	template: path.resolve(__dirname, '../public/index.html')
})


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
	style,
	image
}