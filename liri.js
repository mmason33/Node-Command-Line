//https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2

var keys = require('./keys.js');
var twitter = require("twitter");
// var request = require("request");

// console.log(api);


  var client = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
  });
  var twitterUsername = process.argv[3];
  if(!twitterUsername){
    twitterUsername = "FirstTake";
  }
  params = {screen_name: twitterUsername};
  client.get("statuses/user_timeline/", params, function(error, data, response){

    // console.log(response);

    if (!error) {
      for(var i = 0; i < data.length; i++) {
        //console.log(response); // Show the full response in the terminal
        var twitterResults =
        "@" + data[i].user.screen_name + ": " +
        data[i].text + "\r\n" +
        data[i].created_at + "\r\n" +
        "------------------------------ " + i + " ------------------------------" + "\r\n";
        console.log(twitterResults);
        //log(twitterResults); // calling log function
      }
    }  else {
      console.log("Error :"+ error);
      return;
    }
  });
