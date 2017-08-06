define([
	'underscore',
    'backbone.radio'
], function (_, Radio) {
    'use strict';

    var APP = 'app';

	return {
	    triggerToModule: function (event, options) {
	        this._getModuleChannel().trigger(event, options);
	    },

	    requestToModule: function (event, options) {
	        return this._getModuleChannel().request(event, options);
	    },

	    triggerToApp: function (event, options) {
	        this._getAppChannel().trigger(event, options);
	    },

	    requestToApp: function (event, options) {
	        return this._getAppChannel().request(event, options);
	    },

	    _getAppChannel: function() {
	        if (!this._appChannel_) {
	            this._appChannel_ = Radio.channel(APP);
	        }

	        return this._appChannel_;
	    },

	    _getModuleChannel: function () {
	        if (!this._moduleChannel_) {
	            this._moduleChannel_ = Radio.channel(this._retrieveModuleName());
	        }

	        return this._moduleChannel_;
	    },

	    _initRadioListeners: function () {
	        this._activeListeners = {};

	        if (this.moduleListeners) {
	            var channel = Radio.channel(this._retrieveModuleName());
	            _.each(this.moduleListeners, function (valueFunction, keyEvent) {
	                var method = this[valueFunction];

	                this._activeListeners[keyEvent] = channel;
	                this.listenTo(channel, keyEvent, method, this);	               
	            }, this);	           
	        }

	        if (this.moduleRequests) {
	            _.each(this.moduleRequests, function (valueFunction, keyEvent) {
	                var method = this[valueFunction];

	                this._getModuleChannel().reply(keyEvent, method, this);
	            }, this);
	        }

	        if (this.externalListeners) {
	            _.each(this.externalListeners, function (valueFunction, keyEvent) {
	                var keyEventArray = keyEvent.split(':'),
                        channelName = keyEventArray[0],
                        event = keyEvent.substring(channelName.length + 1),
                        channel = Radio.channel(channelName),
	                    method = this[valueFunction];

	                this._activeListeners[event] = channel;
	                this.listenTo(channel, event, method, this);
	            }, this);
	        }

	        this.listenTo(this, 'before:destroy', function () {
	            _.each(this._activeListeners, function (channel, event) {
	                this.stopListening(channel, event);
	            }, this);
	        }, this);
	    },

	    _retrieveModuleName: function () {
	        if (!this._moduleName_) {
	            throw new Error('_moduleName_ is required, use method instance');
	        }
	        return this._moduleName_;
	    }
	};
});