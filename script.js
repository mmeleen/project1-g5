
// Game data Objects
var portal2 = {name: "Portal 2", rawgId: "portal-2", gsName: "Portal_2", gsId: "70564", gsRevId: "6309133"};
var pathOfExile = {name: "Path of Exile", rawgId: "path-of-exile", gsName: "Path_of_Exile", gsId: "82647", gsRevId: "6415531"};
var warframe = {name: "Warframe", rawgId: "warframe", gsName: "Warframe", gsId: "145693", gsRevId: "6417233"};
var codWarzone = {name: "Call of Duty: Warzone", rawgId: "call-of-duty-warzone", gsName: "Call_of_Duty_Warzone", gsId: "509303", gsRevId: "6417433"};
var fifa20 = {name: "FIFA 20", rawgId: "fifa-20", gsName: "FIFA_20", gsId: "497540", gsRevId: "6417313"};

// Array of game data objects
var gameData = [portal2, pathOfExile, warframe, codWarzone, fifa20];

// Populate the page with the game's information
function displayGame () {
  var game = gameData[$(this).attr("index")];
  console.log(game);
  getRawg(game);
  getGs(game);
  getGsRev(game);
}


// RAWG function
function getRawg(game) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://rawg-video-games-database.p.rapidapi.com/games/" + game.rawgId,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
      "x-rapidapi-key": "d8e704ee72mshb537bc24e359d1ep1f897ejsnd07453432fd2"
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    // Test variables
    var metaCritic=response.metacritic;
    var releasedOn=response.released;
    var redditUrl=response.reddit_url;
    var bgrndImg=response.background_image;
    console.log(metaCritic,releasedOn,redditUrl,bgrndImg);
  });
}

// GameSpot game function
function getGs(game){
  var gameSpot = {
    "url" : "https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/games/?api_key=39fbbff7ecbdf13274d9b4c9363a3c7cf7bb0a0f&format=json&filter=id:" + game.gsId,
    "async": true,
    "crossDomain" : true,
    "method" : "GET"
  }

  $.ajax(gameSpot).done(function(gsResp){
    console.log(gsResp);
    // Test variables
    var imgCode = gsResp.results[0].image.square_tiny;
    console.log(imgCode);
  });
}

// GameSpot review function
function getGsRev(game){
  var gameRev = {
    "url" : "https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/reviews/?api_key=39fbbff7ecbdf13274d9b4c9363a3c7cf7bb0a0f&format=json&filter=id:" + game.gsRevId,
    "async": true,
    "crossDomain" : true,
    "method" : "GET"
  }

  $.ajax(gameRev).done(function(gsRevResp){
    console.log(gsRevResp)
    // Test variables
    var revGood = gsRevResp.results[0].good;
    console.log(revGood);
    var revBad = gsRevResp.results[0].bad;
    console.log(revBad);
  });
}

// // Steam (Not currently in use)
// var steamStat = {
//   "url" :"https://cors-anywhere.herokuapp.com/steamspy.com/api.php?request=appdetails&appid=620",
//   //"url" : "https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v0001/?format=xml&appid=17740&count=1&name[0]=global.map.emp_isle",
//   "async": true,
//   "crossDomain" : true,
//   "method" : "GET"
// }
// $.ajax(steamStat).done(function(steamInfo){
//  console.log(steamInfo)
// });
// }

// Create button list
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

// Click listener on buttons with class "game-btn"
$(document).on("click", ".game-btn", displayGame);

// Call renderButtons function when page first loads
renderButtons();
