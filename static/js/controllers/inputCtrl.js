angular.module('myApp.controllers.inputCtrl', []).
    controller('InputCtrl', ['$scope', function ($scope) {
        $scope.titles = [
            {
                value: "dr",
                text: "Dr",
                gender: "Either"
            },
            {
                value: "mr",
                text: "Mr",
                gender: "Male"
            },
            {
                value: "mrs",
                text: "Mrs",
                gender: "Female"
            },
            {
                value: "ms",
                text: "Ms",
                gender: "Female"
            },
            {
                value: "miss",
                text: "Miss",
                gender: "Female"
            }
        ];

        $scope.name = "John Doe";
        $scope.title = $scope.titles[1];
    }]);
