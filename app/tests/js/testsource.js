window.$ = window.jQuery = require('jquery');
window._ = require('underscore');
window.Backbone = require('backbone');
var BackbonePouch = require('backbone-pouch');
var PouchDB = require('pouchdb');
Qunit = require('qunitjs');

Qunit.module('Food Model');
// New instances can be created with the expected default values
// Attributes can be set and retrieved correctly
// Changes to state correctly fire off custom events where needed
// Validation rules are correctly enforced
QUnit.test("Backbone model", 2, function(assert) {
  var Food = require('../../src/models/foodModel.js');
  var food = new Food();
  assert.equal(food.get('name'), 'food', 'default name should be nanna');
  assert.equal(food.get('quantity'), 1);
});


Qunit.module('Food Collection');
// New model instances can be added as both objects and arrays
// Changes to models result in any necessary custom events being fired
// A url property for defining the URL structure for models is correctly defined
Qunit.test('Add foods by objs and arrays', 3, function(assert) {
  var Foods = require('../../src/collections/foodsColl.js');
  var foods = new Foods();
  assert.equal(foods.length, 0, 'default length of the collection should be zero'); //;

  foods.add({name: 'apple', quantity: 1});
  assert.equal(foods.length, 1, 'should have added a food: apple');

  foods.add([{name: 'apple', quantity: 1},{name: 'apple', quantity: 1},{name: 'apple', quantity: 1}]);
  assert.equal(foods.length, 4, 'added 3 more apples to bring the total to 4');
});


Qunit.module('Food Views');

// They are being correctly tied to a DOM element when created
// They can render, after which the DOM representation of the view should be visible
// They support wiring up view methods to DOM elements
//One could also take this further and test that user interactions with the view correctly result in any models that need to be changed being updated correctly.



//events
// Extending plain objects to support custom events
// Binding and triggering custom events on objects
// Passing along arguments to callbacks when events are triggered
// Binding a passed context to an event callback
// Removing custom events


//It can also be useful to write specs for any application bootstrap you may have in place.
//For the following module,
// our setup initiates and appends a TodoApp view
// and we can test anything from local instances of views being correctly defined to application interactions correctly
// resulting in changes to instances of local collections.