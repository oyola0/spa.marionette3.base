define(['core'], function (Core) {   

    describe('engine/instances/instance.js', function () {
        
        var channel = 'test',
            instanced = new Core.View({
                _moduleName_: 'test'
            });

        it('should a new instaced keep parent channel', function () {
            var collectionInstanced = instanced.instanceCollection(Core.Collection);
            var viewInstanced = instanced.instanceView(Core.View);
            var modelInstanced = instanced.instanceModel(Core.Model);

            expect(collectionInstanced._moduleName_).toEqual(channel);
            expect(viewInstanced._moduleName_).toEqual(channel);
            expect(modelInstanced._moduleName_).toEqual(channel);
        });

        it('should a new instaced have not channel', function () {
            var collectionInstanced = instanced.instanceCollection(new Core.Collection());
            var viewInstanced = instanced.instanceView(new Core.View());
            var modelInstanced = instanced.instanceModel(new Core.Model());

            expect(collectionInstanced._moduleName_).toBeUndefined();
            expect(viewInstanced._moduleName_).toBeUndefined();
            expect(modelInstanced._moduleName_).toBeUndefined();
        });
    });

});