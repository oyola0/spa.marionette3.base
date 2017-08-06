define([
	'core',
    'text!modules/header/views/templates/header-main.html',
    'i18n!modules/header/assets/nls/header'
], function(
	Core,
    Template,
    Strings
) {
    'use strict';

	return Core.View.extend({

	    className: 'header bg-gray-primary',

	    template: Template,

	    initialize: function () {
	        var devices = this.requestToApp('getDeviceModel'),
                deviceLabel = 'desktop';

	        if (devices.get('isPhone')) {
	            deviceLabel = 'phone';
	        } else if (devices.get('isTablet')) {
	            deviceLabel = 'tablet';
	        }

	        this.model = new Core.Model({ device: Strings[deviceLabel] });
	    },

	    events: {	        
	        'click [data-selector="header-index"]': 'goToHome'
	    },	   	      

	    goToHome: function() {
	        this.triggerToApp('navigate', 'index');
	    }
	});
});