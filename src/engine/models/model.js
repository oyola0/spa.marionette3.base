define([
	'underscore',
    'backbone',
    'engine/events/radio.events',
    'engine/instances/instance'
], function(
	_,
    Backbone,
    RadioEvents,
    Instance
) {
	'use strict';

	var model = Backbone.Model.extend(_.extend({
	    constructor: function (opts) {
            var options = opts || {};            
            this._moduleName_ = options._moduleName_;
            this._initRadioListeners();
            Backbone.Model.prototype.constructor.call(this, _.omit(options, '_moduleName_'));
        }
	},
    RadioEvents, Instance));

    return {
        Model: model
    };
});