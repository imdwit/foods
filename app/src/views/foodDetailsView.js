require('../lib/canvasResize');

var FoodDetailView = Backbone.View.extend({
  el: '#main',
  events: {
    'click #edit_image': 'editImage',
    'change #image_upload': 'test',
    'click .remove': 'removeFood'
  },
  template: _.template(require('../lib/templates').get('foodDetail')),
  initialize: function(data) {
    this.listenTo(this.model, 'change', this.render);
  },
  render: function(cb) {
    var self = this;
    var model = this.model;
    var data = model.toJSON();
    var oneDay = 24 * 60 * 60 * 1000;
    var expiresOn = this.model.get('expiresOn');
    var now = new Date();
    var differenceInDays = Math.round(Math.abs((new Date(expiresOn).getTime() - now.getTime()) / (oneDay)));
    data.expiresIn = differenceInDays;

    data.isExpired = (now.getTime() > expiresOn);

    data.addedOnFormated = getTheDate(data.addedOn);
    data.expiresOnFormated = getTheDate(expiresOn);

    if (data._attachments || data.imgSrc) {

      var img = data._attachments.img;
      var imgType = model.imgType || img.content_type;
      var imgSrc = model.imgSrc || img.data;
      var url = 'data:' + imgType + ';base64,' + imgSrc;
      data.img = url;

    }
    this.$el.html(this.template(data));
    return this;
  },

  removeFood: function(e) {
    e.preventDefault();

    this.model.destroy({
      success: function() {
        window.router.navigate('/', {
          trigger: true
        });
      }
    });
  },

  toggleEditMode: function() {
    $('.edit').toggleClass('hidden');
    $('.editable').toggleClass('hidden');
  },

  editImage: function(e) {
    e.preventDefault();
    $('#image_upload').click();
  },

  test: function(e) {
    var file = e.target.files[0];
    var model = this.model;
    canvasResize(file, {
      width: 500,
      height: 500,
      crop: false,
      quality: 95,
      //rotate: 90,
      callback: function(data, width, height) {
        $('#img_holder').attr('src', data);
        data = data.split(',')[1];
        model.imgSrc = data;
        model.imgType = 'image/jpeg';
      }
    });
  }

});


function getTheDate(t) {
  var local = new Date(t);
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  if (!local.toJSON()) return '';
  return local.toJSON().slice(0, 10);
}

module.exports = FoodDetailView;