
// var gameSlug = ["portal-2", "path-of-exile", "warframe", "call-of-duty-warzone", "fifa-20"];
// var gameSpId = ["Portal_2", "Path_of_Exile", "Warframe", "Call_of_Duty_Warzone", "FIFA_20"];

var portal2 = {name: "Portal 2", rawgId: "portal-2", gsName: "Portal_2", gsId: "6309133"};
var pathOfExile = {name: "Path of Exile", rawgId: "path-of-exile", gsName: "Path_of_Exile", gsId: "6415531"};
var warframe = {name: "Warframe", rawgId: "warframe", gsName: "Warframe", gsId: "6417233"};
var codWarzone = {name: "Call of Duty: Warzone", rawgId: "call-of-duty-warzone", gsName: "Call_of_Duty_Warzone", gsId: "6417433"};
var fifa20 = {name: "FIFA 20", rawgId: "fifa-20", gsName: "FIFA_20", gsId: "6417313"};

var gameData = [portal2, pathOfExile, warframe, codWarzone, fifa20];

// for (i=0; i<5; i++) {
//   console.log(i);
// var settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://rawg-video-games-database.p.rapidapi.com/games/"+gameSlug[i]

function displayGame () {
  var game = gameData[$(this).attr("index")];
  console.log(game);
  getRawg(game);
  getGs(game);
  getGsRev(game);
}


// // rawg
// var settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://rawg-video-games-database.p.rapidapi.com/games/portal-2",

// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
// 		"x-rapidapi-key": "d8e704ee72mshb537bc24e359d1ep1f897ejsnd07453432fd2"
// 	}
  
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
//   console.log(i);
//   var metaCritic=response.metacritic;
//   var releasedOn=response.released;
//   var redditUrl=response.reddit_url;
//   var bgrndImg=response.background_image;
  
//   console.log(metaCritic);

 
// });

// var gameSpot = {
//   "url" : "https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/games/?api_key=39fbbff7ecbdf13274d9b4c9363a3c7cf7bb0a0f&filter=name:"+gameSpId[0]+"&format=json",

// }

// $.ajax(settings).done(function (response) {
// 	console.log(response);

// });

// // GameSpot game
// var gameSpot = {
//   "url" : "https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/games/?api_key=39fbbff7ecbdf13274d9b4c9363a3c7cf7bb0a0f&filter=name:Portal_2",

//   "async": true,
//   "crossDomain" : true,
//   "method" : "GET"
// }

// $.ajax(gameSpot).done(function(gSpotResp)

// {console.log(gSpotResp);
// var imgCode = gSpotResp.results[0].image.square_tiny;
// console.log(imgCode);
// $('#vicon1').attr('src',imgCode);
// $('#vicon1').css('visibility', 'visible');

// });

// // GameSpot review

// var gameRev = {
//   // "url" : "https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/reviews/?api_key=39fbbff7ecbdf13274d9b4c9363a3c7cf7bb0a0f&filter=game:70564",
//   "url" : "https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/reviews/?api_key=39fbbff7ecbdf13274d9b4c9363a3c7cf7bb0a0f&format=json&filter=id:6309133",
//   "async": true,
//   "crossDomain" : true,
//   "method" : "GET"
// }

//   https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/reviews/?api_key=39fbbff7ecbdf13274d9b4c9363a3c7cf7bb0a0f&format=json&filter=id:6309133",
//   // "url" : "https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/reviews/?api_key=39fbbff7ecbdf13274d9b4c9363a3c7cf7bb0a0f&format=json&filter=id:" + __reviewID

// $.ajax(gameRev).done(function(gRevResp)
// {console.log(gRevResp)

// });

// // var steamStat = {
// //   //"url" :"https://cors-anywhere.herokuapp.com/steamspy.com/api.php?request=appdetails&appid=620",
// //   "url" : "https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v0001/?format=xml&appid=17740&count=1&name[0]=global.map.emp_isle",
// //   "async": true,
// //   "crossDomain" : true,
// //   "method" : "GET"
// // }

// // $.ajax(steamStat).done(function(steamInfo)
// // {console.log(steamInfo)

// // }

// ;



   
  

//     ;
// // ---------------------------------------------------------

// // Steam
// var steamStat = {
//   "url" :"https://cors-anywhere.herokuapp.com/steamspy.com/api.php?request=appdetails&appid=620",
//   //"url" : "https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v0001/?format=xml&appid=17740&count=1&name[0]=global.map.emp_isle",
//   "async": true,
//   "crossDomain" : true,
//   "method" : "GET"
// }

// $.ajax(steamStat).done(function(steamInfo)
// {console.log(steamInfo)

// }

// );

function renderButtons() {

  
  $("#buttons-div").empty();
  for (var i = 0; i < gameData.length; i++) {
    var a = $("<button>");
    a.addClass("game-btn btn");
    a.attr("index", i);
    a.text(gameData[i].name);
    $("#buttons-div").append(a);
  }
}

$(document).on("click", ".game-btn", displayGame);

renderButtons();

// $("#search-btn").on("click", function(event) {
//   event.preventDefault();
//   // Grab game input
//   var game = $("#game-input").val().trim();
//   // Add game to search history array
//   games.push(game);
//   // Display retrieved info 
//   displayGame();
// });
