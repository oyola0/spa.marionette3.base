define([
    'backbone',
    'underscore',
    'jquery',
    'app/models/DeviceModel'
], function (Bb, _, $, DeviceModel) {
    'use strict';

    return {
        radioRequests: {
            'showModuleInRegion': 'onModuleLoaded',
            'getDeviceModel': 'onGetDevice'
        },

        radioEvents: {
            'navigate': 'navigateTo',
            'goBack': 'onGoBack'
        },

        initialize: function () {
            this.deviceModel = this.instanceModel(DeviceModel);
        },

        onGetDevice: function() {
            return this.deviceModel;
        },

        navigateTo: function (opts) {
            var moduleName,
                options = {
                    trigger: true
                };

            if (_.isString(opts)) {
                moduleName = opts;
            } else if(_.isObject(opts)){
                moduleName = opts.module;
                _.extend(options, opts);
            }

            if (!moduleName) {
                throw new Error('module name or module option is mandatory');
            }

            Bb.history.navigate(moduleName, options);
        },

        onModuleLoaded: function (opts) {
            var options = opts || {},
                region = options.region,
                deferred = $.Deferred(),
                modulePath = 'modules/' + options.module + '/module';

            require([modulePath], function (Module) {
                var moduleOptions = _.omit(options, 'module', 'region'),
                    module = new Module(moduleOptions);

                deferred.resolve(module.view);
                region.show(module.view, moduleOptions);
            }, deferred.reject);

            return deferred;
        },

        onGoBack: function () {
            Bb.history.history.back();
        }
    };
});