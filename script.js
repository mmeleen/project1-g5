
// Game data Objects
var portal2 = {name: "Portal 2", rawgId: "portal-2", gsName: "Portal_2", gsId: "70564", gsRevId: "6309133"};
var pathOfExile = {name: "Path of Exile", rawgId: "path-of-exile", gsName: "Path_of_Exile", gsId: "82647", gsRevId: "6415531"};
var warframe = {name: "Warframe", rawgId: "warframe", gsName: "Warframe", gsId: "145693", gsRevId: "6417233"};
var codWarzone = {name: "Call of Duty: Warzone", rawgId: "call-of-duty-warzone", gsName: "Call_of_Duty_Warzone", gsId: "509303", gsRevId: "6417433"};
var fifa20 = {name: "FIFA 20", rawgId: "fifa-20", gsName: "FIFA_20", gsId: "497540", gsRevId: "6417313"};

// Array of game data objects
var games = [portal2, pathOfExile, warframe, codWarzone, fifa20];
var currentIndex = localStorage.getItem("current") || 0;
console.log(games[currentIndex]);

// const searchInput = document.getElementById("txtInputSearch");
// const list = document.getElementById("btn-list");

console.log(games);

// function setList(group) {
//   clearList();
//   for (const person of group) {
//     const item = document.createElement("li");
//     item.classList.add("list-group-item");
//     const text = document.createTextNode(person.name);
//     item.appendChild(text);
//     list.appendChild(item);
//   }
//   if (group.length === 0) {
//     setNoResults();
//   }
// }   

// function clearList() {
//  while (list.firstChild) {
//    list.removeChild(list.firstChild);
//  }
// }

// function setNoResults() {
//   const item = document.createElement("li");
//   item.classList.add("list-group-item");
//   const text = document.createTextNode('No results found');
//   item.appendChild(text);
//   list.appendChild(item);
// }

// function getRelevancy(value, searchTerm) {
//   if (value === searchTerm) {
//     return 2;
//   } else if (value.startsWith(searchTerm)) {
//     return 1;
//   } else if (value.includes(searchTerm)) {
//     return 0;
//   } else {
//     return -1;
//   }
// }

// searchInput.addEventListener("keyup", (event) => {

//   let value = event.target.value;
//     if (value && value.trim().length > 0) {

//       value = value.trim().toLowerCase();
//       setList(games.filter(person => {
//         return person.name.toLocaleLowerCase().includes(value);
//       }).sort((personA, personB) => {
//         return getRelevancy(personB.name, value) - getRelevancy(personA.name, value);
//       }));
//     } else {
//       clearList();
//     }
// })

// Click listener on buttons with class "game-btn"
$(document).on("click", ".btn", displayGame);

// Call renderButtons function when page first loads
renderButtons();
displayFirstGame();


// Create button list
function renderButtons(){
  $("#buttons").empty();
  for (var i = 0; i < games.length; i++) {
    var a = $("<button>");
    a.addClass("btn btn-secondary m-2");
    a.attr("index", i);
    a.text(games[i].name);
    $("#buttons").append(a);
  }
}

function displayFirstGame(){
  var game = games[currentIndex];
  RAWG(game);
  GAMESPOT(game);
  GAMESPOTRev(game);
}

// Populate the page with the game's information
function displayGame () {
  var index = $(this).attr("index");
  var game = games[index];
  currentIndex = localStorage.setItem("current", index);
  console.log(currentIndex);
  console.log(game);
  
  RAWG(game);
  GAMESPOT(game);
  GAMESPOTRev(game);
  // STEAMSTAT(game);
}

