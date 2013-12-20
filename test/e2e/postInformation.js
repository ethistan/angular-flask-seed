'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Post Information View', function () {
    beforeEach(function () {
        browser().navigateTo('/#/post');
    });

    it('should render the page when going to "post"', function () {
        //Then
        expect(element('[ng-view] input, [ng-view] select').count()).toEqual(2);
        expect(element('[ng-view] button').count()).toEqual(1);
        expect(element('[ng-view] button').text()).toContain("Save Information");
    });

    it('should show an error when the name is empty', function() {
        //Given
        expect(element('[ng-view] .alert-danger').css('display')).toBe('none');

        //When
        input('name').enter("");
        element('button[ng-click="saveInformation()"]').click();

        //Then
        expect(element('[ng-view] .alert-danger').css('display')).toBe('block');
    });

    it('should reset the error to hidden when the name is changed', function() {
        //Given
        expect(element('[ng-view] .alert-danger').css('display')).toBe('none');

        //When
        input('name').enter("");
            element('button[ng-click="saveInformation()"]').click();
        input('name').enter("s t");

        //Then
        expect(element('[ng-view] .alert-danger').css('display')).toBe('none');
    });

    it('should post the information to the server and display the results', function() {
        //Given
        expect(element('[ng-view] div[ng-show="serverResponse"]').css('display')).toBe('none');

        //When
        input('name').enter("s t");
        element('button[ng-click="saveInformation()"]').click();
	    sleep(1);

        //Then
        expect(element('[ng-view] div[ng-show="serverResponse"]').css('display')).toBe('block');
        expect(element('[ng-view] div[ng-show="serverResponse"]').text()).toContain("u'name': u's t', u'title': u'mr'");
    });
});
