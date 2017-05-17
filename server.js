var express = require('express');  
var app = express();  
var io = require('socket.io')(server);
//Static resources server
app.use(express.static(__dirname + '/www'));

var server = app.listen(8081, function () {  
    var port = server.address().port;
    console.log('Servidor rodando na porta %s', port);
});