/**
 * Created by Renzie on 20/11/2017.
*/

const mqtt = require("mqtt");




/*var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.static(__dirname + "/public"));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/index'));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.error(err);
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app; */
/*process.env.THINGSBOARD_HOST = "demo.thingsboard.io";
process.env.ACCESS_TOKEN = "RENZIEPC";

console.log('Connecting to: %s using access token: %s', process.env.THINGSBOARD_HOST, process.env.ACCESS_TOKEN);

var client  = mqtt.connect('mqtt://'+ process.env.THINGSBOARD_HOST,{
    username: process.env.ACCESS_TOKEN
});

client.on('connect', function () {
    console.log('Client connected!');
    client.publish('v1/devices/me/attributes', process.env.ATTRIBUTES);
    console.log('Attributes published!');
    client.publish('v1/devices/me/telemetry', process.env.TELEMETRY);
    console.log('Telemetry published!');
    client.end();
});*/

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





