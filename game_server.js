var limit_players = 5;
var players = {}
var specs = {}
var size = {x: 1150, y:520, box: 50}
var objs = []

var Obj = function(){
	var self = {
		x: Math.floor((Math.random() * (size.x - size.box)) + 1),
		y: Math.floor((Math.random() * (size.y - size.box)) + 1),
		val: Math.floor((Math.random() * (size.x/10 + size.y/10)) + 1) - Math.floor((Math.random() * (size.x/100)) + 1)
	}

	return self;
}

var Player = function (id, socket, nome){
	var self = {
		id: id,
		x: 0,
		y: 0,
		speed: 8,
		pontos: 0,
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

		if (self.x + size.box > size.x){
			self.x = size.x - size.box
		}

		if (self.y + size.box > size.y){
			self.y = size.y - size.box
		}

		if (self.x < 0){
			self.x = 0
		}

		if (self.y < 0){
			self.y = 0
		}

		self.pontua();
	}

	self.pontua = function(){
		for (index in objs){
			obj = objs[index]
			if ( ((self.x + size.box >= obj.x) && ((self.x + size.box) <= obj.x + 40)) && ((self.y + size.box >= obj.y) && (self.y + size.box <= obj.y + 40))){
				self.pontos += obj.val;
				objs.splice(index, 1);
			}
		}
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

var controle_objetos = function(){
	numero = Math.floor((Math.random() * Object.keys(players).length))
	if (numero == Object.keys(players).length || Object.keys(players).length * 2 < objs.length)
		return
	obj = Obj()
	objs.push(obj)
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
	controle_objetos()
	for (i in players){
		p = players[i]
		p.update();
	}

	for (i in specs){
		specs[i].emit('atualiza', {'players': players, 'objs': objs})
	}
}