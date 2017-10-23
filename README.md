# Requirements
---

Install PhantomJS:

[go here and click on the Download Button](http://phantomjs.org/)

# Usage
---

To generate question cards, run the following at the command line:
```
phantomjs cardgen.js [htmlSource] [layoutType]
```
or with [Windows Command Prompt](https://www.howtogeek.com/235101/10-ways-to-open-the-command-prompt-in-windows-10/):
```
phantomjs.exe cardgen.js [htmlSource] [layoutType]
```
Note: remember to [add phantomjs to your PATH](https://www.java.com/en/download/help/path.xml)

## Parameters and required files:

`[htmlSource]` must be either `local` or `remote`
* `local` will look for an html file named **cardExportTest.html** within the **input/html/** folder
* `remote` will pull the layout from https://ancient-fortress-56378.herokuapp.com/test

`[layoutType]` must be either `bleed` or `nobleed`
* `bleed` includes a margin around the card
* `nobleed` includes no margin

The script assumes there will be a .tsv file in the input folder named **cardsTabDelim.tsv**

This tab-separated data source must have the following columns:
* **Topic** : Lens name of the card
* **Color** : Color of Lens name and number/suit
* **Text** : Question text of card
* **BackgroundColor** : background color for card
* **qTextColor** : color for the question text
* **footerColor** : color for the footer text
* **NumDisp** : number for the card
* **SymDisp** : suit symbol for the card

# Problem Card Usage
---

Coming soon
