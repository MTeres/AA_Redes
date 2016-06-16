var player_list = [];

function Player(x, y, r, style, circle) {
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.r = parseInt(r);
  this.life = 3;
  this.v = 0;
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
	this.onFrame();
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
  if(this.v > 15 || this.v < -15)
    return

  if(ref == 'Right')
    this.v += 4;
  else if(ref == 'Left')
    this.v -= 4;
}

Player.prototype.onFrame = function (){
  if(this.v != 0) {
    this.x += (this.v);
    if(this.v > 0)
      this.v-= 2;
    else
      this.v+= 2;
  }

}

Player.prototype.fire = function () {
  f = new Fire(this.x + (this.r/2), this.y + this.r + 5,1);
  fire_list.push(f); 
}