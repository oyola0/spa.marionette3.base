
# SPA Marionette 3 base

The simple page application based marionetteJS 3


#### Installation

Local installation:

```
git clone https://github.com/Oyola1987/spa.marionette3.base.git
cd spa.marionette3.base
```

#### Initializing

To initialize the project

`npm run start`


#### Develop

`npm run dev`

Develop and launch watch [__liveReload__](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) server

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

* [moduleListeners](#moduleListeners)
* [triggerToModule](#triggerToModule)
* [moduleRequests](#moduleRequests)
* [requestToModule](#requestToModule)
* [triggerToApp](#triggerToApp)
* [requestToApp](#requestToApp)
* [externalListeners](#externalListeners)

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

{#moduleListeners}Listen the module events (__moduleListeners__):

```
moduleListeners: {
    'eventName': 'callback'
}
```

{#triggerToModule}Trigger event to module (__triggerToModule__):

```
this.triggerToModule('eventName', options);
```

##### Requests

{#moduleRequests}Declarate requests to module (__moduleRequests__):

```
moduleRequests: {
    'requestName': 'requestCallback'
},

requestCallback: function(opts) {
    return 'hello ' + opts;
}
```

{#requestToModule}Request to module (__requestToModule__):

```
this.requestToModule('requestName', 'world');   //return 'hello world'
```

### App Channel

##### Events

{#triggerToApp}Trigger event to app (__triggerToApp__):

```
this.triggerToApp('navigate', 'moduleFolderName');

this.triggerToApp('goBack');
```

##### Requests

{#requestToApp}Request to app (__requestToApp__):

```
this.requestToApp('getDeviceModel');    //return deviceModel
```

### Listen to others Module Channel

{#externalListeners}Listen the others modules events (__externalListeners__):

```
externalListeners: {
    'another-module-name:eventName': 'callback'
}
```