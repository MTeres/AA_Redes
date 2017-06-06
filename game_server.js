var limit_players = 5;
var players = {}
var specs = {}

var Player = function (id, socket, nome){
	var self = {
		id: id,
		x: 0,
		y: 0,
		speed: 8,
		nome: nome,
		color: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
		controles: {
			up: false,
			dw: false,
			le: false,
			rg: false
		}
	}

	self.update = function (){
		if (self.controles.up)
			self.y -= self.speed
		if (self.controles.le)
			self.x -= self.speed
		if (self.controles.rg)
			self.x += self.speed
		if (self.controles.dw)
			self.y += self.speed
	}


	socket.on('player_bt', function(data){
		self['controles'][data['bt']] = data['estado']
	})

	socket.on('disconnect', function(){
		delete players[id]
		delete specs[id]
	})

	return self
}

exports.players = function () {
	return players
}

exports.specs = function () {
	return specs
}

exports.base_info = function() {
	data = {}
	data['players'] = Number(Object.keys(players).length)
	data['specs'] = Number(Object.keys(specs).length) - data['players']
	return data
}

exports.add_player = function (socket, nome){
	if (players.length >= limit_players){
		return
	}

	id = Number(Object.keys(specs).length) + 1
	specs[id] = socket

	player = Player(id, socket, nome)
	players[id] = player

	return player
}

exports.add_spec = function (socket){
	id = Number(Object.keys(specs).length) + 1
	specs[id] = socket
}

exports.update = function(){
	for (i in players){
		p = players[i]
		p.update();
	}

	for (i in specs){
		specs[i].emit('atualiza', players)
	}
}