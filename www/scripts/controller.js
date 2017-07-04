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
	
	for (var i in data['players']){
		ctx.beginPath(); 
		ctx.fillStyle = data['players'][i].color;
		ctx.fillRect(data['players'][i].x, data['players'][i].y, 50, 50);
		ctx.closePath(); 
	}

	console.log(data['objs'])

	for (var i in data['objs']){
		ctx.beginPath(); 
		ctx.fillStyle = '#fff';
		ctx.fillText(data['objs'][i].val, data['objs'][i].x, data['objs'][i].y); 
	}
}
