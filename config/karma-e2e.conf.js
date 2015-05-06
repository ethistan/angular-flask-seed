var fs = require('fs');

var getProxy = function () {
	var file = fs.readFileSync("config/default_setting.py", {encoding: "utf8"}).split("\n"),
		hostName = "localhost",
		portNumber;

	for (var index in file) {
		var line = file[index];

		if (line.indexOf("SERVER_NAME") == 0) {
			var value = line.split(" = ")[1];
			if (value.charAt(0) == "\"") {
				value = value.split("\"")[1];
				
				if (value.length == 2) {
					portNumber = value[1];
					break;
				}
			}
		}
		if (line.indexOf("PORT") == 0) {
			var lineComp = line.split(" = ")[1];
			portNumber = lineComp.split("\"")[1];
		}
	}

	var proxy = "http://" + hostName + ":" + portNumber + "/";
	console.log("Proxying:", proxy);

	return proxy;
};

module.exports = function (config) {
	config.set({
		basePath: '..',

		urlRoot: '/_karma_/',

		files: [
			'test/e2e/**/*.js'
		],

		autoWatch: false,

		browsers: ['PhantomJS'],

		frameworks: ['ng-scenario'],

		reporters: ['dots', 'junit'],

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
			'karma-ng-scenario'
		],

		junitReporter: {
			outputFile: 'test_out/e2e.xml',
			suite: 'e2e'
		}

	})
};