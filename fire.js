var fire_list = [];

function Fire(x, y,from) {
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.r = 8;
	this.color = 'red';
	this.live = true;
  // 1 or 2 to say father of shot.
  this.dir = parseInt(from);
}

Fire.prototype.draw = function(canvas) {
	this.onFrame();
	canvas.beginPath();
	canvas.rect(this.x, this.y, this.r, this.r);
	canvas.fillStyle = this.color;
	canvas.fill();
}

Fire.prototype.onFrame = function () {
	if(this.dir == 1){
		this.y += 4;
	}else{
		this.y -= 4;
	}

	if(this.y > 600){
		this.kill();
	}

	this.verifyContact();
}

Fire.prototype.kill = function () {
	this.live = false;
	fire_list.splice(fire_list.indexOf(this),1);
}


Fire.prototype.verifyContact = function () {
	elm = this;
	$.each(rec_list, function(index, value) {
		if( ( (elm.x + elm.r < value.x) && elm.x < value.x + value.r) && ((elm.y + elm.r > value.y) && elm.y < value.y + value.r) ){
			if(elm.live){
				value.kill();
				elm.kill(); 
			}
		}
	});
}