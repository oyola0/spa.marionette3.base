define(['modules/index/module', 'core', 'backbone.radio'], function (indexModule, Core, Radio) {

    var instancedModule = new indexModule();
    var app = Radio.channel('app');    

    describe('testing modules/index/module.js', function () {
        
        it('check module name of index module.js', function () {            
            expect(instancedModule.name).toEqual('index');
        });

        it('Check instance of module.js', function () {
            expect(instancedModule instanceof Core.Module).toEqual(true);
        });

        it('Check index trigger event to app', function (done) {
            var view = instancedModule.view,
                count = 0,
                model = new Core.Model();

            model.listenTo(app, 'navigate', function () {
                count += 1;
                if (count === 2) {
                    done();
                }                
            });

            view.navigateToExample1();
            view.navigateToExample2();
        });

    });

});