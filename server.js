var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var exphbs  = require('express-handlebars');

var app = express();
var server = http.Server(app);
var io = socketio(server);
var db = {};

app.use(express.static('public'));

var socketManager = require('./lib/socketManager')({ db: db, io: io });

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/favico.ico' , function(req , res){ res.status(200).end()});

app.get('/', function(req, res) {
  return res.render('home');
});

io.on('connection', socketManager);

server.listen(3000, function() {
  console.log('listening on port 3000')
});
