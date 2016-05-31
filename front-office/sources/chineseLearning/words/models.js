window.chineseLearning = window.chineseLearning || {};
window.chineseLearning.words = chineseLearning.words ||  {};


var Word = Backbone.Model.extend({
    url: function() {
        return 'rest/words/' + this.get('id');
    },
    _assertStatus: function() {
        if (!this.attributes.word) {
            throw new Error('Word is not defined. Did you fetch data from server ?');
        }
    },
    parse:function(data){
      data.id = data.id;
      if (isNaN(data.id)){
        data.id = data.word.id;
      }
      return data;
    },
    getId:function(){
      return this.get('id');
    },
    getWord: function() {
        this._assertStatus();
        return this.attributes.word.character;
    },
    getPinyin: function() {
        this._assertStatus();
        return this.attributes.word.pinyin;
    },
    getTranslations: function() {
        this._assertStatus();
        return this.attributes.word.translations.slice(0);
    },
    getLevel: function() {
        this._assertStatus();
        return this.attributes.word.level;
    }
}, {
    wordOfTheDay: function(levelCap) {
      var d, cap;
      d = new Date();
      levelCap = levelCap || 150;
      // pseudo random value for any day
      return new Word({
        id:parseInt(levelCap * Math.abs(Math.sin(parseInt(''+ d.getFullYear() + d.getMonth() + d.getDay()))))
      });
    }
});

var Words = Backbone.Collection.extend({
  model:Word,
  url:function(){
    return 'rest/words/levels/' + this.levelId;
  },
  initialize:function(data, options){
    this.levelId = options.levelId;
  },
  parse:function(data){
    this.total = data.total;
    return data.words;
  }


});

window.chineseLearning.words.models = {
    Word: Word,
    Words:Words
};
