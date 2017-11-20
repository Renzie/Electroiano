/**
 * Created by Renzie on 20/11/2017.
*/

const http = require("http");
const express = require("express");




var app = express();

app.use(express.static(__dirname + "/public"));
const httpServer = http.createServer(app);

var port = process.env.PORT || 3000;
httpServer.listen(port, () =>{
    console.log("webserver running on 3000")
});
