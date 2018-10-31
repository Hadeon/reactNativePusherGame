var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');

require('dotenv').config();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var pusher = new Pusher({
  appId: process.env.APP_KEY,
  key: process.env.APP_SECRET,
  cluster: process.env.APP_CLUSTER
});

app.get('/', function(req, res) {
  res.send('Server running...');
});

app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

var port = process.env.port || 5000;
app.listen(port);