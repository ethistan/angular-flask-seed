'use strict';

angular.module('myApp.directives.row', []).
    directive('row', [function () {
        return {
            restrict: "A",
            link: function($scope, $element) {
                $element.addClass("row");
            }
        };
    }]);
