define([
    'core',
    'modules/index/views/IndexView',
    'css!modules/index/assets/index.css'
], function (
    Core,
    IndexView
    ) {

    'use strict';

    return Core.Module.extend({
        name: 'index',
        view: IndexView
    });
});