var fs = require('fs');
var system = require('system');
var page = require('webpage').create();

var cards = [];

var file_h = fs.open('input/cardsNewDelim.csv', 'r');
var line = file_h.readLine();
while (line) {
  var cardProps = line.split("$$$$");
  cards.push(cardProps);
  // console.log(cardProps[10]);
  line = file_h.readLine();
}
file_h.close();


var args = system.args;
if (args.length === 1) {
  console.log('No additional arguments passed when invoking this script');
} else {
  args.forEach(function(arg, i) {
    console.log(i + ': ' + arg);
  });
}



function getFileUrl(str) {
  var pathName = fs.absolute(str).replace(/\\/g, '/');
  // Windows drive letter must be prefixed with a slash
  if (pathName[0] !== "/") {
    pathName = "/" + pathName;
  }
  return encodeURI("file://" + pathName);
};

var fileUrl = getFileUrl("input/html/cardExportTest.html");
console.log(fileUrl);



//viewportSize being the actual size of the headless browser
page.viewportSize = { width: 1024, height: 768 };
page.open(fileUrl, function() {

  var currentCard;
  for (var i = 0; i < cards.length; i++) {
    currentCard = cards[i];
    page.evaluate(function(currentCard) {
      var cardTitle = document.getElementById('q-card-name-header');
      var cardQuestion = document.getElementById('q-card-question-text');
      var qCardContent = document.getElementsByClassName('q-card-content')[0];
      cardTitle.innerText = currentCard[9];
      cardQuestion.innerText = currentCard[12];
      qCardContent.style.color = currentCard[5];

      var numbers = document.getElementsByClassName('number-suit-face-number');
      var suits = document.getElementsByClassName('number-suit-face-icon');
      for(var i = 0; i < numbers.length; i++) { numbers[i].innerText = currentCard[7]; }
      for(var i = 0; i < suits.length; i++) { suits[i].innerText = currentCard[8]; }
    }, currentCard);
    page.render('output/github' + i + '.png');
  }

  phantom.exit();
});
