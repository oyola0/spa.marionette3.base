
# SPA Marionette 3 base

The single page application based marionetteJS 3


#### Installation

Install ([node 6](https://nodejs.org/es/download/) or higher):

```
git clone https://github.com/Oyola1987/spa.marionette3.base.git
cd spa.marionette3.base
npm run start
```

#### Develop

`npm run dev`

Develop and launch watch [liveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) server

`npm run dev-server`


#### Build

`npm run build`

Build and launch server

`npm run build-sever`


#### Testing

Run karma and lint

`npm run test`

Run lint javascript files

`npm run lint`

Run karma test

`npm run karma`

### Core (extend Marionette) 

#### Constructors

* Core.AppRouter (only main application)
* Core.Router
* Core.Collection
* Core.Model
* Core.Controller
* Core.Module
* Core.View
* Core.CollectionView

#### Methods

* [moduleListeners](#user-content-events)
* [triggerToModule](#user-content-events)
* [moduleRequests](#user-content-requests)
* [requestToModule](#user-content-requests)
* [triggerToApp](#user-content-events-1)
* [requestToApp](#user-content-requests-1)
* [externalListeners](#user-content-listen-to-others-module-channel)

### Module concept

All application is based in modules that load dynamically.
The module has a "CHANNEL" defined as name into module.js
This "CHANNEL" emitter event in this module.

##### Structure module.js

```
return Core.Module.extend({
    name: 'example',                //Mandatory
    view: ExampleView,              //Optional
    router: ExampleRouter,          //Optional
    controller: ExampleController   //Optional
});

```

A module with router, __name__ should be the same that module.js parent folder.

### Module Channel
To propagate the module channel instance use:

```
this.instanceModel(MyModel, options)
this.instanceCollection(MyCollection, options)
this.instanceView(MyView, options)
```


##### Events

Listen the module events (__moduleListeners__):

```
moduleListeners: {
    'eventName': 'callback'
}
```

Trigger event to module (__triggerToModule__):

```
this.triggerToModule('eventName', options);
```

##### Requests

Declarate requests to module (__moduleRequests__):

```
moduleRequests: {
    'requestName': 'requestCallback'
},

requestCallback: function(opts) {
    return 'hello ' + opts;
}
```

Request to module (__requestToModule__):

```
this.requestToModule('requestName', 'world');   //return 'hello world'
```

### App Channel

##### Events

Trigger event to app (__triggerToApp__):

```
this.triggerToApp('navigate', 'moduleFolderName');

this.triggerToApp('goBack');
```

##### Requests

Request to app (__requestToApp__):

```
this.requestToApp('getDeviceModel');    //return deviceModel
```

### Listen to others Module Channel

Listen the others modules events (__externalListeners__):

```
externalListeners: {
    'other-module-name:eventName': 'callback'
}
```

### Libraries

This code works with the following libraries:

* [jQuery](http://jquery.com)
* [Underscore](http://underscorejs.org)
* [Backbone](http://backbonejs.org)
* [Marionettejs](https://marionettejs.com/docs/v3.3.1/)
* [Handlebarsjs](http://handlebarsjs.com/)
