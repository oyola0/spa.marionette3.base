define(['core', 'underscore', 'backbone'], function (Core, _, Backbone) {

    describe('engine/routers/approuter.js', function () {
        
        it('should without params return _moduleName_ undefined', function () {
            var router = new Core.AppRouter();
            expect(router._moduleName_).toBeUndefined();
        });

    });

    describe('engine/routers/router.js', function () {

        it('should be throw exception with appRoutes', function () {
            var RouterWrong = Core.Router.extend({ appRoutes: {} });

            expect(function () {
                new RouterWrong();
            }).toThrow();
        });

        it('should be throw exception with appRoutes', function () {
            var historyClone = _.clone(Backbone.history.handlers),
                Router = Core.Router.extend({
                    routes: {
                        '/:val': 'onExampleCallback'
                    }
                }),
                router = new Router({
                    _moduleName_: 'testing'
                });

            expect(Backbone.history.handlers.length).toBeGreaterThan(historyClone.length);

            historyClone = _.clone(Backbone.history.handlers);

            router.remove();

            expect(historyClone.length).toBeGreaterThan(Backbone.history.handlers.length);
        });
    });

});