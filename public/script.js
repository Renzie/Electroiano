$(function () {

    $('#piano').on('click', PianoUI.prototype.hitKey)

    function PianoUI() {
        let piano = $("#piano");
    }

    PianoUI.prototype.hitKey = function (e) {
        console.log($(this).attr("data-role"))
    };



    PianoUI.prototype.setKeys = function () {
        for (let i = 0; i < this.whitekeys.length; i++) {
            $("#piano li").attr('data-role', whitekeys[i]);
        }

    };

    var whitekeys = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'];
    var blackkeys = ['do', 're', 'fa', 'sol', 'la'];


    var client = mqtt.connect();
    client.subscribe("mqtt/demo");

    client.on("message", function (topic, payload) {
        console.log([topic, payload].join(": "));
        //client.end();
    });

    PianoUI.prototype.setKeys();

    client.publish("Connection", "Connected to mqtt!");
});



