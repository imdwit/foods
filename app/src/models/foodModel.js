var Food = Backbone.Model.extend({
    defaults: {
        name: 'food',
        addedOn: Date.now(),
        formatedDate: '',
        expiresOn: Date.now() + 604800000,
        expiresInDays: '',
        text: '',
        type: '',
        img: 'http://placehold.it/350x350',
        quantity: 1,
        tags: [],
    }
});

module.exports = Food;