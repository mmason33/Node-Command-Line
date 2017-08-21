//https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2

var keys = require('./keys.js');
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var movies = [];
//creat logic for the process.argv[index] params when calling these function in command line
// create a switch statement for the process.argv[index]

switch(process.argv[2]) {
  case 'twitter':
    tweets(process.argv[3]);
    break;
  case 'spotify':
    spotify(process.argv[3]);
    break;
  case 'omdb':
    omdb(process.argv);
    break;
  default:
    console.log('Not a valid command');
}

function tweets(arg) {
    var client = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
  });

  var twitterUsername = arg;
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

function spotify(arg) {

  var spotify = new Spotify({
    id: keys.spotifyKey.client_id,
    secret: keys.spotifyKey.client_secret,
  });

  var defaultSong = 'Straight Outta Compton';
  if (arg !== undefined) {
    defaultSong = arg;
  }
  spotify.search({ type: 'track', query: defaultSong }, function(err, data) {
    if(!err){
      var songInfo = data.tracks.items;
      for (var i = 0; i < 5; i++) {
        if (songInfo[i] != undefined) {
          var spotifyResults =
          "Artist: " + songInfo[i].artists[0].name + "\r\n" +
          "Song: " + songInfo[i].name + "\r\n" +
          "Album the song is from: " + songInfo[i].album.name + "\r\n" +
          "Preview Url: " + songInfo[i].preview_url + "\r\n" +
          "------------------------------ " + i + " ------------------------------" + "\r\n";
          console.log(spotifyResults);
        }
      }
    }	else {
      console.log("Error :"+ err);
      return;
    }

  });

}

function omdb(arg) {
  var url = 'http://www.omdbapi.com/?apikey=';
  var defaultTitle = 'Inception';
  var newTitle = '';
  if (arg !== undefined) {
    for (var i = 3; i < arg.length; i++) {
      newTitle = newTitle + arg[i] + '+';
    }
  }
  defaultTitle = newTitle;
  console.log(defaultTitle);
  request(url + keys.omdbKey + '&t=' + defaultTitle, function (error, response, body) {
    var obj = JSON.parse(body);
    var res =
    "------------------------------ begin ------------------------------" + "\r\n" +
    "Title: " + obj.Title+"\r\n"+
    "Year: " + obj.Year+"\r\n"+
    "Imdb Rating: " + obj.imdbRating+"\r\n"+
    "Country: " + obj.Country+"\r\n"+
    "Language: " + obj.Language+"\r\n"+
    "Plot: " + obj.Plot+"\r\n"+
    "Actors: " + obj.Actors+"\r\n"+
    "Rotten Tomatoes Rating: " + obj.Ratings[1].Value+"\r\n"
    "------------------------------ fin ------------------------------" + "\r\n";
    console.log(res);
  });

}
