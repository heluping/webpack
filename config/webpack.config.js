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
	module: {
		rules: [style, image]
	}
}