const {
	entry,
	output,
	html,
	clean,
	optimization,
	style,
	image
} = require('./webpack.base')



module.exports = {
	entry,
	output,
	plugins: [html, clean],
	optimization: optimization,
	module: {
		rules: [style, image]
	}
}