const {
	entry,
	output,
	html,
	clean,
	providePlugin,
	optimization,
	externals,
	style,
	image
} = require('./webpack.base')



module.exports = {
	entry,
	output,
	// externals: externals,
	plugins: [html, clean, providePlugin],
	optimization: optimization,
	module: {
		rules: [style, image]
	}
}