module.exports = function(config){
    config.set({
        basePath : '../../',

        files : [
            'static/lib/angular/angular.js',
            'static/lib/angular/angular-*.js',
            'test/lib/angular/angular-mocks.js',
            'static/lib/angular/angular-route.js',
            'static/lib/angular/angular-sanitize.js',
            'static/lib/angular/angular-animate.js',
            'static/lib/jQuery/jquery-1.11.1.js',
            'static/lib/bootstrap/bootstrap.min.js',
            'static/js/**/*.js',
            'test/unit/**/*.js'
        ],

        preprocessors: {
            'static/js/**/*.js': 'coverage'
        },

        exclude: [
            'static/lib/angular/*.min.js',
            '**/angular-scenario.js'
        ],

        autoWatch: false,
        singleRun: true,

        frameworks: ['jasmine'],

        browsers : ['PhantomJS'],

        reporters: ['progress', 'junit', 'coverage'],

        plugins: [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
})};
