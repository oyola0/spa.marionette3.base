define(['core'], function (Core) {   

    describe('engine/views/view.js', function () {
        
        it('should instaced View without options', function () {
            var instanced = new Core.View();

            expect(instanced._moduleName_).toBeUndefined();
        });

        it('should instaced CollectionView with same _moduleName_ options into childs', function () {
            var moduleName = 'test-module',
                instanced = new Core.CollectionView({
                    _moduleName_: moduleName,
                    childView: Core.View,
                });

            expect(instanced._getChildViewOptions()._moduleName_).toEqual(moduleName);
        });
    });

});