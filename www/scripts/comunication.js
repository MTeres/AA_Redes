// exportar isso em breve :)
var Client = {};
var socket = io.connect( "http://localhost:8081");

socket.on('infos_sender', function(data){
	console.log(server_data)
})