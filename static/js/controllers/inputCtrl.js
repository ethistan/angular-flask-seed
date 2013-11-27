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
        $scope.age = 21;
        $scope.research = "The effect of zero gravity on the taste appreciation of snails";

        $scope.ageDifferenceCalculation = function() {
            var string = "This is ";

            var age = parseInt($scope.age, 10);

            if(isNaN(age)) {
                return "Hmm, your age doesn't seem to be a number...";
            }

            var ageDifference = Math.abs(29 - age);

            if(age - 29 > 0) {
                string += ageDifference + " years older than me. Much respect";
            }
            else if(age - 29 < -10) {
                string += ageDifference + " years younger than me. Damn whippersnappers! Get off my lawn!";
            }
            else if(age - 29 < 0) {
                string += ageDifference + " years younger than me.";
            }
            if(age - 29 == 0) {
                string += "the same age as me. What a coincidence!";
            }

            return string;
        }
    }]);
