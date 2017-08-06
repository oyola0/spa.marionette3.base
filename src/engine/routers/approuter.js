define([
	'marionette',
    'backbone',
    'underscore',
    'engine/events/radio.events'
], function (
	Marionette,
    Backbone,
    _,
    RadioEvents
) {
    'use strict';

    var appRouter = Marionette.AppRouter.extend(_.extend(
            {
                constructor: function (opts) {                    
                    var options = opts || {};
                    this._moduleName_ = options._moduleName_;
                    this._initRadioListeners();
                    Marionette.AppRouter.prototype.constructor.call(this, _.omit(options, '_moduleName_'));
                }
            }, RadioEvents));

    return {
        AppRouter: appRouter
    };
});