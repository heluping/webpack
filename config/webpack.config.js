const {
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
} = require('./webpack.base')



module.exports = {
	entry,
	output,
	// externals: externals,
	plugins: [html, clean],
	optimization: optimization,
	module: {
		rules: [style, image, ts]
	},
	resolve: {
		extensions: extensions
	}
}