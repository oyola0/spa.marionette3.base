define([
	'underscore',
	'backbone',
	'marionette',
	'app/module',
    'app/rendered'
], function (
	_,
	Backbone,
	Marionette,
    AppModule
) {
    'use strict';    

    var Application = Marionette.Application.extend({
        region: 'body',

        name: 'Core Application',

        events: {
            'start': 'onStart'
        },

        onStart: function () {
            var module = new AppModule(),
                appView = module.view;

            this.showView(appView);

            Backbone.history.start();

            this.getRegion('body').$el.removeClass('loading-spinner');
        }
    });

    return new Application();
});
