define([
    'core'
], function(Core) {

    'use strict';

    var Controller = Core.Controller.extend({
        channelName: 'app',

        showModule: function (moduleName) {
            this.triggerToApp('showModule', moduleName);
        },

        defaultModule: function () {
            this.triggerToApp('navigate', 'index');
        }
    });

    return Core.AppRouter.extend({
        controller: new Controller(),
        appRoutes: {
            '': 'defaultModule',
            '/': 'defaultModule',
            ':module': 'showModule',
            ':module/*subroute': 'showModule'
        }
	});
});