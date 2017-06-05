var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var game_server = require("./game_server.js");
server.listen(8081, "127.0.0.1");
//Static resources server

app.get('/',function(req,res){
    res.sendFile(__dirname + '/www/index.html');
});

io.on('connection',function(socket){
	player = null

	socket.emit('infos_sender', game_server.base_info())

	socket.on('add_spec', function(){
		game_server.add_spec(socket)
		socket.emit('infos_sender', game_server.base_info())
	})

	socket.on('add_player', function(){
		player = game_server.add_player(socket)
		socket.emit('infos_sender', game_server.base_info())
	})

	socket.on('player_bt', function(data){
		if (player)
			player['controles'][data['bt']] = data['estado']
	})


});

setInterval(function(){
	game_server.update()
}, 1000/25);

app.use(express.static(__dirname + '/www'));