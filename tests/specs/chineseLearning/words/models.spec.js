describe('words', function() {

    it('should declare a models container', function() {
        expect(window.chineseLearning.words).to.be.ok;
        expect(window.chineseLearning.words.models).to.be.ok;
    });

    describe('Word model', function() {
        var Word = window.chineseLearning.words.models.Word;

        it('should be declared', function() {
            expect(Word).to.be.a('function');
        });

        it('should link to proper REST URL for a Word', function() {
            var word = new Word({
                id: 123
            });
            expect(word.url()).to.equal('rest/words/123');
        });

        describe('getter functions', function() {
            var loveWord;

            beforeEach(function() {
                loveWord = new Word({
                    word: {
                        id: 0,
                        level: 1,
                        character: '爱',
                        pinyin: 'ài',
                        translations: ['to love', 'affection', 'to be fond of', 'to like']
                    }
                });
            });

            it('should define the getWord function', function() {
                expect(Word.prototype.getWord).to.be.a('function');
            });

            it('should throw an error on the getWord function if data is not available', function() {
                expect(new Word().getWord).to.throw();
            });

            it('should provide the word on getWord', function() {
                expect(loveWord.getWord()).to.equal('爱');
            });

            it('should define the getPinyin function', function() {
                expect(Word.prototype.getPinyin).to.be.a('function');
            });

            it('should throw an error on the getPiyin function if data is not available', function() {
                expect(new Word().getPinyin).to.throw();
            });

            it('should provide the word on getPiyin', function() {
                expect(loveWord.getPinyin()).to.equal('ài');
            });

            it('should define the getTranslations function', function() {
                expect(Word.prototype.getTranslations).to.be.a('function');
            });


            it('should throw an error on the getTranslations function if data is not available', function() {
                expect(new Word().getTranslations).to.throw();
            });

            it('should return an array of translations on getTranslations', function() {
                var translations = loveWord.getTranslations();
                expect(translations).to.be.an('Array');
                expect(translations.length).to.equal(4);

            });

            it('should return the translations in the preserved order in getTranslations', function() {
                var translations = loveWord.getTranslations();
                ['to love', 'affection', 'to be fond of', 'to like'].forEach(function(translation, index) {
                    expect(translations[index]).to.equal(translation);
                });
            });

            it('should not return direct access to array in getTranslations', function() {
                var translationsBeforeChange = loveWord.getTranslations();
                expect(translationsBeforeChange.length).to.equal(4);
                translationsBeforeChange.push('oh no!');
                var translationsAfterChange = loveWord.getTranslations();
                expect(translationsAfterChange.length).to.equal(4);
            });

            it('should define a getLevel function', function(){
              expect(Word.prototype.getLevel).to.be.a('function');
            });

            it('should throw an error on the getLevel function if data is not available', function() {
                expect(new Word().getLevel).to.throw();
            });

            it('should return the word HSK level on getLevel', function(){
              [1,2,3,4,5,6].forEach(function(level){
                expect(new Word({word:{level:level}}).getLevel()).to.equal(level);
              });

            });
        });

        describe('factories', function(){
          describe('Word of the day', function(){

            it('should be defined', function(){
              expect(Word.wordOfTheDay).to.be.a('function');
            });

            it('should return a Word', function(){
              var wod = Word.wordOfTheDay();
              expect(wod.getWord).to.be.a('function'); // better way to test a class instance ?
            });

            it('should cap the word ID based on defined range a Word', function(){
              var wod = Word.wordOfTheDay(10);
              expect(wod.get('id') < 10).to.be.ok;
            });

            // it('should return a Word based on the day input', function(){
            //   var wod = Word.wordOfTheDay('2016-12-01');
            //   expect(wod.getWord).to.be.a('function'); // better way to test a class instance ?
            // });
            //
            // it('should return the same word ID for same day', function(){
            //   var morning = Word.wordOfTheDay('2016-12-01T02:00:00');
            //   var afternoon = Word.wordOfTheDay('2016-12-01T12:00:00');
            //   var evening = Word.wordOfTheDay('2016-12-01T21:00:00');
            //   expect(morning.get('id')).to.equal(evening.get('id'));
            //   expect(afternoon.get('id')).to.equal(morning.get('id'));
            // });



          });

        });

    });


});
