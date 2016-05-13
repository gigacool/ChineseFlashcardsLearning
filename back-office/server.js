/*
 * the node server back-office is meant to be a REST API providing more
 * or less raw access to database. First draft:
 * /REST/words(?start=0&number=100)                   -->
 * /REST/words/:id                                    -->
 * /REST/words/level/:id(?start=0&number=100)         -->
 */
var fs, express, server, words;
fs = require('fs');

console.info('Loading dataset');
words = require('./hsk1-6.json').data;

// temp until DBms comes into play --------------------------------------------

var wordsByLevel = words.reduce(function(wordsByLevel, word){
  wordsByLevel[word.level].push(word);
  return wordsByLevel;
}, {1:[],2:[],3:[],4:[],5:[],6:[]});

var wordsById = words.reduce(function(wordsById, word){
  wordsById[word.id] = word;
  return wordsById;
},{});

// ----------------------------------------------------------------------------

console.info('setup http server...');
express = require('express');
server = express();
server.use(require('compression')());

server
  .route('/')
  .get(express.static('./front-office'));

console.info('Getting API ready');
server.route('/REST/words')
  .get(function(request, response){
    var start = decodeURIComponent(request.query.start);
    var number = decodeURIComponent(request.query.number);
    if(!isNaN(start) || !isNaN(number)){
      start = parseInt(start) || 0;
      number = parseInt(number) || 100;
      return response.send({words:words.slice(start, start + number), total:words.length});
    }
    return response.send({words:words, total:words.length});
  });

server.route('/REST/words/:id')
  .get(function(request, response){
    response.send({word:wordsById[request.params.id]});
  });

server.route('/REST/words/levels/:id')
  .get(function(request, response){
    response.send({words:wordsByLevel[request.params.id]});
  });

server.listen(3000);
console.info('Server ready at http://localhost:3000');
