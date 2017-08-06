define(['app/controller/AppController', 'backbone'], function (AppController, Backbone) {
    'use strict';

    var fakeRegion = {
        show: function () {

        }
    };

    describe('app/controller/AppController.js', function () {

        it('should twrow esception if navigate arguments is empty', function () {
            expect(function () {
                AppController.navigateTo();
            }).toThrow();
        });

        it('should navigate to module "example"', function () {
            spyOn(Backbone.history, 'navigate');

            AppController.navigateTo({ module: "example" });

            expect(Backbone.history.navigate).toHaveBeenCalled();
        });

        it('should navigate to window.history.back', function () {
            spyOn(window.history, 'back');

            AppController.onGoBack();

            expect(window.history.back).toHaveBeenCalled();
        });

        it('should fail promise when load a undefined module', function (done) {
            var promise = AppController.onModuleLoaded();
            promise.fail(done);
        });

        it('should resolve promise when load "index" module', function (done) {
            var promise = AppController.onModuleLoaded({
                module: 'index',
                region: fakeRegion
            });

            promise.done(done);
        });
    });

});