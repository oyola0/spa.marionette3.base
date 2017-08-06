define(['application', 'jquery'], function (App, $) {
    'use strict';

    describe('app/app.js', function () {

        it('should typeof App.onStart is function', function () {
            expect(typeof App.onStart === 'function').toEqual(true);
        });

        it('should be not contain class "loading-spinner"', function () {           
            expect($('body').hasClass('loading-spinner')).toEqual(false);            
        });
       
    });

});