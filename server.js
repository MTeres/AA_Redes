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
	console.log('Usuario na pagina');
	socket.emit('infos_sender', {
		players: game_server.players().length,
		specs: 12
	})
});

app.use(express.static(__dirname + '/www'));