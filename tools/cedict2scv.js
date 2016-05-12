var fs = require('fs');
var pinYin = require('./pinYinToUnicode');

function filterComments(row){
  return row.indexOf('#') !== 0;
}

function parseRow(row){
  // Traditional Simplified [pin1 yin1] /English equivalent
  var result;
    result = [];
    var split = row.split(' ');
    result.push(split[0]);
    result.push(split[1]);
    row = row.replace(/\[[a-zA-Z0-9 ]+\]/g, function(pinyin){
      return '[' + pinYin.convert(pinyin.substring(1, pinyin.length-1)) + ' (' + pinyin + ')]';
    });
    var pinyin = row.split('[')[1].split(']'[0])[0];
    result.push(pinyin);
    // result.push(pinYin.convert(pinyin));
    result.push(row.split('/').filter(function(value, index){
      return value !== '\r' && index !== 0;
    }));
  return result;
}

fs.readFile('./cedict_ts.u8', 'utf8', function(error, data) {
  if (error){
    throw error;
  }
  var processedData = data.split('\n')
    .filter(filterComments)
    .map(parseRow);
  console.log(processedData.length);
  console.log(processedData[100]);
});
