Meteor.subscribe('things');
Meteor.subscribe('views');

Meteor.startup(function() {
    Deps.autorun(function(comp) {
        if (!Session.get('id')) {
            var thing = Things.findOne();
            thing && Session.set('id', thing._id);
        } else {
            comp.stop();
        }
    });
});

var active = function() {
    return Things.findOne(Session.get('id'));
};

Template.application.thing = function() {
    var thing = active();
    if (thing) {
	var viewName = thing.view || 'default';
        var view = Views.findOne({ name: viewName });
        var templates = _.map(view.templates, function(key) {
            var template = Template[key] || Template.unknown;
            return template({ key: key, val: thing[key] });
        });
        return templates.join('');
    }
};

Template.thingList.things = function() {
    return Things.find();
};

Template.thingList.events({
    'click a': function(e) {
	e.preventDefault();
	Session.set('id', e.target.innerText);
    }
});
