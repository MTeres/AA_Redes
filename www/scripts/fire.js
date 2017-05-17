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
	if(this.y > 600){
		this.kill();
		return;
	}

	if(this.dir == 1){
		this.y += 6;
	}else{
		this.y -= 6;
	}

	this.verifyContact();
}

Fire.prototype.kill = function () {
	this.live = false;
	fire_list.splice(fire_list.indexOf(this),1);
}


Fire.prototype.verifyContact = function () {
	for(i = 0 ; i < rec_list.length; i++ ) {
		if( ((this.x + this.r >  rec_list[i].x) && (this.x <  rec_list[i].x + rec_list[i].r)) && ((this.y + this.r > rec_list[i].y) && (this.y < rec_list[i].y + rec_list[i].r))){
			if(this.live){
				rec_list[i].kill();
				this.kill();
				return; 
			}
		}
	}
}