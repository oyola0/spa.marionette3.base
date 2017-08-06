define([
	'core',
    'text!modules/example/views/templates/example-layout.html',
    'i18n!modules/example/assets/nls/example'
], function (
	Core,
    Template,
    Strings
) {
    'use strict';

	return Core.View.extend({
	    template: {
	        template: Template,
	        i18n: Strings
	    },
	  
	    modelEvents: {
	        'change:value': 'render'
	    },

	    events: {
	        'click [data-region="go-back"]': 'goToBack'
	    },

	    initialize: function () {
	        this.model = this.requestToModule('getModel');
	    },

	    goToBack: function () {
	        this.triggerToApp('goBack');
	    }
	});
});