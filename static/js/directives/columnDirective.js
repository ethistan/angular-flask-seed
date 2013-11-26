'use strict';

angular.module('myApp.directives.column', []).
    directive('column', ['$compile', function ($compile) {
        return {
            restrict: "E",
            link: function ($scope, $element, $attrs) {
                var alignment = $attrs.align || "left";
                var span = $attrs.span || "6";
                var offset = $attrs.offset ? "col-md-offset-" + $attrs.offset : "";

                var html = $element.html();
                var newElement = $compile("<div class='col-md-" + span + " " + alignment + "-align " + offset + "'>" + html + "</div>")($scope);
                $element.replaceWith(newElement);
            }
        };
    }]);
