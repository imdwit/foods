var Foods = Backbone.Collection.extend({
  model: require('../models/foodModel.js'),
  comparator: function(model) {
    return model.get('expiresOn')
  },
  parse: function(result) {
    return _.pluck(result.rows, 'doc');
  }
});

module.exports = Foods;


/* var filtered = _.filter(rows, function(model) {
      return _.contains(model.doc.tags, 'test');
    });
    console.log('FILTERED', filtered);
    */