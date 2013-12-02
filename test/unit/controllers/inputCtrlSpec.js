'use strict';

describe('InputCtrl', function () {
    var scope;

    beforeEach(module('myApp.controllers.inputCtrl'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();

        $controller('InputCtrl', {$scope: scope});
    }));

    it('should give a certain response when the age is not a number', function () {
        scope.age = "ee";

        expect(scope.ageDifferenceCalculation()).toBe("Hmm, your age doesn't seem to be a number...");
    });

    it('should be vaguely insulting when the age is much less than 29', function() {
        scope.age = 10;

        expect(scope.ageDifferenceCalculation()).toBe("This is 19 years younger than me. Damn whippersnappers! Get off my lawn!")
    });

    it('should tell me I\'m young when I am only slightly younger', function() {
        scope.age = 21;

        expect(scope.ageDifferenceCalculation()).toBe("This is 8 years younger than me.")
    });

    it('should tell me when I am the same age as it', function() {
        scope.age = 29;

        expect(scope.ageDifferenceCalculation()).toBe("This is the same age as me. What a coincidence!")
    });

    it('should show respect when I am older than it', function() {
        scope.age = 80;

        expect(scope.ageDifferenceCalculation()).toBe("This is 51 years older than me. Much respect")
    });
});
