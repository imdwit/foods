var MenuView = Backbone.View.extend({
  el: '#menu',
  events: {
    'click #save_food': 'saveFood',
    'click #toggle_edit': 'toggleEditMode'
  },
  initialize: function() {
    var self = this;
    Backbone.history.on('route', function(source, path) {
      self.render(path);
    });
  },
  render: function(path) {
    this.$el.empty();
    var template = $('#menu_' + path + '_Tmpl').html();
    this.$el.html(template);
  },

  toggleEditMode: function(e) {

    if(e) e.preventDefault();
    window.router.currentView.toggleEditMode();
  },

  saveFood: function(e) {
    e.preventDefault();
    var self = this;
    var view = window.router.currentView;
    var model = view.model;
    var modelAttrs = model.toJSON();
    var oneDay = 24 * 60 * 60 * 1000;
    var attrs = {
      name: $('#name').val() || modelAttrs.name,
      addedOn: Date.now() || modelAttrs.addedOn,
      expiresOn: $('#expiresOn').val() || modelAttrs.expiresOn,
      text: $('#text').val() || modelAttrs.text,
      type: $('#type').val() || modelAttrs.type,
      quantity: $('#quantity').val() || modelAttrs.quantity
    };
    var expiresOnFormated = new Date(attrs.expiresOn).getTime() + oneDay;

    attrs.expiresOn = expiresOnFormated;
    model.save(attrs, {
      silent: false,
      wait: true,
      success: function(mod) {
        view.toggleEditMode();
        console.log(mod, 'SUCCC');
        if (model.imgSrc) {
          model.set({img: ''}, {silent: true});
          model.attach(model.imgSrc, 'img', model.imgType, function(err, result) {
            window.router.navigateToId(model);

            self.render('foodDetail');
          });
        }
        else {
          console.log('no model.imgsrc');
          view.toggleEditMode();
          self.render('foodDetail');
        }
      }
    });
  }


});


function getTheDate(t) {
  var local = new Date(t);
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
}

module.exports = MenuView;