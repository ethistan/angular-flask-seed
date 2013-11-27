'use strict';

angular.module('myApp.directives.column', []).
    directive('column', [function () {
        return {
            restrict: "A",
            scope: false,
            link: function ($scope, $element, $attrs) {
                var alignment = ($attrs.align || "left") + "-align";
                var span = "col-md-" + ($attrs.span || "6")
                var offset = $attrs.offset ? "col-md-offset-" + $attrs.offset : "";

                $element.addClass(alignment);
                $element.addClass(span);
                $element.addClass(offset);
            }
        };
    }]);
