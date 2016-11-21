var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/omok.css', function(req, res) {
    res.sendFile(__dirname + '/omok.css');
});
app.get('/public/bundle.js', function(req, res) {
    res.sendFile(__dirname + '/public/bundle.js');
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
  socket.emit('connected', { message: 'connected'});
  socket.on('createGame', function(data){
    console.log(typeof data.gameRoomId);
    socket.join(data.gameRoomId);
    io.sockets.to(data.gameRoomId).emit('playerJoinedRoom', { gameRoomId: data.gameRoomId });
    console.log(io.sockets.adapter.rooms);
  });
  socket.on('joinGameRoom', function(data){
    console.log(typeof data.gameRoomId)
    socket.join(data.gameRoomId);
    io.sockets.to(data.gameRoomId).emit('playerJoinedRoom', { gameRoomId: data.gameRoomId });
    console.log(io.sockets.adapter.rooms);
  });
  socket.on('onPlayerMove', function(data){
    io.sockets.in(data.gameRoomId).emit('changeBoardState', data);
  });
});
