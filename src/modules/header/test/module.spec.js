define(['modules/header/module', 'core', 'backbone.radio'],
    function (headerModule, Core, Radio) {

    var app = Radio.channel('app');   
    app.reply('getDeviceModel', function () {
        return new Core.Model({ isPhone: true });
    }, this);

    var instancedModule = new headerModule();

    describe('test modules/header/module.js', function () {

        it('Check typeof is function', function () {
            expect(typeof headerModule === 'function').toEqual(true);
        });

        it('Check header trigger event to app', function (done) {
            var view = instancedModule.view,
                model = new Core.Model();

            model.listenTo(app, 'navigate', function () {
                done();
            });

            view.goToHome();
        });

        it('should view.model contain isTablet attribute', function () {
            app.reply('getDeviceModel', function () {
                return new Core.Model({ isTablet: true });
            }, this);

            var intanced = new headerModule();

            expect(intanced.view.model.get('device')).toEqual('Tablet');
        });

    });

});