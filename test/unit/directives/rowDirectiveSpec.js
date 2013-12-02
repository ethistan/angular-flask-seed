'use strict';

/* jasmine specs for directives go here */

describe('directives', function () {
    beforeEach(module('myApp.directives.row'));

    describe('row', function () {
        it('should attach the row class to the element', function () {
            inject(function ($compile, $rootScope) {
                var element = $compile('<div row></row>')($rootScope);

                expect(element.hasClass('row')).toBeTruthy();
            });
        });
    });
});
