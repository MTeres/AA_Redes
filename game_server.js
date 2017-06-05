var limit_players = 5;
var players = []
var specs = []

exports.players = function () {
	return players
}

exports.specs = function () {
	return specs
}

exports.add_player = function (){
	if (players.length >= limit_players){
		return
	}

	console.log("ADDD PLAYER")
}

exports.add_spec = function (){
	console.log("ADDD SPEC")
}