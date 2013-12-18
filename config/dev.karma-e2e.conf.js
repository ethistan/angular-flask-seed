module.exports = function (config) {
	config.set({
		basePath: '../',

		urlRoot: '/_karma_/',

		files: [
			'test/e2e/**/*.js'
		],

		autoWatch: false,

		browsers: ['PhantomJS'],

		frameworks: ['ng-scenario'],

		singleRun: true,

		proxies: {
			'/': 'http://0.0.0.0:5000/'
		},

		plugins: [
			'karma-junit-reporter',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-ng-scenario'
		],

		junitReporter: {
			outputFile: 'test_out/e2e.xml',
			suite: 'e2e'
		}

	})
};