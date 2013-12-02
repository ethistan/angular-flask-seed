'use strict';

describe('GetCtrl', function () {
    var scope, ctrl, http;

    beforeEach(module("myApp.controllers.getCtrl"));

    beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
        http = $httpBackend;

        scope = $rootScope.$new();
        ctrl = $controller("GetCtrl", {$scope: scope});
    }));

    afterEach(function () {
        http.verifyNoOutstandingExpectation();
        http.verifyNoOutstandingRequest();
    });

    var cannedRandomNumbers = function () {
        return [1, 4, 5, 2, 3, 4];
    };

    it('should request a set of random numbers from the server', function () {
        http.expectGET("/api/getInformation").respond(cannedRandomNumbers());

        expect(scope.information).toBeUndefined();
        scope.getInformation();

        //This is important, without this, your ajax requests will not function
        //Consider this to be triggering the ajax request and response
        http.flush();

        expect(scope.information).toEqual(cannedRandomNumbers());
    });
});
