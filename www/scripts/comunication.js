import IO from 'socket.io-client'
import * as controller from '../scripts/controller'
var socket = IO.connect( "http://localhost:8081");

export function bind_events() {
	bind_infos();
	bind_buttons();
}

var bind_infos = function() {
	socket.on('infos_sender', function(data){
		controller.atualiza(data);
	})
}

var add_spec = function(e){
	socket.emit('add_spec');
}

var bind_buttons = function(){
	$('[data-bt-spec]').click(add_spec);
}