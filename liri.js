//https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2

var keys = require('./keys.js');
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

//creat logic for the process.argv[index] params when calling these function in command line
// create a switch statement for the process.argv[index]

function tweets() {
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
    if (!error) {
      for(var i = 0; i < data.length; i++) {
        //console.log(response);
        var twitterResults =
        "@" + data[i].user.screen_name + ": " +
        data[i].text + "\r\n" +
        data[i].created_at + "\r\n" +
        "------------------------------ " + i + " ------------------------------" + "\r\n";
        console.log(twitterResults);
        //log(twitterResults);
      }
    }  else {
      console.log("Error :"+ error);
      return;
    }
  });
}

function spotify() {

  var spotify = new Spotify({
    id: keys.spotifyKey.client_id,
    secret: keys.spotifyKey.client_secret,
  });

  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  console.log(data);
  });

}

function omdb() {
  var url = 'http://www.omdbapi.com/?apikey=';
  var defaultTitle = 'Inception';

  request(url + keys.omdbKey + '&t=' + defaultTitle, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body);
  });

}

// omdb();
// spotify();
// tweets();
