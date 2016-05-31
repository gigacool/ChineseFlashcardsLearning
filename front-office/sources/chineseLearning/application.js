window.chineseLearning = window.chineseLearning || {};

var Router = Backbone.Router.extend({
  routes: {
    'about': 'about',
    'explore/:attribute(/:item)': 'explore',
    'search/:key':'home',
    'levels/:levelId':'level',
    '*any': 'home'
  },
  home: function(optionalSearchKey) {
    $('#main-container').html('');
    $('#main-container').html($('#home-template').html());
    if (!optionalSearchKey){
      var wordOfTheDay = window.chineseLearning.words.models.Word.wordOfTheDay(150);
      wordOfTheDay.fetch().done(function(){
        var data = wordOfTheDay.toJSON();
        $('.word-of-the-day').html('<div class="word">' + data.word.character + '</div><div class="pinyin">(' + data.word.pinyin + ')</div><div class="translation">' + data.word.translations.join('<br/>')+'</div>');
      }).fail(function(error){
        console.error(error);
      });

    }
  },
  level:function(levelId){
    console.log('by level', levelId);
    var wordsByLevel = new window.chineseLearning.words.models.Words([],{levelId:levelId});
    wordsByLevel.fetch()
      .done(function(){
        $('#main-container').html('<div class="card-container"></div>');
        var $m = $('#main-container .card-container');
        $m.scrollTop(0);
        wordsByLevel.toJSON().forEach(function(word){
          var translation, fullTranslation = word.translations.join(', ');
          if (fullTranslation.length > 10){
            translation = fullTranslation.substring(0,10) + '...';
          }
          else {
            translation = fullTranslation;
          }
          $m.append('<div class="card"><div class="word '+(word.character.length>3 ? 'large':'')+'">' + word.character + '</div><div title="HSK level '+word.level+'" class="level level-'+word.level+'"/><div class="pinyin">' + word.pinyin + '</div><div title="'+fullTranslation+'" class="translation">' + translation + '</div></div>');
        });

        console.log(wordsByLevel.toJSON());
      }).fail(function(error){
        console.error(error);
      });

  },
  about: function() {
    $('#main-container').html('');
  }

});

window.chineseLearning.routes = {
  Router:Router
};
