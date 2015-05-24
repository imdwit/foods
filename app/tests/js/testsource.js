window.$ = window.jQuery = require('jquery');
window._ = require('underscore');
window.Backbone = require('backbone');
var BackbonePouch = require('backbone-pouch');
var PouchDB = require('pouchdb');
Qunit = require('qunitjs');
QUnit.test("Backbone model", function(assert) {
  var Food = require('../../models/foodModel.js');
  var food = new Food();
  assert.equal(food.get('name'), 'nanna');
  assert.equal(food.get('quantity'), 4);
});