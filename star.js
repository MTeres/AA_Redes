function Star(x, y, length, opacity) {
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.length = parseInt(length);
	this.opacity = opacity;
	this.factor = 1;
	this.increment = Math.random() * .03;
}

Star.prototype.draw = function(ctx) {
	ctx.rotate((Math.PI * 1 / 10));
	
	// Save the ctx
	ctx.save();
	
	// move into the middle of the canvas, just to make room
	ctx.translate(this.x, this.y);
	
	// Change the opacity
	if(this.opacity > 1) {
		this.factor = -1;
	}
	else if(this.opacity <= 0) {
		this.factor = 1;
		this.x = Math.round(Math.random() * Width);
		this.y = Math.round(Math.random() * Height);
	}
		
	this.opacity += this.increment * this.factor;
	
	ctx.beginPath()

	for (var i = 5; i--;) {
		ctx.lineTo(0, this.length);
		ctx.translate(0, this.length);
		ctx.rotate((Math.PI * 2 / 10));
		ctx.lineTo(0, - this.length);
		ctx.translate(0, - this.length);
		ctx.rotate(-(Math.PI * 6 / 10));
	}

	ctx.lineTo(0, this.length);
	ctx.closePath();
	ctx.fillStyle = "rgba(255, 255, 200, " + this.opacity + ")";
	ctx.shadowBlur = 5;
	ctx.shadowColor = '#ffff33';
	ctx.fill();
	
	ctx.restore();
}