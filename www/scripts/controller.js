const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var list_players = [];
export function atualiza(data) {
	for (var item in data){
		const val = data[item]
		$('[data-' + item + ']').text(val);
	}
}

export function inicia_game(player){
	$('.game-intro').hide();
	$('.game-play').show();
}


export function atualiza_game(data){
	ctx.clearRect(0, 0, 1150, 520);
	
	for (var i in data){
		ctx.beginPath(); 
		ctx.fillStyle = data[i].color;
		ctx.fillRect(data[i].x, data[i].y, 50, 50);
		ctx.closePath(); 
	}
}
