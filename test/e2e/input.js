'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Input View', function () {
    beforeEach(function () {
        browser().navigateTo('/#/input');
    });

    it('should display the input fields when the user goes to the input page', function () {
        expect(element('[ng-view] input, [ng-view] select, [ng-view] textarea').count()).toEqual(4);
    });

    it('should update the name display when the name input is changed', function () {
        expect(element('[ng-view] p').text()).toContain("Mr John Doe");

        input('name').enter("Frank Dubois");

        expect(element('[ng-view] p').text()).toContain("Mr Frank Dubois");
    });

    it('should update the name display when the title input is changed', function () {
        input('name').enter("John Doe");
        select("title").option("dr");

        expect(element('[ng-view] p').text()).toContain("Dr John Doe");
    });

    it('should change the age descriptor when the age is changed', function() {
        input('age').enter("ee");

        expect(element('[ng-view] p').text()).toContain("Hmm, your age doesn't seem to be a number...");

        input('age').enter(10);

        expect(element('[ng-view] p').text()).toContain("I can see from our records that you are 10 years old. This is 19 years younger than me. Damn whippersnappers! Get off my lawn!")
    });

    it('should change the text when the research topic is changed', function() {
        input('research').enter("Clam Baking: The early years");

        expect(element('[ng-view] p').text()).toContain("I also loved your last paper on the topic of \"Clam Baking: The early years\"")
    });
});
