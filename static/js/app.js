'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
        'ngRoute',
        'myApp.filters',

        'myApp.services',

        'myApp.directives.appVersion',

        'myApp.controllers.headerCtrl',
        'myApp.controllers.basicCtrl',
        'myApp.controllers.inputCtrl'
    ]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/basic', {templateUrl: 'static/partials/basic.html', controller: 'BasicCtrl'});
        $routeProvider.when('/input', {templateUrl: 'static/partials/input.html', controller: 'InputCtrl'});
        $routeProvider.otherwise({redirectTo: '/basic'});
    }]);
