define([
    'core',
    'modules/example/views/ExampleView',
    'modules/example/router/ExampleRouter',
    'modules/example/controller/ExampleController'
], function (
    Core,
    ExampleView,
    ExampleRouter,
    ExampleController
    ) {

    'use strict';

    return Core.Module.extend({
        name: 'example',
        view: ExampleView,
        router: ExampleRouter,
        controller: ExampleController
    });
});