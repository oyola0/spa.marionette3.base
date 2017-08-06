define([
	'underscore',
	'marionette',
    'engine/events/radio.events',
    'engine/instances/instance'
], function(
	_,
	Marionette,
    RadioEvents,
    Instance
) {
	'use strict';
    
	var controller = Marionette.Object.extend(_.extend({
	    constructor: function (opts) {
	        var options = opts || {};
	        this.channelName = this.channelName || options._moduleName_;
	        this._moduleName_ = this.channelName;
	        this._initRadioListeners();
	        Marionette.Object.prototype.constructor.call(this, _.omit(options, '_moduleName_'));
	    }	    
	}, RadioEvents, Instance));

	return {
	    Controller: controller
	};
});