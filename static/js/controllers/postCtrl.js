angular.module('myApp.controllers.postCtrl', []).
    controller('PostCtrl', ['$scope', '$http', function ($scope, $http) {
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
        $scope.error = false;

        function removeError() {
            $scope.error = false;
            $scope.errorMessage = "";
        }

        $scope.$watch('title', removeError);
        $scope.$watch('name', removeError);

        $scope.saveInformation = function () {
            console.log("Scope:", $scope);

            if (!$scope.title) {
                $scope.error = true;
                $scope.errorMessage = "Please select a title";
            }
            else {
                $http.post("/api/saveInformation", {
                    name: $scope.name,
                    title: $scope.title.value
                }).success(function (data) {
                        $scope.serverResponse = data;
                    });
            }
        }
    }]);