// RAWG function
function RAWG(game) {
  var qryURL = {
    "async": true,
    "crossDomain": true,
    "url": "https://rawg-video-games-database.p.rapidapi.com/games/" + game.rawgId,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
      "x-rapidapi-key": "d8e704ee72mshb537bc24e359d1ep1f897ejsnd07453432fd2"
    }
  };
  
  $.ajax(qryURL).done(function(response) {
    console.log(response);

    $("#lblGameDescription").text(game.name + " - Game Description")

    // Variables
    var description = response.description;
    var rawDescription = response.description_raw;
    $("#txtGameDescription").empty()
    $("#txtGameDescription").append(description);

    var bgImg = response.background_image;
    //$("#game-img").attr("src", bgImg);
    
    var bgImgAdditional = response.background_image_additional;
    $(".container").css("background-image", "url(" + bgImgAdditional + ")");

    var metaCritic = response.metacritic;
    $("#lblMeta").text("Metacritic Score: " + metaCritic);
    if (metaCritic < 60){
      $("#meta-card").css("background-color", "red");
    } else if (60 <= metaCritic && metaCritic < 80) {
      $("#meta-card").css("background-color", "yellow");
    } else {
      $("#meta-card").css("background-color", "green");
    }

    var releasedOn = response.released;
    $("#lblRel").text("Released: " + releasedOn); 
    var dev = response.developers[0].name;
    $("#lblDev").text("Developer: " + dev);
    var redditUrl = response.reddit_url;
    var redditLogo = response.reddit_logo;
    var site = response.website;
    $("#lblWeb").text(site);
    $("#lblWeb").attr("href", site);
    $("#lblWeb").attr("target", "_blank");

    console.log(site);
    // console.log(metaCritic, releasedOn, dev, redditUrl, website);
  });
}

// GAMESPOT function
function GAMESPOT(game){
  var qryURL = {
    "url" : "https://cors-any-m.herokuapp.com/www.gamespot.com/api/games/?api_key=39fbbff7ecbdf13274d9b4c9363a3c7cf7bb0a0f&format=json&filter=id:" + game.gsId,
    "async": true,
    "crossDomain" : true,
    "method" : "GET"
  }

  // Images
  $.ajax(qryURL).done(function(response){
    console.log(response);
    // Variables
    var imgOriginal = response.results[0].image.original;
    //$("#game-img").attr("src", imgOriginal);
    var imgScreenTiny = response.results[0].image.screen_tiny;
    var imgSquareSmall = response.results[0].image.square_small;
    $("#game-img").attr("src", imgSquareSmall);

    var imgSquareTiny = response.results[0].image.square_tiny;
  
    // $("#game-img").attr("src", imgOriginal);
  });
}

// GAMESPOT review function
function GAMESPOTRev(game){
  var qryURL = {
    "url" : "https://cors-any-m.herokuapp.com/www.gamespot.com/api/reviews/?api_key=39fbbff7ecbdf13274d9b4c9363a3c7cf7bb0a0f&format=json&filter=id:" + game.gsRevId,
    "async": true,
    "crossDomain" : true,
    "method" : "GET"
  }

  $.ajax(qryURL).done(function(response){
    console.log(response);
    var goodReview = response.results[0].good;
    var goodArray = goodReview.split("|");
    console.log(goodArray);
    $("#list-good").empty();
    $("#list-bad").empty();
    for (var i = 0; i < goodArray.length; i++) {
      var a = $("<li>");
      a.addClass("list-group-item");
      a.text(goodArray[i]);
      $("#list-good").append(a);
    }
    var badReview = response.results[0].bad;
    var badArray = badReview.split("|");
    console.log(badArray);
    for (var i = 0; i < badArray.length; i++) {
      var a = $("<li>");
      a.addClass("list-group-item");
      a.text(badArray[i]);
      $("#list-bad").append(a);
    }
    var gsScore = response.results[0].score;
    $("#lblGScore").text("GameSpot Rating: " + gsScore);
    if (gsScore < 6){
      $("#gscore-card").css("background-color", "red");
    } else if (6 <= gsScore && gsScore < 8) {
      $("#gscore-card").css("background-color", "yellow");
    } else {
      $("#gscore-card").css("background-color", "green");
    }
    $("#txtGoodReview").text(goodReview);
    $("#txtBadReview").text(badReview);
     console.log(goodReview);
    // console.log(revBad);
     console.log(gsScore);
  });
}

// DONT REALLY KNOW WHAT ITS USED FOR
function STEAMSTAT() {
  // Steam (Not currently in use)
  var qryURL = {
    //"url": "https://cors-anywhere.herokuapp.com/steamspy.com/api.php?request=appdetails&appid=620",
    "url" : "https://cors-any-m.herokuapp.com/api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v0001/?format=xml&appid=17740&count=1&name[0]=global.map.emp_isle",
    "async": true,
    "crossDomain": true,
    "method": "GET"
  }

  $.ajax(qryURL).done(function (steamInfo) {
    console.log(steamInfo)
  });
}


//-----------------TEST AREA-------------------------------------
function updateQuery(APIData) {
  console.log(APIData);  
}

runAPICall()
function runAPICall() {
  $.ajax({
    url: "https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-added&page_size=400",
    method: "GET"
  }).then(updateQuery);
}