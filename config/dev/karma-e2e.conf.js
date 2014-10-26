var fs = require('fs');
var environment = process.env.ENV || "dev";

var getProxy = function () {
    var file, portNumber, inFlaskSection = false;

    if(fs.existsSync("config/" + environment + "/app.cfg")) {
        file = fs.readFileSync("config/" + environment + "/app.cfg", {encoding: "utf8"}).split("\n");
    } else {
        file = fs.readFileSync("app.cfg", {encoding: "utf8"}).split("\n");
    }

    for (var index in file) {
        var line = file[index];

        if (line == "[Flask]") {
            inFlaskSection = true;
        }

        if(inFlaskSection && line.indexOf("port=") == 0) {
            portNumber = line.substr("port=".length);
            break;
        }
    }

    var proxy = "http://0.0.0.0:" + portNumber + "/";
    console.log("Proxying:", proxy);

    return proxy;
};

module.exports = function (config) {
    config.set({
        basePath: '../..',

        urlRoot: '/_karma_/',

        files: [
            'test/e2e/**/*.js'
        ],

        autoWatch: false,

        browsers: ['Chrome'],

        frameworks: ['ng-scenario'],

        singleRun: true,

        proxies: {
            '/': getProxy()
        },

        plugins: [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-ng-scenario',
            'karma-coverage'
        ],

        junitReporter: {
            outputFile: 'test_out/e2e.xml',
            suite: 'e2e'
        }

    })
};