var foodsView = require('../views/foodsView');
var FoodDetailView = require('../views/foodDetailsView');
var Food = require('../models/foodModel');

var Foods = require('../collections/foodsColl');

var MenuView = require('../views/menuView');

var foods = [
  {
    name: 'banana',
    addedOn: Date.now(),
    expiresOn: Date.now() + 604800000,
    text: 'just a banana',
    type: 'fruit',
    img: 'http://upload.evocdn.co.uk/fruitnet/uploads/asset_image/2_1094396_e.jpg',
    quantity: 4,
  }, {
    name: 'banana',
    addedOn: Date.now(),
    expiresOn: Date.now() + 604800000,
    text: 'just a banana',
    type: 'fruit',
    img: 'http://upload.evocdn.co.uk/fruitnet/uploads/asset_image/2_1094396_e.jpg',
    quantity: 4,
  }, {
    name: 'banana',
    addedOn: Date.now(),
    expiresOn: Date.now() + 604800000,
    text: 'just a banana',
    type: 'fruit',
    img: 'http://upload.evocdn.co.uk/fruitnet/uploads/asset_image/2_1094396_e.jpg',
    quantity: 4,
  }, {
    name: 'banana',
    addedOn: Date.now(),
    expiresOn: Date.now() + 604800000,
    text: 'just a banana',
    type: 'fruit',
    img: 'http://upload.evocdn.co.uk/fruitnet/uploads/asset_image/2_1094396_e.jpg',
    quantity: 4,
  }, {
    name: 'banana',
    addedOn: Date.now(),
    expiresOn: Date.now() + 604800000,
    text: 'just a banana',
    type: 'fruit',
    img: 'http://upload.evocdn.co.uk/fruitnet/uploads/asset_image/2_1094396_e.jpg',
    quantity: 4,
  }, {
    name: 'banana',
    addedOn: Date.now(),
    expiresOn: Date.now() + 604800000,
    text: 'just a banana',
    type: 'fruit',
    img: 'http://upload.evocdn.co.uk/fruitnet/uploads/asset_image/2_1094396_e.jpg',
    quantity: 4,
  }, {
    name: 'banana',
    addedOn: Date.now(),
    expiresOn: Date.now() + 604800000,
    text: 'just a banana',
    type: 'fruit',
    img: 'http://upload.evocdn.co.uk/fruitnet/uploads/asset_image/2_1094396_e.jpg',
    quantity: 4,
  },

  {
    name: 'banana',
    addedOn: Date.now(),
    expiresOn: Date.now() + 604800000,
    text: 'just a banana',
    type: 'fruit',
    img: 'http://upload.evocdn.co.uk/fruitnet/uploads/asset_image/2_1094396_e.jpg',
    quantity: 4,
  },

];

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'food/:_id': 'foodDetail',
    'addFood': 'addFood'
  },

  initialize: function() {
    this.foods = new Foods();
    this.menu = new MenuView();
  },
  navigateToId: function(model) {
    var _id = model.get('_id');
    window.router.navigate('food/' + _id, {
      trigger: true
    })
  },

  changeView: function(view) {
    $('#main').empty();
    this.currentView && this.currentView.undelegateEvents();

    this.currentView = view;
    return this.currentView;
  },

  index: function() {
    var view = new foodsView(this.foods);
    this.changeView(view);
    this.currentView.render();
  },

  foodDetail: function(_id) {
    var self = this;

    if (this.foods.length == 0) {
      this.foods.fetch({
        success: function() {
          var model = self.foods.get(_id);
          var view = new FoodDetailView({
            model: model
          });
          self.changeView(view);
          self.currentView.render();
        }
      })
    } else {

      var model = this.foods.get(_id) || window.router.currentView.model;
      var view = new FoodDetailView({
        model: model
      });
      self.changeView(view);
      self.currentView.render();
    }
  },

  addFood: function() {
    var food = new Food();
    var view = new FoodDetailView({
      model: food
    });
    this.changeView(view);
    this.currentView.render();
    this.currentView.toggleEditMode();

  }


});

module.exports = Router;