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
var gameTitle = "";
var userName = "";
var userPicked = "";
var opponentPicked = "";

var players = 0;
var userGuess = "";

var joinedGame = false;
var userHasPicked = false;
var opponentHasPicked = false; 

var wins = 0;
var losses = 0;
var ties = 0;
var Owins = 0;
var Olosses = 0;
var Oties = 0;

$(document).on("click", "#login-button", function (event){
  event.preventDefault();
  userName = $("#userName").val().trim();
  $("#login-button").hide();
  $("#userName").hide();
  $("#usernameText").text(userName);
  $("#startGameOptions").attr("hidden", false);
  
})
$(document).on("click", "#start-button", function (event){
  event.preventDefault();
  $("#enterGame").attr("hidden", false);
  $("#startGameOptions").attr("hidden", true);

})
$(document).on("click", "#create-button", function (event){
  event.preventDefault();
  $("#weapons").attr("hidden", false);
  $("#chatBox").attr("hidden", false);
  $("#enterGame").attr("hidden", true);
  joinedGame = false;
  gameTitle = $("#gameName").val().trim();
  database.ref(gameTitle).set({
    gameTitle: gameTitle,
    numberOfPlayers: 1
  });

})

$(document).on("click", "#rock-button", function(event){
  event.preventDefault();
  $(".joinGameButton").attr("hidden", true);
  if(joinedGame == true){
  opponentPicked = "rock"
    database.ref(gameTitle).update({
      opponent_Picked: opponentPicked,
      opponent_has_picked: true
    })
  }
  else{
  userPicked = "rock"
  database.ref(gameTitle).update({
    playerPicked: userPicked,
    player_has_picked: true
  })
  }
  database.ref(gameTitle).on("value", function(snapshot){
    userPicked = snapshot.val().playerPicked;
    opponentPicked = snapshot.val().opponent_Picked;
  })
  
    checkWinner(userPicked, opponentPicked);
    

 
})
$(document).on("click", "#paper-button", function(event){
  event.preventDefault();
  $(".joinGameButton").attr("hidden", true);
  if(joinedGame == true){
    opponentPicked = "paper"
      database.ref(gameTitle).update({
        opponent_Picked: opponentPicked, 
        opponent_has_picked: true
      })
  }
  else{
    userPicked = "paper"
    database.ref(gameTitle).update({
      playerPicked: userPicked,
      player_has_picked: true
    })
  }
  database.ref(gameTitle).on("value", function(snapshot){
    userPicked = snapshot.val().playerPicked;
    opponentPicked = snapshot.val().opponent_Picked;
  })
  
    checkWinner(userPicked, opponentPicked);
   
  
})
$(document).on("click", "#scissors-button", function(event){
  event.preventDefault();
  $(".joinGameButton").attr("hidden", true);
  if(joinedGame == true){
  opponentPicked = "scissors"
    database.ref(gameTitle).update({
      opponent_Picked: opponentPicked, 
      opponent_has_picked: true
    })
  }
  else{
  userPicked = "scissors"
    database.ref(gameTitle).update({
      playerPicked: userPicked,
      player_has_picked: true
    })
  }
  database.ref(gameTitle).on("value", function(snapshot){
    userPicked = snapshot.val().playerPicked;
    opponentPicked = snapshot.val().opponent_Picked;
  })
  
    checkWinner(userPicked, opponentPicked);
 
    
 
})
$(document).on("click", "#join-button", function(event){
  event.preventDefault();
  $("#startGameOptions").attr("hidden", true);
  joinedGame = true;
  database.ref().on("value", function(snapshot){
    snapshot.forEach(function(snapshot){
    if(snapshot.val().numberOfPlayers < 2){
    $("#open-games").append("<button class = 'joinGameButton'>" + snapshot.val().gameTitle + "</button><br><br>");
      console.log(snapshot.val().gameTitle);
    }
    })

  })
  
})
$(document).on("click", ".joinGameButton", function(event){
  $("#weapons").attr("hidden", false);
  $("#chatBox").attr("hidden", false);
  $(".joinGameButton").attr("hidden", true);
  gameTitle = $(this).text();
  database.ref(gameTitle).update({
    numberOfPlayers: 2
  })
})



function checkWinner(userGuess, computerGuess){
  database.ref(gameTitle).once("value", function(snapshot){
    if(snapshot.val().player_has_picked==true && snapshot.val().opponent_has_picked==true){
      
    if(joinedGame == true){
      if ((userGuess == "rock" && computerGuess == "scissors") ||
      (userGuess == "scissors" && computerGuess == "paper") || 
      (userGuess == "paper" && computerGuess == "rock")) {

        wins++;
        Olosses++;
      } else if (userGuess == computerGuess) {
        ties++;
        Oties++;
      } else {
        losses++;
        Owins++;
      }
      database.ref(gameTitle).update({
        userWins: wins,
        opponentWins: Owins,
        userLosses: losses,
        opponentLosses: Olosses,
        userTies: ties,
        opponentTies: Oties
      })
    }
    else{
      if ((userGuess == "rock" && computerGuess == "scissors") ||
      (userGuess == "scissors" && computerGuess == "paper") || 
      (userGuess == "paper" && computerGuess == "rock")) {
        wins++;
        Olosses++;
       
      } else if (userGuess == computerGuess) {
        ties++;
        Oties++;
      } else {
        losses++;
        Owins++;
       
      }
      database.ref(gameTitle).update({
        userWins: wins,
        opponentWins: Owins,
        userLosses: losses,
        opponentLosses: Olosses,
        userTies: ties,
        opponentTies: Oties
      })


    }
    
  
      database.ref(gameTitle).on("value", function(snapshot){
      if(joinedGame==true){
        Owins = snapshot.val().opponentWins;
        Olosses = snapshot.val().opponentLosses;
        Oties = snapshot.val().opponentTies;
        $("#wins-text").text(snapshot.val().opponentWins);
        $("#losses-text").text(snapshot.val().opponentLosses);
        $("#ties-text").text(snapshot.val().opponentTies);
      }
      else{
        wins = snapshot.val().userWins;
        losses = snapshot.val().userLosses;
        ties = snapshot.val().userTies;
        $("#wins-text").text(snapshot.val().userWins);
        $("#losses-text").text(snapshot.val().userLosses);
        $("#ties-text").text(snapshot.val().userTies);
      }
      })
      database.ref(gameTitle).update({
        player_has_picked: false,
        opponent_has_picked: false
      })
    }})
  }

// database.child().orderByChild('gameTitle').equalTo('fd').on("value", function(snapshot) {
//   console.log(snapshot.val());
//   snapshot.forEach(function(data) {
//       console.log(data.key);
//   });
// });
// $("#sendMessage").on("click", function (event) {
//     event.preventDefault();

//     var textMessage = $("#textMessage").val().trim();
//     userName = $("#userName").val().trim();
//     console.log("?")
//     database.ref(gameTitle).push({
//       player1: userName,
//       message: textMessage
//     });
  
// });


// $("#rock-button").on("click", function (event) {

//     var userGuess = "r";


        // database.ref(gameTitle).update({
        //   opponent_has_picked: false,
        //   opponent_Picked: "",
        //   player_has_picked: false,
        //   playerPicked: ""
        // })
       

     
    
    //reset 
      // database.ref(gameTitle).update({
      //   opponent_Picked: "",
      //   playerPicked: ""
      // })
      

    

// database.ref().on("child_added", function(snapshot) {
//   textMessages = snapshot.val();
//   $("#messages").prepend("<br>" + textMessages.user + " says: " + textMessages.message + "<br>");
   
// });