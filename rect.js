var rec_list = [];

function Rec(x, y, r, style, circle) {
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.r = parseInt(r);
	this.style = style;
	this.live = true;
}

Rec.prototype.rand = function(){

	var primary = '#'+Math.floor(Math.random()*16777215).toString(16);
	var secondary = '#'+Math.floor(Math.random()*16777215).toString(16);
	var style = {
		shadow: !(Math.random()+0.5|0),
		blur: Math.random() * (10 + 1),
		color: (!(Math.random()+0.5|0)) ? primary : secondary,
		fill: true
	}

	this.style = style;
}

Rec.prototype.draw = function(canvas) {
	if(!this.live){
		rec_list.splice(rec_list.indexOf(this),1);
	}
	canvas.beginPath();
	canvas.rect(this.x, this.y, this.r, this.r);
	if (this.style.fill) {
		canvas.fillStyle = this.style.color;
		canvas.fill();
	}
}

Rec.prototype.kill = function () {
	this.live = false;
}