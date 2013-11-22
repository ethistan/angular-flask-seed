angular.module('myApp.controllers.headerCtrl', []).
    controller('HeaderCtrl', ['$scope', function ($scope) {
        $scope.menu = [
            {
                title: "Basic Display",
                page: "basic"
            },
            {
                title: "User Input",
                page: "input"
            }
        ];
    }]);
