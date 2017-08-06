require({
    baseUrl: '',
    urlArgs: 'v=' + Date.now(),
    paths: {
        'jquery': 'libs/jquery/jquery',
        'underscore': 'libs/underscore/underscore',
        'backbone': 'libs/backbone/backbone',
        'handlebars': 'libs/handlebars/handlebars',
        'marionette': 'libs/backbone.marionette/backbone.marionette',
        'backbone.radio': 'libs/backbone.radio/backbone.radio',
        'application': 'app/app',
        'core': 'engine/core',
        'text': 'libs/requirejs-text/text',
        'i18n': 'libs/i18n/i18n',
        'css': 'libs/require-css/css',
        'device': 'libs/mobile-detect/mobile-detect'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            exports: 'backbone',
            deps: ['jquery', 'underscore']
        },
        'marionette': {
            exports: 'marionette',
            deps: ['jquery', 'underscore', 'backbone', 'backbone.radio']
        },
        'application': {
            exports: 'application',
            deps: ['jquery', 'underscore', 'backbone', 'marionette', 'backbone.radio']
        }
    }    
});

require(['application'], function (application) {
    application.start();
});
