define([
	'underscore'
], function (_) {
    'use strict';

    return {
        instanceModel: function (model, opts) {
            var options = opts || {},
	            modelIntanced = model;

            if (_.isFunction(model)) {
                modelIntanced = new model(_.extend(options, {
                    _moduleName_: this._moduleName_
                }));
            }

            return modelIntanced;
        },
        instanceCollection: function (collection, opts) {
            var collectionIntanced = collection;

            if (_.isFunction(collection)) {
                collectionIntanced = new collection(opts);
                collectionIntanced._moduleName_ = this._moduleName_;
                collectionIntanced._initRadioListeners();
            }

            return collectionIntanced;
        },
        instanceView: function (view, opts) {
            var viewInstanced = view,
                options = opts || {};

            if (_.isFunction(view)) {
                viewInstanced = new view(_.extend(options, {
                    _moduleName_: this._moduleName_
                }));
            }

            return viewInstanced;
        }
    };
});