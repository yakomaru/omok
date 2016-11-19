var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/omok.css', function(req, res) {
    res.sendFile(__dirname + '/omok.css');
});
app.get('/public/app.js', function(req, res) {
    res.sendFile(__dirname + '/public/app.js');
});
app.get('/assets/Slime.png', function(req, res) {
    res.sendFile(__dirname + '/assets/Slime.png');
});
app.get('/assets/Pig.png', function(req, res) {
    res.sendFile(__dirname + '/assets/Pig.png');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('test', function (data) {
    console.log(data);
  });
});
