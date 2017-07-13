const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var list_players = [];
export function atualiza(data) {
	if (data['players'] == 0 || data['players'] == 1)
		return

	const lista = data['players'];
	for (var i in lista){
		if ($('[data-item=' + lista[i].id + ']').length){
		    console.log($('[data-pontos=' + lista[i].id + ']'))
			$('[data-pontos=' + lista[i].id + ']').text(lista[i].pontos)
		}else {
			$('[data-list-players]').append('<li data-item="' + lista[i].id + '"><h2>' + lista[i].nome.toUpperCase() + '</h2> <span data-pontos="' + lista[i].id + '">' + lista[i].pontos + '</span></li>');
		}
		const val = lista[i];
	}
}


export function atualiza_info(data){
	$('[data-players]').text(data['players'])
	$('[data-specs]').text(data['specs'])
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
	
	for (var i in data['objs']){
		ctx.beginPath(); 
		ctx.fillStyle = '#fff';
      	ctx.arc(data['objs'][i].x, data['objs'][i].y, 20, 0, 2 * Math.PI, false);
      	ctx.fill();
      	ctx.fillStyle = 'green';
      	ctx.textAlign="center"; 
		ctx.fillText(data['objs'][i].val, data['objs'][i].x, data['objs'][i].y); 
	}
}
