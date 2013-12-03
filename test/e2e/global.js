'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Sample Application', function () {
    beforeEach(function () {
        browser().navigateTo('/');
    });

    it('should automatically redirect to /basic when location hash/fragment is empty', function () {
        expect(browser().location().url()).toBe("/basic");
    });
});
