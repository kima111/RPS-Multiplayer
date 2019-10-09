var config = {
    apiKey: "AIzaSyBNUfzY5_Z1cX7RLttXQSC78NZo6s8lfrM",
    authDomain: "rps-game-50d40.firebaseapp.com",
    databaseURL: "https://rps-game-50d40.firebaseio.com",
    projectId: "rps-game-50d40",
    storageBucket: "",
    messagingSenderId: "451936433031",
    appId: "1:451936433031:web:308fa9c927c15f458d5922"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

var players = 0;

var computerChoices = ["r", "p", "s"];

var wins = 0;
var losses = 0;
var ties = 0;

var directionsText = document.getElementById("directions-text");
var userChoiceText = document.getElementById("userchoice-text");
var computerChoiceText = document.getElementById("computerchoice-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var tiesText = document.getElementById("ties-text");
$(document).on("click", "#login-button", function (event){
  event.preventDefault();
  $("#startGameOptions").attr("hidden", false);
})
$(document).on("click", "#start-button", function (event){
  event.preventDefault();
  $("#enterGame").attr("hidden", false);
})
$(document).on("click", "#create-button", function (event){
  event.preventDefault();
  $("#weapons").attr("hidden", false);
  $("#chatBox").attr("hidden", false);
})

$("#sendMessage").on("click", function (event) {
    event.preventDefault();

    var textMessage = $("#textMessage").val().trim();
    var userName = $("#userName").val().trim();
    console.log("?")
    database.ref().push({
      user: userName,
      message: textMessage
    });
  
});


$("#rock-button").on("click", function (event) {

    var userGuess = "r";

    var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
    
    if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {

      database.ref().set({
        player1Hand: userGuess
      });

      if ((userGuess === "r" && computerGuess === "s") ||
        (userGuess === "s" && computerGuess === "p") || 
        (userGuess === "p" && computerGuess === "r")) {
        wins++;
      } else if (userGuess === computerGuess) {
        ties++;
      } else {
        losses++;
      }
      directionsText.textContent = "";
      userChoiceText.textContent = "You chose: " + userGuess;
      computerChoiceText.textContent = "The computer chose: " + computerGuess;
      winsText.textContent = "wins: " + wins;
      lossesText.textContent = "losses: " + losses;
      tiesText.textContent = "ties: " + ties;
    }
});
database.ref().on("child_added", function(snapshot) {
  textMessages = snapshot.val();
  $("#messages").prepend("<br>" + textMessages.user + " says: " + textMessages.message + "<br>");
   
});