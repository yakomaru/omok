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
  var game = {};
  socket.emit('connected', { message: 'connected'});
  socket.on('joinGameRoom', function(data){
    game.roomId = data.gameRoomId;
    socket.join(game.roomId);
    //console.log(io.sockets.adapter.rooms);
    //console.log(data)
    if(data.role === 'host'){
      game.hostId = data.socketId;
    }
    io.sockets.to(game.roomId).emit('playerJoinedRoom', { gameRoomId: game.roomId });
  });
  socket.on('onMoveClick', function(data) {
    console.log(game.hostId)
    if (data.piecePlayed == 1  && game.hostId || data.piecePlayed == 2 && !game.hostId) {
      socket.emit('changeCoordinateState', data);
    }
  });
  socket.on('onPlayerMove', function(data){
    io.sockets.in(game.roomId).emit('changeBoardState', data);
  });
});
