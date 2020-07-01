

var gameSlug = ["portal-2", "path-of-exile", "warframe", "call-of-duty-warzone", "fifa-20"]
var gameSpId = ["Portal_2", "Path_of_Exile", "Warframe", "Call_of_Duty_Warzone", "FIFA_20"]

for (i=0; i<5; i++) {
  console.log(i);
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://rawg-video-games-database.p.rapidapi.com/games/"+gameSlug[i],
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
		"x-rapidapi-key": "d8e704ee72mshb537bc24e359d1ep1f897ejsnd07453432fd2"
	}
  
};

$.ajax(settings).done(function (response) {
	console.log(response);
  console.log(i);
  var metaCritic=response.metacritic;
  var releasedOn=response.released;
  var redditUrl=response.reddit_url;
  var bgrndImg=response.background_image;
  
  console.log(metaCritic);

 
});

}

var gameSpot = {
  "url" : "https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/games/?api_key=39fbbff7ecbdf13274d9b4c9363a3c7cf7bb0a0f&filter=name:"+gameSpId[0]+"&format=json",
  "async": true,
  "crossDomain" : true,
  "method" : "GET"
}

$.ajax(gameSpot).done(function(gSpotResp)
{console.log(gSpotResp);
var imgCode = gSpotResp.results[0].image.square_tiny;
console.log(imgCode);
$('#vicon1').attr('src',imgCode);
$('#vicon1').css('visibility', 'visible');

});

var gameRev = {
  "url" : "https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/reviews/?api_key=39fbbff7ecbdf13274d9b4c9363a3c7cf7bb0a0f&filter=game:70564",
  "async": true,
  "crossDomain" : true,
  "method" : "GET"
}

$.ajax(gameRev).done(function(gRevResp)
{console.log(gRevResp)

});

// var steamStat = {
//   //"url" :"https://cors-anywhere.herokuapp.com/steamspy.com/api.php?request=appdetails&appid=620",
//   "url" : "https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v0001/?format=xml&appid=17740&count=1&name[0]=global.map.emp_isle",
//   "async": true,
//   "crossDomain" : true,
//   "method" : "GET"
// }

// $.ajax(steamStat).done(function(steamInfo)
// {console.log(steamInfo)

// }

;



   
  

    ;
// ---------------------------------------------------------

