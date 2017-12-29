/*               -- TODO --
 - Songs opnemen van je json object die je maakt -- OK!
 - Cloud platform uitkiezen voor je json objects  -- FireBase (SeemsGood enough) -- OK!
 - Json objects versturen naar je platform -- OK!
 - Json objects verkrijgen van je platform -- OK!
 - Json objects afspelen van je opname -- OK!
 - Song selecteren die je wilt afspelen -- OK!
                 -- TODO --
 */

$(document).ready(function () {
    pianoKey.on('mousedown', PianoUI.prototype.hitKey);
    pianoKey.on("mouseup", PianoUI.prototype.releaseKey)
    $("#submitSong").on('submit', addNewSongToDatabase)
    $("#record").on('click', record.switchActive);
    MqttSettings.init();
    record.rest();
    setSongs();
    $('.modal').modal();
});

// -- Section: Initialize Firebase -- //
var config = {
    apiKey: "AIzaSyA89g6eLwe20LL9r2DJGAvu3Dnig1YLniI",
    authDomain: "piano-325b0.firebaseapp.com",
    databaseURL: "https://piano-325b0.firebaseio.com",
    projectId: "piano-325b0",
    storageBucket: "piano-325b0.appspot.com",
    messagingSenderId: "1061538758020"
};

var app = firebase.initializeApp(config);

var database = app.database();

function FirebaseConfig() { //Read & Write to Firebase Database
    this.writeData = function (name, jsonObject) {
        song = [];
        database.ref('Album').push().set({
            name: name,
            keys: jsonObject
        }).then(function () {
            Materialize.toast('Saved successfully!', 4000);
            setSongs();
            console.log(song)
        })

    };

    this.readData = function () {
        return database.ref('Album').once('value').then(function (data) {
            return data.val();
        }, function (error) {
            console.log(error);
            return error;
        });
    }

    this.removeData = function () {
        var selectedSong = $(this).attr('data-role')
        console.log(selectedSong);
        return database.ref('Album/' + selectedSong).remove().then(function () {
            Materialize.toast('Removed successfully!');
            setSongs();
        })
    }
}

function addNewSongToDatabase(e) { //Write Correct object to db
    e.preventDefault();
    fbConfig.writeData($("#songName").val(), song);
    $("#registerSong").modal('close');
}

function setSongs() { //read and show songs from db
    return fbConfig.readData().then(function (songs) {
        $('#songList').empty();
        songList = [];              //refresh alles
        for (let index in songs) {
            console.log(songs[index])
            songList.push(songs[index]);
            var html = '<li class="collection-item"><div> ' + songs[index].name +
                '<a data-role="' + index + '"  href="#!" class="secondary-content removeSelected"><i class="material-icons">delete</i> </a>' +
                '<a data-role="' + index + '"  href="#!" class="secondary-content playReplay"><i class="material-icons">play_arrow</i> </a></div></li>';
            $("#songList").append(html);
        }
        $(".playReplay").off().on('click', record.playReplay)
        $('.removeSelected').off().on('click', fbConfig.removeData)
    })
}
// -- EndSection: Initialize Firebase -- //


// -- Section: Global Variables -- //

var fbConfig = new FirebaseConfig();
var songList = [];
var time = 0;
var timer = null;
var key = 0;
var song = [];
var pianoKey = $('#piano li, #piano li span');

// -- EndSection: Global Variables -- //


// -- Section: RecordSystem -- //

var record = {
    active: false,

    switchActive: function () {
        record.active = !record.active;
        if (record.active) {
            song = [];
            record.startTimer();
            $("#record").addClass("red")
            $("#record").text('recording...')

        } else {
            record.stopTimer()
            $("#record").removeClass("red")
            $("#record").text('record')
            $("#registerSong").modal('open');
        }
    },
    playReplay: function (e) {
        e.preventDefault();
        var selectedSong = $(this).closest('li').index();
        console.log("song selected : " + selectedSong);
        song = songList[selectedSong];
        console.log(song);
        var i = 0;
        function iterator() {
            client.publish("key", song.keys[i].key);

            if(++i<song.keys.length) {
                setTimeout(iterator, song.keys[i].time * 1000);
            }
        }
        iterator();
    },

    startTimer: (function () {
        if (record.active) {
            timer = setInterval(function () {
                console.log(time)
                time += 0.01
            }, 10);
        }
    }),

    stopTimer: function () {
            song.push({
                key: key,
                time: time
            })
        clearInterval(timer);

        timer = null;
        time = 0;

    },
    rest: function () {

            key = "1";
            this.startTimer();

    }
}

// -- EndSection: RecordSystem -- //


// -- Section: UI Piano -- //

function PianoUI() {
    let piano = $("#piano");
}

PianoUI.prototype.hitKey = function (e) {
    e.stopPropagation();
    var tone = $(this).attr("data-role");
    if (record.active){
        record.stopTimer();

        record.startTimer();
    }
    client.publish("key", tone);
    key = tone;
};

PianoUI.prototype.setKeys = function () {
    var counter = 28;
    var tone = Math.pow(2, 1 / 12);
    var amountKeys = $("#piano li").length;
    $("#piano li").each(function (data) {
        if ($(this).has("span").length) {
            $(this).find("span").attr('data-role', (Math.pow(tone, (++counter) - 49) * 440));
        } else if (!$(this).next().has("span")) {
            counter++;
        }
        $(this).attr('data-role', (Math.pow(tone, (++counter) - 49) * 440));
    });
};

PianoUI.prototype.releaseKey = function () {
    client.publish('key', key);
    if (record.active){
        record.stopTimer();
        record.rest();
    }
    client.publish('key', '1');
    console.log(song);

};

PianoUI.prototype.setKeys();

// -- EndSection: UI Piano  -- //


// -- Section: MqttSettings -- //

var MqttSettings = {
    connectToMqtt: function () {
        client.on('connect', function () {
            client.subscribe('connected');
            client.publish('test', 'omg twerkt');
        })
    },

    init: function () {
        client.subscribe("PianoSite");
        this.getMessage();
        this.connectToMqtt();
        client.publish("Connection", "Connected to mqtt!");
    },
    getMessage: function () {
        client.on("message", function (topic, payload) {
            console.log([topic, payload].join(": "));
        });
    }
};
var client = mqtt.connect();

// --EndSection: MqttSettings -- //
