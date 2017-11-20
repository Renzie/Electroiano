/**
 * Created by Renzie on 20/11/2017.
*/

const http = require("http");
const express = require("express");




var app = express();

app.use(express.static(__dirname + "/public"));
const httpServer = http.createServer(app);
httpServer.listen(3000, () =>{
    console.log("webserver running on 3000")
});
