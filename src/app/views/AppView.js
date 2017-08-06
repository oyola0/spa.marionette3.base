define([
	'core',
    'underscore',
    'text!app/views/templates/app-layout.html',
    'i18n!app/assets/nls/app',
    'modules/header/module'
], function(
	Core,
    _,
    Template,
    Strings,
    Header
) {
    'use strict';

	return Core.View.extend({
	    regions: {
	        content: '[data-region="content"]',
	        header: '[data-region="header"]'
	    },

	    template: Template,

	    moduleListeners: {
	        'showModule': 'showContent'
		},        

		onRender: function () {
		    this.showHeader();
		},

		showHeader: function () {
		    var moduleIntanced = new Header(),
                view = moduleIntanced.view;		   

		    this.showChildView('header', view);
		},

		showContent: function (moduleName) {
		    this.showModuleInRegion({
		        region: this.getRegion('content'),
		        module: moduleName
		    });
		},

		showModuleInRegion: function (options) {
		    return this.requestToApp('showModuleInRegion', options);
		}
	});
});