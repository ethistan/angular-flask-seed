angular.module('myApp.controllers.getCtrl', []).
    controller('GetCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.getInformation = function () {
            $http.get("api/getInformation").success(function (data) {
                $scope.information = data;
            });
        }
    }]);
