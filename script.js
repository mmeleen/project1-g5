var games = [];

function displayGame () {
  //
}


// rawg
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://rawg-video-games-database.p.rapidapi.com/games/portal-2",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
		"x-rapidapi-key": "d8e704ee72mshb537bc24e359d1ep1f897ejsnd07453432fd2"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);

});

// GameSpot game
var gameSpot = {
  "url" : "https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/games/?api_key=39fbbff7ecbdf13274d9b4c9363a3c7cf7bb0a0f&filter=name:Portal_2",
  "async": true,
  "crossDomain" : true,
  "method" : "GET"
}

$.ajax(gameSpot).done(function(gSpotResp)
{console.log(gSpotResp)});

// GameSpot review
var gameRev = {
  "url" : "https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/reviews/?api_key=39fbbff7ecbdf13274d9b4c9363a3c7cf7bb0a0f&filter=game:70564",
  "async": true,
  "crossDomain" : true,
  "method" : "GET"
}

$.ajax(gameRev).done(function(gRevResp)
{console.log(gRevResp)

});

// Steam
var steamStat = {
  "url" :"https://cors-anywhere.herokuapp.com/steamspy.com/api.php?request=appdetails&appid=620",
  //"url" : "https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v0001/?format=xml&appid=17740&count=1&name[0]=global.map.emp_isle",
  "async": true,
  "crossDomain" : true,
  "method" : "GET"
}

$.ajax(steamStat).done(function(steamInfo)
{console.log(steamInfo)

}

);


$("#search-btn").on("click", function(event) {
  event.preventDefault();
  // Grab game input
  var game = $("#game-input").val().trim();
  // Add game to search history array
  games.push(game);
  // Display retrieved info 
  displayGame();
});