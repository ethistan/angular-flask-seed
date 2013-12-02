'use strict';

describe('controllers', function () {
    var scope;

    beforeEach(module('myApp.controllers.headerCtrl'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();

        $controller('HeaderCtrl', {$scope: scope});
    }));

    it('should have a menu where each element in the array is a title and a page name', function () {
        expect(scope.menu.length).toBeGreaterThan(0);

        angular.forEach(scope.menu, function (menu) {
            expect(menu.hasOwnProperty('title')).toBeTruthy();
            expect(menu.hasOwnProperty('page')).toBeTruthy();
        });
    });
});
