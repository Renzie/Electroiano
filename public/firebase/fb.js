/**
 * Created by Renzie on 23/12/2017.
 */
    // Initialize Firebase
var config = {
        apiKey: "AIzaSyA89g6eLwe20LL9r2DJGAvu3Dnig1YLniI",
        authDomain: "piano-325b0.firebaseapp.com",
        databaseURL: "https://piano-325b0.firebaseio.com",
        projectId: "piano-325b0",
        storageBucket: "piano-325b0.appspot.com",
        messagingSenderId: "1061538758020"
    };
firebase.initializeApp(config);

var app = firebase.app();
var ref = firebase.app().database().ref();

console.log(app)