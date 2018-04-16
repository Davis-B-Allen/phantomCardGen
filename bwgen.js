var fs = require('fs');
var system = require('system');
var page = require('webpage').create();

var vpWidth = 1500;
var vpHeight = 2100;
var bleed = false;

var sourceTsv = "input/data/bw/bw_en.tsv";
var outputPath = "output/bw/";




function getFileUrl(str) {
  var pathName = fs.absolute(str).replace(/\\/g, '/');
  // Windows drive letter must be prefixed with a slash
  if (pathName[0] !== "/") {
    pathName = "/" + pathName;
  }
  return encodeURI("file://" + pathName);
};

function looksLikePath(someInputString) {
  return ((someInputString.indexOf('/') > -1) || (someInputString.indexOf("\\") > -1));
}

/**
 * imports a .tsv file and returns an array of arrays
 * @param  {str} sourcePath path to source .tsv file
 * @return {str[][]}        returns an array of arrays of strings
 */
function importTsv(sourcePath) {
  var rows = [];
  var file_h = fs.open(sourcePath, 'r');
  var line = file_h.readLine();
  while (line) {
    var elements = line.split("\t");
    rows.push(elements);
    line = file_h.readLine();
  }
  file_h.close();
  return rows;
}




var args = system.args;

console.log("Args: ");
for (var i = 0; i < args.length; i++) {
  console.log(i + ": " + args[i]);
}

console.log("-------- Processing args");
if (args.length === 1) {
  console.log('No additional arguments passed when invoking this script');
} else {
  // --tsv
  if (args.indexOf("--tsv") > -1) {
    var tsvArg = args[args.indexOf("--tsv") + 1];
    if (tsvArg) {
      sourceTsv = (looksLikePath(tsvArg)) ? tsvArg : "input/" + tsvArg;
      console.log(args.indexOf("--tsv") + ": " + args[args.indexOf("--tsv")] + ": " + args[args.indexOf("--tsv") + 1]);
    } else {
      console.log("no tsv argument found");
    }
  }

  // --bleed
  if (args.indexOf("--bleed") > -1) {
    var bleedArg = args[args.indexOf("--bleed") + 1];
    if (bleedArg) {
      if (bleedArg.toLowerCase() == "true") {
        bleed = true;
        vpWidth = 1644;
        vpHeight = 2244;
      }
      console.log(args.indexOf("--bleed") + ": " + args[args.indexOf("--bleed")] + ": " + args[args.indexOf("--bleed") + 1]);
    } else {
      console.log("no bleed argument found");
    }
  }

  // --outputfolder
  if (args.indexOf("--outputfolder") > -1) {
    var outputArg = args[args.indexOf("--outputfolder") + 1];
    if (outputArg) {
      outputPath = (looksLikePath(outputArg)) ? outputArg : outputPath + outputArg + "/";
    } else {
      console.log("no output argument found");
    }
  }
}
console.log("-------- Done processing args");








var cards = importTsv(sourceTsv);

// ignore the header row
var cardsLabels = cards.shift();

// add an additional row for first time run through
// for some reason, the first image exported with bleed gets fucked up. this is a shitty workaround
// cards.unshift(cards[0]);

var fileUrl = getFileUrl("input/html/bwLayout.html");

// Leave the line below uncommented to only export a few cards. Keep it commented to export all cards
// cards = cards.slice(39,42);

//viewportSize being the actual size of the headless browser
page.viewportSize = { width: vpWidth, height: vpHeight };
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
      var cardProblem = document.getElementById('p-card-content-problem');
      cardProblem.innerHTML = currentCard[cardsLabels.indexOf("Response")];
      var cardNumber = document.getElementById('card-number');
      cardNumber.innerHTML = currentCard[cardsLabels.indexOf("Number")];
      var pcard = document.getElementsByClassName('pcard')[0];
      pcard.style.background = "#000000";
      pcard.style.color = "#ffffff";
      if (bleed) {
        document.body.style.background = "#000000";
      }
    }, currentCard,cardsLabels,bleed);
    page.render('output/bw/bw' + i + 'b.png');
    page.evaluate(function(currentCard,cardsLabels,bleed) {
      var pcard = document.getElementsByClassName('pcard')[0];
      pcard.style.background = "#ffffff";
      pcard.style.color = "#000000";
      if (bleed) {
        document.body.style.background = "#ffffff";
      }
    }, currentCard,cardsLabels,bleed);
    page.render(outputPath + 'bw' + i + 'w.png');
  }

  phantom.exit();
});
