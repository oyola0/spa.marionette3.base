define(['core'], function (Core) {   

    describe('engine/modules/module.js', function () {
        
        it('should be throw exception without name', function () {
            expect(function () {
                new Core.Module();
            }).toThrow();
        });

        it('should instaced module without view', function () {
            var moduleName = 'test-module',
                instanced = new Core.Module({
                    name: moduleName
                });

            expect(instanced._moduleName_).toEqual(moduleName);
            expect(instanced._radioController).toBeUndefined();
        });


        it('should return undefined to instance controller', function () {
            var instanced = new Core.Module({
                name: 'test-module'
            });

            expect(instanced._instanceController('not-valid')).toBeUndefined();
        });
    });

});