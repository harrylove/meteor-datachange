Things = new Meteor.Collection('things');
Views = new Meteor.Collection('views');


Views.allow({
    insert: function() {
        return true;
    },
    update: function() {
        return true;
    }
});

Things.allow({
    insert: function() {
        return true;
    },
    update: function() {
        return true;
    }
});
