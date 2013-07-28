window.Seven = Ember.Application.create();

Seven.Router.map(function() {
  this.resource('scores', {path: '/'});
});

Seven.ScoresRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('persons', [
      Seven.PersonScore.create(),
      Seven.PersonScore.create(),
      Seven.PersonScore.create(),
      Seven.PersonScore.create(),
      Seven.PersonScore.create(),
      Seven.PersonScore.create(),
      Seven.PersonScore.create()
    ]);
  }
});

Seven.RankingView = Ember.View.create({
  templateName: 'ranking'
});

Seven.ScoresController = Ember.Controller.extend({
  persons: [],
  ranking: function() {
    var ppl = this.get('persons').slice(0);
    ppl.sort(function(a, b){ return b.get('total') - a.get('total'); });
    return ppl;
  }.property('persons.@each.total')
});

PERSON_SCORE_PARTS = ['war', 'money', 'wonders', 'civics', 'commerce', 'guilds', 'science'];
Seven.PersonScore = Ember.Object.extend({
  name: null,
  parts: PERSON_SCORE_PARTS,
  total: function() {
    var s = 0;
    for (var i = 0; i < PERSON_SCORE_PARTS.length; i++) {
      s += parseInt(this.get(PERSON_SCORE_PARTS[i]) || 0, 10);
    }
    return s;
  }.property('war', 'money', 'wonders', 'civics', 'commerce', 'guilds', 'science')
});

