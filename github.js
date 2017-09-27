var fs = require('fs');
var system = require('system');
var page = require('webpage').create();

var cards = [];

var file_h = fs.open('input/cardsNewDelim.csv', 'r');
var line = file_h.readLine();
while (line) {
  var cardProps = line.split("$$$$");
  cards.push(cardProps);
  console.log(cardProps[10]);
  line = file_h.readLine();
}
file_h.close();


var args = system.args;
if (args.length === 1) {
  console.log('Try to pass some arguments when invoking this script!');
} else {
  args.forEach(function(arg, i) {
    console.log(i + ': ' + arg);
  });
}


//viewportSize being the actual size of the headless browser
page.viewportSize = { width: 1024, height: 768 };
page.open('file:///Users/davisallen/Projects/Javascript/phantomCardGen/input/html/cardExportTest.html', function() {

  var currentCard;
  for (var i = 0; i < cards.length; i++) {
    currentCard = cards[i];
    page.evaluate(function(currentCard) {
      var cardTitle = document.getElementById('q-card-name-header');
      cardTitle.innerText = currentCard[7];
      return "Finished running JS on the page";
    }, currentCard);
    page.render('output/github' + i + '.png');
  }

  page.evaluate(function() {

    qCardInner.style.color = "lightblue";

    return "Finished running JS on the page";
  });

  page.render('output/github' + "XXX" + '.png');
  phantom.exit();
});
