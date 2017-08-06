define([
    'core',
	'app/views/AppView',
    'app/routers/AppRouter',
    'app/controller/AppController',
    'css!app/assets/index.css',
    'css!libs/bootstrap/css/bootstrap.css'
], function (
    Core,
	AppView,
    AppRouter,
    AppController
) {
    'use strict';

    return Core.Module.extend({
        name: 'app',
        view: AppView,
        router: AppRouter,
        controller: AppController
    });
});
