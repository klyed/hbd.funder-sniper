//Remember to install NodeJS and run 'npm install' to install dependencies
//hbd.funder-sniper v0.0.3 - coded by @KLYE - PeakD.com/@klye - github.com/klyed

//This applet is intended to help users automate their votes on the 10 daily comments of the @hbd.funder account
//It will automatically detect the target account has created a comment and set a vote to go off on a delay
//With the @hbd.funder account creating 10 comments a day that recieve heavy upvotes, this is a great way to earn curation rewards
//You may also use this code to monitor for comments from multiple accounts and upvote said comments

//NOTE: This code is overly commented in order to help non-tech types to understand what is going on and why
//This applet is an evolution of a downvote / blockchain warfare script I wrote back in the Steem era
//While it does serve it's purpose, it's not terribly well optimized nor 100% stable at times, keep that in mind

//Lets declare the required dependencies for the applet below...
const io = require('@pm2/io')

io.init({
  transactions: true, // will enable the transaction tracing
  http: true // will enable metrics about the http server (optional)
})
//used to monitor and interact with the HIVE blockchain
var hivejs = require("@hiveio/hive-js");
//used to generate timestamps
var dateTime = require('node-datetime');
//used to allow for .env config file to hold username / keys
const dotenv = require('dotenv');
//create a date to display on startup
var dt = dateTime.create();

//bring the .env config file holding users account and private posting key
dotenv.config();

//fetch the deploying users account name
var hero = process.env.HERO;
//fetch the deploying users private posting key
var herowifkey = process.env.HERO_WIF_KEY;

// ***IMPORTANT*** enter target accounts here you wish to monitor for comments (No @)
//(feel free to remove the klye entry, the script is set up by default to vote a 1% weight on my posts / comments. Mainly to help me see who is using this)
var targetaccts = ["hbd.funder", "klye"];

//declare some basic counting variables and specify the starting index of the HIVE API nodes
var totalblocks = 0;
var totalvote = 0;
var pendingvote = 0;
var totalcomment = 0;
var totalops = 0;
var apiindex = 1;
var opgrab;
var voteweight = 10000; //10000 equals 100% vote strength

//declare the amount of time in milliseconds to delay your vote after comment is detected
var votedelay = 295000; //300000 milliseconds is 5 minutes

//a list of public RPC nodes used to monitor and broadcast to HIVE
const apinodes = ["hived.privex.io", "api.hivekings.com", "api.deathwing.me", "api.hive.blog", "api.openhive.network", "hive.loelandp.nl", "hive-api.arcange.eu", "rpc.ausbit.dev", "anyx.io"];

//set hivekings.com as our HIVE API node
hivejs.api.setOptions({ url: "https://api.hivekings.com" });

