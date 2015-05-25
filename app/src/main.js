window.$ = window.jQuery = require('jquery');
window._ = require('underscore');
window.Backbone = require('backbone');
var BackbonePouch = require('backbone-pouch');
var PouchDB = require('pouchdb');


Backbone.$ = window.$;
window.Pouch = new PouchDB('TEST');
Backbone.sync = BackbonePouch.sync({
  // We currently suffix by the PouchDB version here
  // because at the moment PouchDB does not support upgrade
  db: window.Pouch,
  fetch: 'query',
  options: {
    query: {
      attachments: true,
      include_docs: true,
      fun: {
        map: function(doc) {
          emit(doc, null);
        }
      }
    },
    changes: {
      include_docs: true
    }
  }
});

// Adjust id attribute to the one PouchDB uses
Backbone.Model.prototype.idAttribute = '_id';
_.extend(Backbone.Model.prototype, BackbonePouch.attachments());


require('./lib/templates.js').loadTemplates(['foodDetail', 'foodView'], function() {
  var Router = require('./router/router.js');
  window.router = new Router();

  Backbone.history.start();
});



//indexedDB.deleteDatabase("_pouch_TEST")