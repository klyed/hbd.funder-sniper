# hbd.funder-sniper
A small / light weight NodeJS utility bot capable of monitoring the HIVE blockchain with minimal user input required.\n
Focusing solely on supporting the HBD Stabilizer experiment account hbd.funder daily comments.\n
Upon detection the software will invoke auto voting for them close to the optimal time for maximum curation rewards.\n
By autovoting hbd.funder account not only will you get *thicc* curation rewards, but you'll also help procure developer DAO funding!\n

This is a NodeJS application and thus requires NodeJS installed, as well as an initial "npm install" in the directory it's placed.\n
If you need to download NodeJS, here is a link: https://nodejs.org/en/download/ - download the appropriate version for your Operating System.\n
Once you have that installed and this folder downloaded remember to "npm install" in Powershell, Windows CMD or whatever Bash or Linux distro you like.\n


**CONFIG**

Please put your HIVE account name and private posting key into the .env.example config file then remove the ".example" part at the end:

```
HERO=yourusernamehere
HERO_WIF_KEY=yourpostingprivatekeyhere
```

the final environmental / config file should only be named ".env" and nothing else. Once that is done run the script with "node sniper.js".\n
If you wish to close the program for whatever reason use ctrl+c in your console to halt the application. It saves no data and requires only the ".env" config filled in.\n
\n\n
*Note: A small 1% weight vote is also applied to the developers comments and posts, you can opt out by removing my name from the list. :)*\n
*This is mostly done just so I can see who all is utilizing this script to maximize their curation rewards and not so much for monetary gain*\n


# TL;DR:
Install NodeJS\n
Download this app from github.com/klyed/hbd.funder-sniper\n
Open download location in console and type "npm install"\n
Fill in the ".env" file with your username and private posting key\n
Start the bot up by typing "node sniper.js" in console\n
???\n
Profit\n