//create a function that can cycle between different HIVE API nodes when function called
async function changenode() {
  if (apiindex < apinodes.length){//if the apiindex variable is less than the length of the API node list
    //increase the apiindex variable by 1
    apiindex++;
  } else if (apiindex == apinodes.length) {//if apiindex is at the end of the list
    //reset the apiindex variable back to the beginning of the list
    apiindex = 0;
  }//END else if (apiindex == apinodes.length)
  //update the HIVE API node we are using
  //show that the HIVE API node has been changed
  console.log(`CHAIN: Changed API Node to ${apinodes[apiindex]}`);
  return hivejs.api.setOptions({url:`https://${apinodes[apiindex]}`});
};//END async function changenode()

  //get the current date to display at start
  var starttime = dt.format('Y-m-d H:M:S');

  //display what this applet is and who made it
  console.log("HBD.Funder Post Sniper v0.0.4 - By @KLYE");
  //display the start time of the applet
  console.log("Start Time: " + starttime + "\n");

  //define a function variable used to check if a comment operation is from our target
  var process_comment = function(op) {
    //check if the comment operation author is our target account
    if (targetaccts.includes(op["author"])) {
      //increase the pendingvote variable by 1
      pendingvote++;
      //checks to see if the author is KLYE
      if(op["author"] == "klye") {
        //display that a comment from the targetr account has been detected
        console.log(`--KLYE COMMENT - Deploying a 0.01% Vote Now ----`);
        //if it is KLYE. Set vote strength to .01%
        voteweight = 1;
          //increase the totalvote variable by 1
          totalvote++
          //decrease the pendingvote variable by 1
          pendingvote--;
          //broadcast a vote on the comment detected
          hivejs.broadcast.vote(herowifkey, hero, op["author"], op["permlink"], voteweight, function(err, result) { //10000 is 100% vote power
            //display the outcome of the vote on the comment
            console.log(err, result);
          });//END hivejs.broadcast.vote
      } else { //else if it's not KLYE
        //display that a comment from the targetr account has been detected
        console.log(`--HBD.FUNDER COMMENT - Deploying a 100% Vote in ~${(votedelay / 60000).toFixed(1)} Mins! ----`);
        //set vote strength to 100%
        voteweight = 10000;
        //after a comment operation from the target accounts has been detected, schedule a vote to occur around the "optimal" time
        setTimeout(function(){
          //increase the totalvote variable by 1
          totalvote++
          //decrease the pendingvote variable by 1
          pendingvote--;
          //broadcast a vote on the comment detected
          hivejs.broadcast.vote(herowifkey, hero, op["author"], op["permlink"], voteweight, function(err, result) { //10000 is 100% vote power
            //display the outcome of the vote on the comment
            console.log(err, result);
          });//END hivejs.broadcast.vote
        //set your delay after the comment is detected in milliseconds, defined above in the 'votedelay' variable
        }, votedelay);
      }
    }//END if (op["author"] == asshat)
  };//END var process_comment = function(op)

  //define a function to fetch the specified block number dictated by the hivejs.api.streamBlockNumber function below
  function parseBlock(blockNum) {
    //fetch the block by number and download it's contents and operations
    hivejs.api.getBlock(blockNum, function(err, block) {
      //if the call errors out, show an error message and change node
      if(err){
        console.log(`Error Occured: ${err}`);
        return changenode();
      }//END if(err)
      //if the error isn't null valued, display it in console
      if (err !== null) {
        console.log(err);
      };//END if (err !== null)
      //if we get the block data back
      if(block){
        //iterate through the transactions of the block
        block.transactions.forEach((transaction) => {
          //iterate through the operations within the transactions
          transaction.operations.forEach((op) => {
            //increase the totalops variable by 1
            totalops++;
            //grab the type of operation and set the opType variable
            var opType = op[0];
            //check if the operation type is that of a comment
            if (opType == "comment") {
              //use data of the operation in question into the 'opgrab' variable
              opgrab = op[1];
              //send the data recently specified to the previously declared process_comment function
              process_comment(opgrab);
            };//END if (opType == "comment")
          });//END transaction.operations.forEach((op)
        });//END block.transactions.forEach((transaction)
      };//END if(block)
    });//END hivejs.api.getBlock(blockNum, function(err, block)
  };//END function parseBlock(blockNum)

  //stream the latest block number on HIVE network
  hivejs.api.streamBlockNumber(async function(err1, newestblock) {
    //if the stream fails for some reason or errors, change the HIVE API node in use
    if(err1) changenode();
    //if the newest block integer is returned, send this number to the parseBlock function above to parse it's contents
    if(newestblock) await parseBlock(newestblock);
    //increase the totalblocks variable by 1
    totalblocks++
    //print out the stats on what block we're on, how many blocks and operations we've parsed and also display how many pending and completed votes exist
    console.log(`Target(s): ${targetaccts} - #${newestblock} - Blocks Monitored: ${totalblocks} - Operations: ${totalops} - Pending: ${pendingvote} - Completed: ${totalvote}`);
    //move the console cursor back to the start to avoid writing more lines than necesarry
  });//END hivejs.api.streamBlockNumber(async function(err1, newestblock)
