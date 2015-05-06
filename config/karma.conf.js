module.exports = function (config) {
	config.set({
		basePath: '..',

		files: [
			'test/lib/jQuery/jquery-1.10.2.js',
			'static/lib/angular/angular.js',
			'static/lib/angular/angular-*.js',
			'static/js/**/*.js',
			'test/unit/**/*.js'
		],

		exclude: [
			'static/lib/angular/*.min.js',
            '**/angular-scenario.js'
		],

		autoWatch: false,
		singleRun: true,

		frameworks: ['jasmine'],

		browsers: ['PhantomJS'],

		plugins: [
			'karma-junit-reporter',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-coverage'
		],

		preprocessors: {
			'static/js/**/*.js': 'coverage'
		},

		reporters: ['coverage', 'progress', 'junit'],

		junitReporter: {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		},

		coverageReporter: {
			type: 'html',
			dir: 'test_out/coverage/'
		}
	})
};