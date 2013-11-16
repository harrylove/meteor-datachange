Meteor.publish('things', function() {
    return Things.find();
});

Meteor.publish('views', function() {
    return Views.find();
});

var views = [
    { name: 'default', templates: ['occupation', 'age', 'name'] },
    { name: 'country', templates: ['country', 'year', 'status'] },
    { name: 'other', templates: ['name', 'age'] }
];

var things = [
    { name: 'David', age:20, occupation: 'Tinker' },
    { name: 'Elliot', age:30, occupation: 'Tailor' },
    { name: 'Lisa', age:40, occupation: 'Soldier', view: 'other' },
    { name: 'Blueberry', age:1, occupation: 'Pie' },
    { country:'Mexico', year:1989, status:'green', view: 'country' }
];

Meteor.startup(function() {

    if (Views.find().count() == 0) {
        _.each(views, function(view) {
            Views.insert(view);
        });
    }

    if (Things.find().count() == 0) {
	_.each(things, function(thing) {
	    Things.insert(thing);
        });
    }

});
