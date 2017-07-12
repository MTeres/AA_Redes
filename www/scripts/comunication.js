import IO from 'socket.io-client'
import * as controller from '../scripts/controller'
var socket = IO.connect( "http://localhost:8081");

export function bind_events() {
	bind_infos();
	bind_buttons();
}


var bind_player = function (){
	document.onkeydown = function (event){
		if(event.keyCode === 87){
			socket.emit('player_bt', {bt:'up', estado:true})
		}
		if(event.keyCode === 83){
			socket.emit('player_bt', {bt:'dw', estado:true})
		}
		if(event.keyCode === 65){
			socket.emit('player_bt', {bt:'le', estado:true})
		}
		if(event.keyCode === 68){
			socket.emit('player_bt', {bt:'rg', estado:true})
		}
	}


	document.onkeyup = function (event){
		if(event.keyCode === 87){
			socket.emit('player_bt', {bt:'up', estado:false})
		}
		if(event.keyCode === 83){
			socket.emit('player_bt', {bt:'dw', estado:false})
		}
		if(event.keyCode === 65){
			socket.emit('player_bt', {bt:'le', estado:false})
		}
		if(event.keyCode === 68){
			socket.emit('player_bt', {bt:'rg', estado:false})
		}
	}
}

var bind_infos = function() {
	socket.on('infos_sender', function(data){
		controller.atualiza(data);
	})

	socket.on('atualiza', function(data){
		controller.atualiza_game(data);
		controller.atualiza(data);
	})
}

var add_spec = function(e){
	socket.emit('add_spec');
	controller.inicia_game(false);
}

var add_player = function(e){
	const nome = $('[data-name]').val();
	if (!(nome != ''))
		return alert("Preencha o seu nome :)")
	socket.emit('add_player', {nome: nome});
	controller.inicia_game(true);
	bind_player()
}

var bind_buttons = function(){
	$('[data-bt-spec]').click(add_spec);
	$('[data-bt-player]').click(add_player);
}