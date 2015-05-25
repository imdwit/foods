var FoodView = require('./foodView');
var Food = require('../models/foodModel');
var FoodsView = Backbone.View.extend({
  el: '#main',
  events: {},
  initialize: function(foods) {
    this.now = Date.now();
    this.foods = foods;
    this.listenTo(this.foods, 'reset', this.addAll);
    if (!foods.length) {
      this.foods.fetch({
        reset: true
      });
    }
  },

  render: function() {
    this.addAll();
  },

  addAll: function() {
    this.foods.each(this.addOne, this);
    this.end = Date.now();
    console.log(this.end - this.now);
  },

  addOne: function(food) {
    var view = new FoodView({
      model: food
    });
    var self = this;
    this.$el.append(view.render().el);
  }
});

module.exports = FoodsView;