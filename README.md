# hbd.funder-sniper
A small / light weight NodeJS utility bot capable of monitoring the HIVE blockchain with minimal user input required.

Focusing solely on supporting the HBD Stabilizer experiment account hbd.funder daily comments.

Upon detection the software will invoke auto voting for them close to the optimal time for maximum curation rewards.

By autovoting hbd.funder account not only will you get *thicc* curation rewards, but you'll also help procure developer DAO funding!


This is a NodeJS application and thus requires NodeJS installed, as well as an initial "npm install" in the directory it's placed.

If you need to download NodeJS, here is a link: https://nodejs.org/en/download/ - download the appropriate version for your Operating System.

Once you have that installed and this folder downloaded remember to "npm install" in Powershell, Windows CMD or whatever Bash or Linux distro you like.


**CONFIG**

Please put your HIVE account name and private posting key into the .env.example config file then remove the ".example" part at the end:

```
HERO=yourusernamehere
HERO_WIF_KEY=yourpostingprivatekeyhere
```

the final environmental / config file should only be named ".env" and nothing else. Once that is done run the script with "node sniper.js".

If you wish to close the program for whatever reason use ctrl+c in your console to halt the application. It saves no data and requires only the ".env" config filled in.

*Note: A small 1% weight vote is also applied to the developers comments and posts, you can opt out by removing my name from the list. :)*
*This is mostly done just so I can see who all is utilizing this script to maximize their curation rewards and not so much for monetary gain*


# TL;DR:
Install NodeJS

Download this app from github.com/klyed/hbd.funder-sniper

Open download location in console and type "npm install"

Fill in the ".env" file with your username and private posting key

Start the bot up by typing "node sniper.js" in console

???

Profit
