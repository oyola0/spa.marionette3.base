define([
	'underscore',
    'engine/views/views',
    'engine/modules/module',
    'engine/routers/router',
    'engine/routers/approuter',
    'engine/models/model',
    'engine/collections/collection',
    'engine/controllers/controller'
], function(
	_,
    Views,
    Module,
    Router,
    AppRouter,
    Model,
    Collection,
    Controller
) {
    'use strict';

	var core = window.Core = _.extend(
		{},
		Views,
        Module,
        Router,
        AppRouter,
        Model,
		Collection,
        Controller
	);

	return core;
});