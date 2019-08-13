// vue.config.js
module.exports = {
	// options 
	devServer: {
		disableHostCheck: true,
		publicPath: '/',
		// proxy: process.env.ROOT_API,
        proxy: 'http://localhost:8088/',
    },
}
