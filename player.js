function Player(x, y, r, style, circle) {
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.r = parseInt(r);
  this.life = 3;
	this.style = style;
}

Player.prototype.rand = function(){

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

Player.prototype.draw = function (canvas) {
	canvas.beginPath();
	canvas.rect(this.x, this.y, this.r + (this.r/2), this.r);
	if (this.style.fill) {
    	canvas.fillStyle = this.style.color;
    	canvas.fill();
  	}
}

Player.prototype.action = function (ref) {
  if(ref == 'U+0020'){
    this.fire();
    return;
  }

  this.move(ref);
}

Player.prototype.move = function (ref) {
  if(ref == 'Right')
    this.x += 4;
  else if(ref == 'Left')
    this.x -= 4;
}

Player.prototype.fire = function () {

}