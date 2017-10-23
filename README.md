Install PhantomJS

The cardgen.js script will look for a tab-delimited data file named cardsTabDelim.tsv within an input folder at:
./input/cardsTabDelim.tsv



Run from command line with:

phantomjs cardgen.js

or on Windows:
/path/to/phantomjs.exe cardgen.js

or on Windows, if you've added the phantomjs bin to your path, just:
phantomjs.exe cardgen.js



This will use https://ancient-fortress-56378.herokuapp.com/test as a template for the cards



If you run with an optional argument "local":

phantomjs cardgen.js local
(phantomjs.exe cardgen.js local)

the script will look for an html file named cardExportTest.html within an html folder in the input folder at:
./input/html/cardExportTest.html





Data Source:
The cardsTabDelim.tsv file must have:
