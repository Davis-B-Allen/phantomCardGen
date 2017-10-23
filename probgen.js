var fs = require('fs');
var system = require('system');
var page = require('webpage').create();

var cards = [];

var file_h = fs.open('input/probsTabDelim.tsv', 'r');
var line = file_h.readLine();
while (line) {
  var cardProps = line.split("\t");
  cards.push(cardProps);
  line = file_h.readLine();
}
file_h.close();

// ignore the header row
var cardsLabels = cards.shift();

function getFileUrl(str) {
  var pathName = fs.absolute(str).replace(/\\/g, '/');
  // Windows drive letter must be prefixed with a slash
  if (pathName[0] !== "/") {
    pathName = "/" + pathName;
  }
  return encodeURI("file://" + pathName);
};

var args = system.args;
if (args.length === 1) {
  console.log('No additional arguments passed when invoking this script');
} else {
  // handle args
}

var fileUrl = getFileUrl("input/html/probsLayout.html");

// cards = cards.slice(33,37);

//viewportSize being the actual size of the headless browser
page.viewportSize = { width: 1644, height: 2244 };
page.open(fileUrl, function() {

  var currentCard;
  for (var i = 0; i < cards.length; i++) {
    currentCard = cards[i];
    page.evaluate(function(currentCard,cardsLabels) {
      var cardProblem = document.getElementById('p-card-content-problem');
      cardProblem.innerHTML = currentCard[cardsLabels.indexOf("Response")];
    }, currentCard,cardsLabels);
    page.render('output/prob' + i + '.png');
  }

  phantom.exit();
});
