define([
	'core'
], function (
	Core
) {
    'use strict';

    return Core.Router.extend({
        routes: {
            '/:val': 'setModelVal'
        },

        setModelVal: function (val) {
            this.triggerToModule('setValue', val);
        }
    });
});