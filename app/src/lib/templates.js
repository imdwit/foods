var templates = {
  templates: {},
  loadTemplates: function(names, callback) {
    var that = this,
    loadTemplate = function(index) {
      var name = names[index];
      $.get('templates/' + name + '.html', function(data) {
        that.templates[name] = data;
        index++;
        if (index < names.length) {
          loadTemplate(index);
        } else {
          callback();
        }
      });
    };

    loadTemplate(0);
  },
  get: function(name) {
    return this.templates[name];
  }
};

module.exports = templates;

//https://github.com/ccoenraets/backbone-cellar/blob/master/tutorial/final/js/utils.js