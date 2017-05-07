$(document).ready(function() {

    var train = "";
    var dest = "";
    var first = 12;
    var freq = 12;

    var config = {
        apiKey: "AIzaSyDmOGo8GUa6bBKKaYfQ8DY_HmXmKqarAKw",
        authDomain: "train-app-12176.firebaseapp.com",
        databaseURL: "https://train-app-12176.firebaseio.com",
        projectId: "train-app-12176",
        storageBucket: "train-app-12176.appspot.com",
        messagingSenderId: "765977761828"
    };
    firebase.initializeApp(config);

    var db = firebase.database();

    // 2. Button for adding train schedules
    $("#dd-train-btn").on("click", function(e) {
        e.preventDefault();
        console.log('inside submit click');

        // Grabs user input
        train = $("#train-name-input").val().trim();
        dest = $("#destination-input").val().trim();
        first = moment($("#first-train-input").val().trim(), "DD/MM/YY").format("X");
        freq = $("#freq-input").val().trim();

        // Creates local "temporary" object for holding train data
        var newTrain = {
            train: train,
            destination: dest,
            firstTrain: first,
            frequency: freq
        };
        // Uploads train data to the database
        db.ref().push(newTrain);
        // Logs everything to console
        console.log(newTrain.train);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrain);
        console.log(newTrain.frequency);
        // Alert
        alert("New train successfully added");
        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#freq-input").val("");
    });

    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    db.ref().on("child_added", function(childSnapshot) {
        var snap = childSnapshot.val()

        // Store everything into a variable.
        var train = snap.train;
        var destination = snap.destination;
        var firstTime = snap.firstTrain;
        var frequency = snap.frequency;
        
        // console.log(train);
        // console.log(destination);
        // console.log(first);
        // console.log(frequency);

        // Get current time
        var currentTime = moment().format("HH:mm");
        console.log(currentTime);

        // Calculate minutes away
        var modResult = ((currentTime - firstTime) % frequency);
        console.log(modResult);
        var minsAway = (frequency - modResult)
        console.log(minsAway);

        // Calculate time of arrival
        var nextArrival = (currentTime + minsAway);

        // Add each train's data into the table
        $("#train-table > tbody").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minsAway);
    });
});