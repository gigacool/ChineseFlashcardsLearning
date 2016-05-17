window.chineseLearning = window.chineseLearning || {};

var Router = Backbone.Router.extend({
  routes: {
    'about': 'about',
    'explore/:attribute(/:item)': 'explore',
    '/search/:key':'home',
    '*any': 'home'
  },
  home: function(optionalSearchKey) {
    $('#main-container').html('');
    $('#main-container').html($('#home-template').html());
    if (!optionalSearchKey){
      var d = new Date();
      var randomKey = parseInt(150*Math.abs(Math.sin(parseInt(''+ d.getFullYear() + d.getMonth() + d.getDay()))));
      //var randomKey = parseInt(Math.random()*150);
      $.get('rest/words/'+randomKey).done(function(data){
        console.log(data);

        $('.word-of-the-day').html('<div class="word">' + data.word.character + '</div><div class="pinyin">(' + data.word.pinyin + ')</div><div class="translation">' + data.word.translations.join('<br/>')+'</div>');
      }).fail(function(error){
        console.error(error);
      });
    }


  },
  about: function() {
    $('#main-container').html('');
  }

});

window.chineseLearning.routes = {
  Router:Router
};
