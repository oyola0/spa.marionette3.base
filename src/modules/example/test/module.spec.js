define(['modules/example/module'], function (exampleModule) {

    describe('modules/example/module.js', function () {
        
        it('Check typeof  is function', function () {
            expect(typeof exampleModule === 'function').toEqual(true);
        });

        it('should be navigate to back', function () {
            var instanced = new exampleModule();

            spyOn(window.history, 'back');

            instanced.view.goToBack();

            expect(window.history.back).toHaveBeenCalled();
            
        });

    });

});