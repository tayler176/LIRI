var axios = require("axios");
var moment = require('moment');
moment().format();
require("dotenv").config();
let keys = require("./keys.js")
var Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);




// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line argument to capture the "operand" (add, subtract, multiply, etc) and the numbers
var request = require('request');
var command = inputString[2];
var inputs = inputString[3];

switch (command) {
    case "concert-this":
        concert(inputs);
        break;
    case "spotify-this-song":
        spotifyIt(inputs);
        break;
    case "movie-this":
        movie(inputs);
        break;
    case "do-what-it-says":
        doIt();
        break;
};

function concert(inputs) {
    let concertURL = "https://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp";
    request(concertURL, function (error, response, body) {
        var body = JSON.parse(body);
        if (!inputs) {
            console.log("Next time you should try and enter something...")
        }
        else if (!error && response.statusCode == 200) {
            for (let j = 0; j < 3; j++) {
                console.log("-------------------------------------------");
                console.log(body[j].lineup[0] + " next concert is at ")
                console.log(body[j].venue.name + ", " + body[j].venue.city + " " + body[j].venue.region + ", " + body[j].venue.country)
                var randomDate = body[j].datetime;
                randomDate = randomDate.substring(0, randomDate.indexOf('T'));
                console.log("This concert will be at " + randomDate)
                console.log("-------------------------------------------");
            }
        }
    }
    )
};

function spotifyIt(inputs) {

    //  * If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (!inputs) {
        inputs = "The Fire The Roots";
    }

    spotify.search({ type: 'track', query: inputs }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        else {
            for (i = 0; i < data.tracks.items.length && i < 3; i++) {

                var spotifyThings = data.tracks.items[i];
                console.log("Artist: " + spotifyThings.artists[0].name)
                console.log("Song Name: " + spotifyThings.name)
                console.log("Link to Song: " + spotifyThings.preview_url)
                console.log("Album Name: " + spotifyThings.album.name)
                console.log("-------------------------------------------");
            }
        };
    });
}

function movie(inputs) {
    let queryURL = "https://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=aa2eda48";
    request(queryURL, function (error, response, body) {
        var body = JSON.parse(body);
        if (!inputs) {
            console.log("Next time you should try and enter something...")
        }
        else if (!error && response.statusCode == 200) {
            console.log("you got here")
            console.log("The movie's name is " + body.Title);
            console.log("The movie's came out in " + body.Year);
            console.log("This movie has an IMDB rating of " + body.imdbRating);
            console.log("This movie has an Rotten Tomatoes rating of " + body.Ratings[1].Value);
            console.log("The movie was produced in " + body.Country);
            console.log("This movie is in " + body.Language);
            console.log("This movie's plot is " + body.Plot);
            console.log("This Actors in the movie are " + body.Actor);
        }
    });
};

function doIt() {
    if (!inputs) {
        // inputs = ;
        spotifyIt("I want it That Way");
    }

}
