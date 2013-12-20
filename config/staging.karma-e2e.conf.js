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
            '/': 'http://localhost:5005/'
        },

        reporters: ['dots', 'junit'],

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

