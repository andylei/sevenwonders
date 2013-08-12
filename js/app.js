window.Seven = Ember.Application.create();

Seven.Router.map(function() {
  this.resource('game', {path: '/'});
});

Seven.GameRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var sheet = Seven.ScoreSheetController.create();
    sheet.set('persons', [
      Seven.PersonScore.create(),
      Seven.PersonScore.create(),
      Seven.PersonScore.create()
    ]);
    controller.set('scoreSheets', [sheet]);
  }
});

Seven.GameController = Ember.Controller.extend({
  scoreSheets: [],
  addSheet: function() {
    var sheets = this.get('scoreSheets').toArray();
    // get the top sheet, make a new sheet with the same names
    var ppl = [];
    var topSheet = sheets[0];
    for(var i = 0; i < topSheet.get('persons').length; i++) {
      var name = topSheet.get('persons')[i].get('name');
      ppl.push(Seven.PersonScore.create({name: name}));
    }

    var newSheet = Seven.ScoreSheetController.create({persons: ppl});
    this.set('scoreSheets', [newSheet].concat(sheets));
  }
});

Seven.ScoreSheetView = Ember.View.extend({
  templateName: 'scoreSheet',
  classNames: ['scoresheet']
});

Seven.ScoresHeaderView = Ember.View.extend({
  templateName: 'score-header',
  tagName: "tr",
  classNames: ["name"]
});

Seven.ScoreSheetController = Ember.Controller.extend({
  persons: [],
  _copyPpl: function() {
    return this.get('persons').toArray().slice(0);
  },
  removePerson: function() {
    var ppl = this._copyPpl();
    if (ppl.length > 1) {
      ppl.pop();
      this.set('persons', ppl);
    }
  },
  addPerson: function() {
    var ppl = this._copyPpl();
    ppl.push(Seven.PersonScore.create());
    this.set('persons', ppl);
  },
  ranking: function() {
    var ppl = this.get('persons').toArray().slice(0);
    ppl.sort(function(a, b){ return b.get('total') - a.get('total'); });
    return ppl;
  }.property('persons.@each.total')
});

PERSON_SCORE_PARTS = ['war', 'money', 'wonders', 'civics', 'commerce', 'guilds', 'science'];
Seven.PersonScore = Ember.Controller.extend({
  name: "",
  total: function() {
    var s = 0;
    for (var i = 0; i < PERSON_SCORE_PARTS.length; i++) {
      s += parseInt(this.get(PERSON_SCORE_PARTS[i]) || 0, 10);
    }
    return s;
  }.property('war', 'money', 'wonders', 'civics', 'commerce', 'guilds', 'science')
});

