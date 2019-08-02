const {
	entry,
	output,
	html,
	clean,
	style,
	image
} = require('./webpack.base')



module.exports = {
	mode: 'production',
	entry,
	output,
	plugins: [html, clean],
	devtool: 'cheap-module-eval-source-map',
	module: {
		rules: [style, image]
	}
}