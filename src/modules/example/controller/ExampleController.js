define([
    'core',
    'modules/example/model/ExampleModel'
], function (Core, ExampleModel) {
    'use strict';

    return Core.Controller.extend({

        initialize: function () {
            this.model = this.instanceModel(ExampleModel);
        },

        moduleListeners: {
            'setValue': 'onSetValue'
        },

        onSetValue: function (val) {
            this.model.set('value', val);
        },

        moduleRequests: {
            'getModel': 'onGetModel'
        },

        onGetModel: function () {
            return this.model;
        }
    });
});