define([
    'underscore',
	'marionette',
    'backbone',
    'engine/events/radio.events'
], function (
    _,
	Marionette,
    Backbone,
    RadioEvents
) {
    'use strict';

    var router = Marionette.AppRouter.extend(
            _.extend({
                constructor: function (opts) {
                    var options = opts || {};
                    
                    if (this.appRoutes) {
                        throw new Error('Not allow appRoutes in Router');
                    }

                    this._moduleName_ = options._moduleName_;
                    this._initRadioListeners();
                    this._routes = _.extend({
                        '': '',
                        '/': ''
                    }, this.routes);
                    this.routes = {};
                    this._routeToRemove = {};

                    _.each(this._routes, function (method, key) {
                        var moduleRoute = this._moduleName_ + key,
                            routeRegex = this._routeToRegExp(moduleRoute);

                        this.routes[moduleRoute] = method;
                        this._routeToRemove[routeRegex] = true;
                    }, this);

                    Marionette.AppRouter.prototype.constructor.call(this, _.omit(options, '_moduleName_'));
                    Backbone.history.loadUrl();
                },

                remove: function () {
                    Backbone.history.handlers = _.filter(Backbone.history.handlers, function (handler) {
                        return !this._routeToRemove[handler.route];
                    }, this);
                }
            }, RadioEvents));

    return {
        Router: router
    };
});