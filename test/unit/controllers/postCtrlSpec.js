'use strict';

describe('PostCtrl', function () {
    var scope, ctrl, http;

    beforeEach(module("myApp.controllers.postCtrl"));

    beforeEach(inject(function ($rootScope, $controller, _$httpBackend_) {
        http = _$httpBackend_;

        scope = $rootScope.$new();
        ctrl = $controller("PostCtrl", {$scope: scope});
    }));

    afterEach(function () {
        http.verifyNoOutstandingExpectation();
        http.verifyNoOutstandingRequest();
    });

    var saveResponse = function () {
        return {
            mongo: {
                id: '529c130ed2962f66cf183d66'
            },
            name: 'John Doe',
            title: 'mr',
            postgres: "<Person (id=8, title=mr, name=John Doe)>",
            status: "success"
        };
    };

    it('should send the information to the server to be saved', function () {
        //Given
        http.expectPOST("api/saveInformation", {name: 'Frank Sinatra', title: 'mr'}).respond(saveResponse());
        expect(scope.serverResponse).toBeUndefined();

        //When
        scope.name = "Frank Sinatra";
        angular.forEach(scope.titles, function (title) {
            if (title.text == "Mr") {
                scope.title = title
            }
        });

        //Then
        scope.saveInformation();
        http.flush();

        expect(scope.serverResponse).toEqual(saveResponse());
    });

    it('should not send the request and show an error when there is no title', function () {
        expect(scope.error).toBeFalsy();

        scope.title = '';
        scope.saveInformation();

        expect(scope.error).toBeTruthy();
        expect(scope.errorMessage).toBe("Please select a title");
    });

    it('should not send a request and show an error when the name is empty', function() {
        expect(scope.error).toBeFalsy();

        scope.title = scope.titles[0];
        scope.name = "";
        scope.saveInformation();

        expect(scope.error).toBeTruthy();
        expect(scope.errorMessage).toBe("Please enter a valid name... No Madonnas please");
    });

    it('should not send a request and show an error when the name does not have a space in it', function() {
        expect(scope.error).toBeFalsy();

        scope.title = scope.titles[0];
        scope.name = "Madonna";
        scope.saveInformation();

        expect(scope.error).toBeTruthy();
        expect(scope.errorMessage).toBe("Please enter a valid name... No Madonnas please");
    });

    it('should remove the error when the user changes the entered details', function() {
        expect(scope.error).toBeFalsy();

        scope.title = scope.titles[0];
        scope.name = "Madonna";
        scope.saveInformation();

        expect(scope.error).toBeTruthy();
        expect(scope.errorMessage).toBe("Please enter a valid name... No Madonnas please");

        scope.name = "Madonna Jones";

        //This line is required to trigger the automatic updating of angular in code
        //It is required when you have manual watchers in place like we do in this piece of code.
        scope.$apply();

        expect(scope.error).toBeFalsy();
    })
});
