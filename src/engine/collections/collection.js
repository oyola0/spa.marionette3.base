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

	var collection = Backbone.Collection.extend(_.extend(RadioEvents, Instance));

    return {
        Collection: collection
    };
});