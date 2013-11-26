'use strict';

angular.module('myApp.directives.row', []).
    directive('row', ['$compile', function ($compile) {
        return {
            restrict: "E",
            link: function($scope, $element) {
                var html = $element.html();
                var newElement = $compile("<div class='row'>" + html + "</div>")($scope);
                $element.replaceWith(newElement);
            }
        };
    }]);
