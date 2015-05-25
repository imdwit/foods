var Food = require('../models/foodModel');
var FoodView = Backbone.View.extend({

  tagName: 'li',
  className: 'food',

  template: _.template(require('../lib/templates').get('foodView')),
  events: {},

  initialize: function() {},

  render: function(cb) {
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

    if (data._attachments || data.imSrc) {

      var img = data._attachments.img;
      var imgType = model.imgType || img.content_type;
      var imgSrc = model.imgSrc || img.data;
      var url = 'data:' + imgType + ';base64,' + imgSrc;
      data.img = url;
    }

    this.$el.html(this.template(data));
    return this;
  }



});


function getTheDate(t) {
  var time = new Date(t);
  var theyear = time.getFullYear();
  var themonth = time.getMonth() + 1;
  var thetoday = time.getDate();
  var hour = time.getHours();
  var ampm = (hour >= 13) ? 'pm' : 'am';
  hour = (hour >= 13) ? hour - 12 : hour;
  var minute = time.getMinutes();
  minute = (minute > 10) ? minute : '0' + minute;
  var shit = theyear + "/" + themonth + "/" + thetoday;
  return theyear + "-" + thetoday + "-0" + themonth;
}

module.exports = FoodView;