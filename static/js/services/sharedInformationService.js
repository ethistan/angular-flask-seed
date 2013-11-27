'use strict';

/* Services */

angular.module('myApp.services.sharedInformationService', []).
    factory("SharedInformation", [function() {
        var sharedInformation = {};

        sharedInformation.someValue = 100;

        return sharedInformation;
    }]);

