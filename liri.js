require("dotenv").config();
var key = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var client = new Twitter(key.twitterKeys)
var liri = process.argv[2];
var media = process.argv[3];
var spotify = new Spotify(key.spotify);
var omdb = require('request')
var params = {screen_name: 'patmayonaisse'};
var fs = require('fs')
switch(liri){
  case 'movie-this':
  film();
  break;
  case 'my-tweets':
  tweets();
  break;
  case 'spotify-this-song':
  spotifymusic();
  break;

}
function film(){

 omdb('http://www.omdbapi.com/?apikey=67ea07c5&'+ media +'&y=&plot=short&r=json', function (error, response, body) {
   if (!error && response.statusCode == 200) {
     var data = [];
     var jsonData = JSON.parse(body);
     console.log(jsonData);
     data.push({
     'Title: ' : jsonData.Title,
     'Year: ' : jsonData.Year,
     'Rated: ' : jsonData.Rated,
     'IMDB Rating: ' : jsonData.imdbRating,
     'Country: ' : jsonData.Country,
     'Language: ' : jsonData.Language,
     'Plot: ' : jsonData.Plot,
     'Actors: ' : jsonData.Actors,
     'Rotten Tomatoes Rating: ' : jsonData.tomatoRating,
     'Rotton Tomatoes URL: ' : jsonData.tomatoURL,
 });
     console.log(data);



   }

 });
}
function tweets(){
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {

      for (var i =0; i<tweets.length; i++){
        console.log(tweets[i].text);
      }

    }

  });
}
function  spotifymusic(){
  fs.appendFile('random.txt' , ", " + media );
  spotify.search({ type: 'track', query: media }, function(err, data){
   console.log(data.tracks.items[0].artists[0]);
   console.log(data.tracks.items[0].name);
   console.log(data.tracks.items[0].album.name);
    console.log(data.tracks.items[0].preview_url);

 });
}
