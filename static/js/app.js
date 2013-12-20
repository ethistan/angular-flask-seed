'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
        'ngRoute',
        'myApp.filters',

        'myApp.services.sharedInformationService',

        'myApp.directives.row',
        'myApp.directives.column',

        'myApp.controllers.headerCtrl',
        'myApp.controllers.basicCtrl',
        'myApp.controllers.inputCtrl',
        'myApp.controllers.postCtrl',
        'myApp.controllers.getCtrl'
    ]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/basic', {templateUrl: 'static/partials/basic.html', controller: 'BasicCtrl'});
        $routeProvider.when('/input', {templateUrl: 'static/partials/input.html', controller: 'InputCtrl'});
        $routeProvider.when('/post', {templateUrl: 'static/partials/postInformation.html', controller: 'PostCtrl'});
        $routeProvider.when('/get', {templateUrl: 'static/partials/getInformation.html', controller: 'GetCtrl'});
        $routeProvider.otherwise({redirectTo: '/basic'});
    }]);
