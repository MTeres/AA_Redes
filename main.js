var canvas, ctx, Height, Width, frames = 0;
var numStars = 2000, stars =[];
var fps = 10;

function main(){
	onInitialize();
	generate_starts();
	setInterval(play, 1000 / fps);
}

function onInitialize () {

	Height = window.innerHeight;
	Width = window.innerWidth;

	if(Height >= 500){
		Height = 600;
		Width = 600;
	}

	canvas = document.createElement("canvas");
	canvas.width = Width;
	canvas.height = Height;
	canvas.style.border = '1px solid #000';
	canvas.setAttribute("class", "main-canvas");
	document.body.appendChild(canvas);
	ctx = canvas.getContext("2d");
}

function play () {
	draw();
}

function onClick (event) {

}


function draw () {
	
}

function generate_starts() {
	for(var i = 0; i < numStars; i++) {
		var x = Math.round(Math.random() * Width);
		var y = Math.round(Math.random() * Height);
		var length = 1 + Math.random() * 2;
		var opacity = Math.random();

		var star = new Star(x, y, length, opacity);
		stars.push(star);
	}	

	// Add the the stars array
	$.each(stars, function() {
		this.draw(ctx);
	})	
}

main();