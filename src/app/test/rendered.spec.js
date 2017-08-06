define(['marionette', 'app/rendered'], function (Marionette) {
    'use strict';

    var render = Marionette.Renderer.render;

    describe('app/rendered.js', function () {

        it('should be i18n array of objects', function () {
            var html = render({
                template: '<div>{{varA}}:{{varB}}</div>',
                i18n: [{ varA: 'var-a' }, { varB: 'var-b' }]
            });

            expect(html).toContain('var-a');
            expect(html).toContain('var-b');
        });

        it('should contains i18n object', function () {
            var html = render({
                template: '<div>{{varC}}</div>',
                i18n: { varC: 'var-c' }
            });

            expect(html).toContain('var-c');            
        });

        it('should contains i18n but not object', function () {
            var emptySpan = '<span></span>',
              html = render({
                  template: emptySpan,
                  i18n: 'string-null'
              });

            expect(html).toEqual(emptySpan);
        });

        it('should template not contain i18n vars', function () {
            var emptyDiv = '<div></div>',
                html = render({
                    template: emptyDiv
                });

            expect(html).toEqual(emptyDiv);
        });

        it('should be return null if template is null', function () {
            var html = render(null);

            expect(html).toBeNull();            
        });

        it('should be throw exception if template has error', function () {
            expect(function () {
                render({});
            }).toThrow();
        });

        it('should be return build string if template is function', function () {
            var testString = 'hello world',
                html = render(function () {
                    return testString;
                });

            expect(html).toEqual(testString);
        });
    });

});