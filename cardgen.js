var fs = require('fs');
var system = require('system');
var page = require('webpage').create();

var cards = [];

var file_h = fs.open('input/cardsTabDelim.tsv', 'r');
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

var fileUrl = "https://ancient-fortress-56378.herokuapp.com/test";
var bleed, vpWidth, vpHeight;

var args = system.args;
if (args.length === 1) {
  console.log('No additional arguments passed when invoking this script');
} else {

  if (args.indexOf("local") > -1) {
    fileUrl = getFileUrl("input/html/cardExportTest.html");
    console.log(fileUrl);
  } else if (args.indexOf("remote") > -1) {
    fileUrl = "https://ancient-fortress-56378.herokuapp.com/test";
    console.log(fileUrl);
  } else {
    fileUrl = "https://ancient-fortress-56378.herokuapp.com/test";
    console.log(fileUrl);
  }

  if (args.indexOf("bleed") > -1) {
    bleed = true;
  } else if (args.indexOf("nobleed") > -1) {
    bleed = false;
  } else {
    bleed = false;
  }

}

if (bleed) {
  vpWidth = 1644;
  vpHeight = 2244;
} else {
  vpWidth = 1500;
  vpHeight = 2100;
}


// cards = cards.slice(29,32);

// add an additional row for first time run through
cards.unshift(cards[0]);

// viewportSize being the actual size of the headless browser
page.viewportSize = { width: vpWidth, height: vpHeight };
// page.viewportSize = { width: 1500, height: 2100 };

page.open(fileUrl, function() {

  var currentCard;
  for (var i = 0; i < cards.length; i++) {
    currentCard = cards[i];
    page.evaluate(function(currentCard,cardsLabels,bleed) {
      if (bleed) {
        document.body.style.margin = "72px"
      } else {
        document.body.style.margin = "0";
      }
      var qCard = document.getElementsByClassName('qcard')[0];
      var cardTitle = document.getElementById('q-card-name');
      var cardQuestion = document.getElementById('q-card-question');
      var qCardFooter = document.getElementsByClassName('q-card-footer')[0];
      cardTitle.innerHTML = "<h1>" + currentCard[cardsLabels.indexOf("Topic")] + "</h1>";
      cardTitle.style.color = currentCard[cardsLabels.indexOf("Color")];
      cardQuestion.innerHTML = "<p>" + currentCard[cardsLabels.indexOf("Text")] + "</p>";
      qCard.style.background = currentCard[cardsLabels.indexOf("BackgroundColor")];
      cardQuestion.style.color = currentCard[cardsLabels.indexOf("qTextColor")];
      qCardFooter.style.color = currentCard[cardsLabels.indexOf("footerColor")];
      if (bleed) {
        document.body.style.background = currentCard[cardsLabels.indexOf("BackgroundColor")];
        qCard.style.border = "none";
      }

      var numbers = document.getElementsByClassName('number-suit');
      for(var i = 0; i < numbers.length; i++) {
        numbers[i].innerHTML = currentCard[cardsLabels.indexOf("NumDisp")] + "<br>" + currentCard[cardsLabels.indexOf("SymDisp")];
        numbers[i].style.color = currentCard[cardsLabels.indexOf("Color")];
      }
    }, currentCard,cardsLabels,bleed);
    page.render('output/card' + i + '.png');
  }

  phantom.exit();
});
