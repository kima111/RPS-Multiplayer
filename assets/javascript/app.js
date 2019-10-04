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



$("#click-button").on("click", function (event) {
    event.preventDefault();

    database.ref().set({
        
    });

    database.ref().push({
        
    });

});

database.ref().on("child_added", function(snapshot) {
   
});