module.exports = {
	lintOnSave: false,
	css: {
		loaderOptions: {
			sass: {
				prependData: '@import "@/styles/base.scss";',
			},
		},
	},
	pwa: {
		workboxOptions: {
			skipWaiting: true,
		},
	},
}
