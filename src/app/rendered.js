define([
	'underscore',
	'marionette',
    'handlebars'
], function (
	_,
    Marionette,
    Handlebars
) {
    'use strict';

    Marionette.Renderer.render = function (templateData, options) {
        var result,
            templateCompile,
            template = templateData,
            data = options || {};

        if (_.isObject(template) && template.template) {
            if (template.i18n) {
                if (_.isArray(template.i18n)) {
                    _.each(template.i18n, function (i18n) {
                        _.extend(data, i18n);
                    });
                } else if (_.isObject(template.i18n)) {
                    _.extend(data, template.i18n);
                }
            }
            template = template.template;
        }

        if (_.isFunction(template)) {
            result = template(data);
        } else if (_.isString(template)) {
            templateCompile = Handlebars.compile(template);
            result = templateCompile(data);
        } else if (template === null) {
            result = template;
        } else {
            throw new Error('template format invalid.');
        }

        return result;
    };
});
