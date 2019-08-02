const {
	entry,
	output,
	html,
	clean,
	NamedModulesPlugin,
	HotModuleReplacementPlugin,
	style,
	image
} = require('./webpack.base')



module.exports = {
	mode: 'production',
	entry,
	output,
	devServer: {
		contentBase: '../dist',
		hot: true
	},
	plugins: [html, clean, NamedModulesPlugin, HotModuleReplacementPlugin],
	module: {
		rules: [style, image]
	}
}