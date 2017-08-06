define([
	'core',
    'device'
], function (
	Core,
    MobileDetect
) {
    'use strict';

    return Core.Model.extend({
        initialize: function () {
            var md = new MobileDetect(window.navigator.userAgent);
           
            this.set({
                isMobile: !!md.mobile(),
                isTablet: !!md.tablet(),
                isPhone: !!md.phone()
            });
        }
    });
});