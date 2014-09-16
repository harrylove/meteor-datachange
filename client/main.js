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

var getActiveThing = function() {
    return Things.findOne(Session.get('id'));
};

Template.thing.theTemplate = function() {
    return this.toString();
};

Template.thing.getActiveThing = function() {
    return getActiveThing();
};

Template.thing.thingViews = function() {
    var thing = getActiveThing();
    if (thing) {
        var viewName = thing && thing.view || 'default';
        var view = Views.findOne({ name: viewName });
	return view && _.map(view.templates, function(name) {
	    return 'tpl_' + name;
	});
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
