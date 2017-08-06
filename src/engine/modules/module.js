define([
	'underscore',
	'backbone',
    'marionette',
    'backbone.radio',
    'engine/controllers/controller'
], function(
	_,
	Backbone,
    Marionette,
    Radio,
    CoreController
) {
	'use strict';

	var module = Marionette.Object.extend({
	    _instanceController: function (controller, options) {
	        var instanced;
	        if (_.isFunction(controller)) {
	            instanced = new controller(options);
	        } else if (_.isObject(controller)) {
	            instanced = CoreController.Controller.extend(controller);
	            instanced = this._instanceController(instanced, options);
	        }

	        return instanced;

	    },

	    _startRouter: function (options) {
	        if(this.router) {
	            this.router = new this.router(options);
	        }
        },

        _startView: function(options) {
	        if (this.view) {
	            this.view = new this.view(options);	            
	        }
        },

        _startController: function (options) {
            if(this.controller){
                this._radioController = this._instanceController(this.controller, options);
            }
        },

        constructor: function (opts) {
            var options = opts || {},
                extendedOptions;

            this.name = options.name || this.name;

            this._moduleName_ = this.name;
            extendedOptions = _.extend({ _moduleName_: this._moduleName_ }, options);

            if (!this.name) {
            	throw new Error('You cannot start a module without name.');
            }
            
            this._startController(extendedOptions);
            this._startRouter(extendedOptions);
            this._startView(extendedOptions);
           
            if (this.view) {
                if (this.router) {
                    this.router.listenTo(this.view, 'before:destroy', this.router.remove);
                }

                this.listenTo(this.view, 'before:destroy', function () {
                    Radio.channel(this._moduleName_).reset();
                }, this);
            }            
            
            Marionette.Object.prototype.constructor.call(this, options);
        }
	});


	return {
	    Module: module
	};
});