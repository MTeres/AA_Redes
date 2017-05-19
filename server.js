var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
server.listen(8081, "127.0.0.1");
//Static resources server

app.get('/',function(req,res){
    res.sendFile(__dirname + '/www/index.html');
});

app.use(express.static(__dirname + '/www'));

io.on('connection',function(socket){
	console.log('User connected');
});