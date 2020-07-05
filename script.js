
// Game data Objects
var portal2 = {name: "Portal 2", rawgId: "portal-2", gsName: "Portal_2", gsId: "70564", gsRevId: "6309133"};
var pathOfExile = {name: "Path of Exile", rawgId: "path-of-exile", gsName: "Path_of_Exile", gsId: "82647", gsRevId: "6415531"};
var warframe = {name: "Warframe", rawgId: "warframe", gsName: "Warframe", gsId: "145693", gsRevId: "6417233"};
var codWarzone = {name: "Call of Duty: Warzone", rawgId: "call-of-duty-warzone", gsName: "Call_of_Duty_Warzone", gsId: "509303", gsRevId: "6417433"};
var fifa20 = {name: "FIFA 20", rawgId: "fifa-20", gsName: "FIFA_20", gsId: "497540", gsRevId: "6417313"};

// Array of game data objects
var games = [portal2, pathOfExile, warframe, codWarzone, fifa20];

const searchInput = document.getElementById("txtInputSearch");
const list = document.getElementById("list");

console.log(games);

function setList(group) {
  clearList();
  for (const person of group) {
    const item = document.createElement("li");
    item.classList.add("list-group-item");
    const text = document.createTextNode(person.name);
    item.appendChild(text);
    list.appendChild(item);
  }
  if (group.length === 0) {
    setNoResults();
  }
}   

function clearList() {
 while (list.firstChild) {
   list.removeChild(list.firstChild);
 }
}

function setNoResults() {
  const item = document.createElement("li");
  item.classList.add("list-group-item");
  const text = document.createTextNode('No results found');
  item.appendChild(text);
  list.appendChild(item);
}

function getRelevancy(value, searchTerm) {
  if (value === searchTerm) {
    return 2;
  } else if (value.startsWith(searchTerm)) {
    return 1;
  } else if (value.includes(searchTerm)) {
    return 0;
  } else {
    return -1;
  }
}

searchInput.addEventListener("keyup", (event) => {

  let value = event.target.value;
    if (value && value.trim().length > 0) {

      value = value.trim().toLowerCase();
      setList(games.filter(person => {
        return person.name.toLocaleLowerCase().includes(value);
      }).sort((personA, personB) => {
        return getRelevancy(personB.name, value) - getRelevancy(personA.name, value);
      }));
    } else {
      clearList();
    }
})

// Click listener on buttons with class "game-btn"
$(document).on("click", ".btn", displayGame);

// Call renderButtons function when page first loads
renderButtons();

// Create button list
function renderButtons(){
  $("#buttons").empty();
  for (var i = 0; i < games.length; i++) {
    var a = $("<button>");
    a.addClass("btn btn-secondary");
    a.attr("index", i);
    a.text(games[i].name);
    $("#buttons").append(a);
  }
}

// Populate the page with the game's information
function displayGame () {
  var game = games[$(this).attr("index")];
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

    $("#lblGameName").text(game.name)

    // Variables
    var description = response.description;
    var rawDescription = response.description_raw;
    $("#txtGameDescription").empty()
    $("#txtGameDescription").append(description);

    var bgImg = response.background_image;
    $("#game-img").attr("src", bgImg);
    
    var bgImgAdditional = response.background_image_additional;
    $(".container").css("background-image", "url(" + bgImgAdditional + ")");

    var metaCritic = response.metacritic;
    $("#txtMetacric").text(metaCritic);

    var releasedOn = response.released; 
    var dev = response.developers[0].name;
    var redditUrl = response.reddit_url;
    var redditLogo = response.reddit_logo;
    var website = response.website;
    // console.log(metaCritic, releasedOn, dev, redditUrl, website);
  });
}

// GAMESPOT function
function GAMESPOT(game){
  var qryURL = {
    "url" : "https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/games/?api_key=39fbbff7ecbdf13274d9b4c9363a3c7cf7bb0a0f&format=json&filter=id:" + game.gsId,
    "async": true,
    "crossDomain" : true,
    "method" : "GET"
  }

  // Images
  $.ajax(qryURL).done(function(response){
    console.log(response);
    // Variables
    var imgOriginal = response.results[0].image.original;
    var imgScreenTiny = response.results[0].image.screen_tiny;
    var imgSquareSmall = response.results[0].image.square_small;
    var imgSquareTiny = response.results[0].image.square_tiny;
  
    // $("#game-img").attr("src", imgOriginal);
  });
}

// GAMESPOT review function
function GAMESPOTRev(game){
  var qryURL = {
    "url" : "https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/reviews/?api_key=39fbbff7ecbdf13274d9b4c9363a3c7cf7bb0a0f&format=json&filter=id:" + game.gsRevId,
    "async": true,
    "crossDomain" : true,
    "method" : "GET"
  }

  $.ajax(qryURL).done(function(response){
    console.log(response);
    var goodReview = response.results[0].good;
    var badReview = response.results[0].bad;
    var gsScore = response.results[0].score;
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
    "url" : "https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v0001/?format=xml&appid=17740&count=1&name[0]=global.map.emp_isle",
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