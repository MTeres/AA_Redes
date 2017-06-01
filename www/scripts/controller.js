export function atualiza(data) {
	for (var item in data){
		const val = data[item]
		$('[data-' + item + ']').text(val);
	}
}
