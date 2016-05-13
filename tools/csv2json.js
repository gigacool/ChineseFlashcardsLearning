var fs = require('fs');

function processError(error){
  if (error){
    throw error;
  }
}

function filterComments(row){
  return row.indexOf('#') !== 0 && '' !== row;
}

function parseRow(row){
  row = row.split('\t');
  return {
    id:parseInt(row[1])-1,
    level:parseInt(row[0]),
    character:row[2].trim(),
    pinyin:row[3].trim(),
    translations:row[4].split(',').map(function(translation){return translation.trim();})
  };
}

fs.readFile('./hsk1-6.csv', 'utf8', function(error, data) {
  processError(error);

  var outputData = {
    metaData:{
      id:'Word identifier',
      level:'Word group according to Hanyu Shuiping Kaoshi(HSK) learning set level (from 1 to 6)',
      character:'Simplified Chinese characters for the word',
      pinyin:'Pin yin writing for the word',
      translations:'Array of translations, following CEDICT dictionary order, with some simplification'
    },
    data:data.split('\n')
      .filter(filterComments)
      .map(parseRow)
  };

  fs.writeFile('../back-office/hsk1-6.json', JSON.stringify(outputData, null, 2), 'utf8', function(error){
    processError(error);
    console.info('data converted to hsk1-6.json');
  });
});
