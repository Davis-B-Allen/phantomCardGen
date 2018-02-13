# Requirements
---

Install PhantomJS:

[go here and click on the Download Button](http://phantomjs.org/)

# Usage
---

To generate question cards, run the following at the command line:
```
phantomjs cardgen.js [options]
```
or with [Windows Command Prompt](https://www.howtogeek.com/235101/10-ways-to-open-the-command-prompt-in-windows-10/):
```
phantomjs.exe cardgen.js [options]
```
Note: remember to [add phantomjs to your PATH](https://www.java.com/en/download/help/path.xml)

## Parameters and default location for required files:

After specifying the phantomjs script, you may include the following options:
* `--tsvdetails <tsv>`
  * `<tsv>` should be a tsv file with your source data for card details
  * provide either a full path or a filename
  * if only a filename is provided, it will look for the file within the **input** folder
  * if this option is not used, the script will look by default for a file named **Q8Me_details.tsv** within the **input/data/q8** folder
* `--tsvcontent <tsv>`
  * `<tsv>` should be a tsv file with your source data for card content
  * provide either a full path or a filename
  * if only a filename is provided, it will look for the file within the **input** folder
  * if this option is not used, the script will look by default for a file named **Q8Me_en.tsv** within the **input/data/q8** folder
* `--localalt <localAltSource>`
  * `<localAltSource>` specifies an alternative source for the card layout
  * provide either a full path or a filename
  * if only a filename is provided, it will look for the file within the **input/html/** folder
  * if this option is not used, the script will look by default for a file named **cardExportTest.html** within the **input/html/** folder
* `--remote <remote>`
  * `<remote>` can accept two values:
    * true
    * a remote url string
  * This specifies an alternative source for the card layout, using a remote URL to fetch the layout
  * If true is passed as the argument, default remote url is: https://ancient-fortress-56378.herokuapp.com/test
  * if you wish to specify a different remote URL, just pass that other remote URL as the argument
* `--bleed <bleed>`
  * `<bleed>` should be true if you wish to include a bleed around the edges of the cards, for printing
  * if this option is not used, the default will export the cards with no bleed, and with rounded edges
* `--topic <topic>`
  * `<topic>` should be the name of the column that contains the topic for each card. Note: case sensitive
  * if this option is not used, the script will look for a column named "DisplayTopic"
* `--text <text>`
  * `<text>` should be the name of the column that contains the text for each card. Note: case sensitive
  * if this option is not used, the script will look for a column named "DisplayText"
* `--outputfolder <outputfolder>`
  * `<outputfolder>` should be the name of a folder to which to write the output. This folder will be made a subfolder of the **output/** folder. If it exists, content within it will be overwritten. If it doesn't exist it will be created
  * if this option is not used, the script will by default write to the **output/** folder.
* `--font <font>`
  * `<font>` should be the font-family value you wish to use. "segoe" is the only custom font included by default in the files in **input/html**
  * example: `--font "Times New Roman"` or `--font "Arial"`
  * if this option is not used, "segoe" will be the default font used

For Example:

```
phantomjs cardgen.js --tsvdetails Q8Me_details.tsv --localalt cardExportTest2.html --bleed true --topic DisplayTopic --font "Times New Roman"
```
or
```
phantomjs.exe cardgen.js --tsvcontent /Users/johnsmith/Q8Me_en.tsv --remote true --text DisplayText --outputfolder q8_zh
```

By default, with no options, the script assumes there will be a .tsv file in the **input** folder named **cardsTabDelim.tsv**. Make sure you place a file so named in that **input** folder (input/cardsTabDelim.tsv). This file should contain all the card data you're intending to generate card images from. You can use the `--tsv` option to specify a different cards data source.

This tab-separated data source must have the following columns:
* **DisplayTopic*** : Lens name of the card
* **Color** : Color of Lens name and number/suit
* **DisplayText**** : Question text of card
* **BackgroundColor** : background color for card
* **qTextColor** : color for the question text
* **footerColor** : color for the footer text
* **NumDisp** : number for the card
* **SymDisp** : suit symbol for the card

\*DisplayTopic can be overridden with the --topic option

\*\*DisplayText can be overridden with the --text option

# Problem Card Usage
---

Coming soon
