/**
 * Created by Renzie on 5/12/2017.
 */
const mosca = require('mosca');
const settings = {
    http: {
        port: 3000,
        bundle : true,
        static : './public'
    }
};

const server = new mosca.Server(settings);

server.on('clientconnected' , function (client) {
    console.log('client connected', client.id);
});


server.on('published', function (packet, client) {
    console.log(packet.topic);
    console.log(packet.payload.toString(), "message");

});





server.on('ready', setup);

function setup() {
    console.log('Mosca server started')
}
