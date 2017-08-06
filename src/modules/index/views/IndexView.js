define([
	'core',
    'text!modules/index/views/templates/index-template.html',
    'i18n!modules/index/assets/nls/index'
], function(
	Core,
    Template,
    Strings
) {
	'use strict';
	return Core.View.extend({

	    className: 'm-index',

	    template: {
	        template: Template,
	        i18n: Strings
	    },	    

	    events: {
	        'click [data-navigate="example-1"]': 'navigateToExample1',
	        'click [data-navigate="example-2"]': 'navigateToExample2'
	    },

	    navigateToExample1: function () {
	        this.navigateTo('example/1');
	    },

	    navigateToExample2: function () {
	        this.navigateTo('example/2');
	    },

	    navigateTo: function (module) {
            this.triggerToApp('navigate', module);
	    }
	});
});