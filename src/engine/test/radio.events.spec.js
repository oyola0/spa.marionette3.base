define(['core', 'underscore'], function (Core, _) {   

    describe('engine/events/radio.events.js', function () {
        
        it('should instaced View without options', function () {
            var View = Core.View.extend({
                    externalListeners: {
                        'example:event-example': 'onFire'
                    }
                }),
                instanced = new View();

            spyOn(instanced, 'stopListening');
            instanced.trigger('before:destroy');

            expect(_.keys(instanced._activeListeners)).toContain('event-example');
            expect(instanced.stopListening).toHaveBeenCalled();
        });

        it('should be throw exception without _moduleName_', function () {
            var View = Core.View.extend({
                moduleListeners: {
                    'event': 'onFire'
                }
            });

            expect(function () {
                new View();
            }).toThrow();
        });
    });

});