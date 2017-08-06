define([
	'underscore',
	'marionette',
    'engine/events/radio.events',
    'engine/instances/instance'
], function(
	_,
	Marionette,
    RadioEvents,
    Instance
) {
	'use strict';

    var viewBuilder = function (viewName) {
        var collectionMethods = viewName === 'CollectionView' ? {
                _getChildViewOptions: function _getChildViewOptions(child, index) {
                    var result = Marionette[viewName].prototype._getChildViewOptions.call(this, child, index) || {};
                    result._moduleName_ = this._moduleName_;
                    return result;
                }
            } : {},
            viewCustomFunction = _.extend(collectionMethods, {
            constructor: function (opts) {
                var options = opts || {};
                this._moduleName_ = options._moduleName_;
                this._initRadioListeners();
                Marionette[viewName].prototype.constructor.call(this, _.omit(options, '_moduleName_'));
            }
        }, RadioEvents, Instance);

	    return Marionette[viewName].extend(viewCustomFunction);
	};

    var views = {
        View: viewBuilder('View'),
        CollectionView: viewBuilder('CollectionView')
    };

	return views;
});