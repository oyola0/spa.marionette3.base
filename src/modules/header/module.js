define([
    'core',
    'modules/header/views/HeaderMainView',
    'css!modules/header/assets/index.css'
], function (
    Core,
    HeaderMainView
    ) {

    'use strict';

    return Core.Module.extend({
        name: 'header',
        view: HeaderMainView
    });
});