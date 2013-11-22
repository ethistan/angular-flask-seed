angular.module('myApp.controllers.basicCtrl', []).
    controller('BasicCtrl', ['$scope', function ($scope) {
        $scope.name = "John Doe";
        $scope.title = "Mr";
    }]);
