'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Get Information View', function () {
    beforeEach(function () {
        browser().navigateTo('/#/get');
    });

    it('should render the page when going to "get"', function () {
        expect(element('[ng-view] button').count()).toEqual(1);
        expect(element('[ng-view] button').text()).toContain("Load Information");
    });

    it('should populate the list with numbers when the get button is pressed', function() {
        expect(element('[ng-view] .info').count()).toBe(0);

        element('button[ng-click="getInformation()"]').click();

        expect(element('[ng-view] .info').count()).toBe(10);
    });
});
