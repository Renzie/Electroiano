/**
 * Created by Renzie on 20/11/2017.
*/

const mqtt = require("mqtt");

var client = mqtt.connect('http://localhost:1883');

client.on('connect', function () {
    console.log('Client connected!');
    client.subscribe('Welcome');
    client.publish('welcome', 'Renzie');
    client.end();
});


client.on('message', function (topic, message) {
    console.log(`${topic}: ${message.toString()} !`);
    console.log(topic);
    if (topic === 'connected') {
        client.publish('welcome', `welcome: ${message.toString()}`);
    }
    //client.end()
});





