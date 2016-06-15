var canvas, ctx, Height, Width, frames = 0;
var numStars = 2000, stars =[];
var fps = 10;
var numCircles = 0;
var rec_list = [];
var player_list = [];

function main(){
	onInitialize();
	generate_starts();
	generate_player();
	generate_rects(3,10);
	play();
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
    document.addEventListener('keydown', doKeyDown , false);
	document.body.appendChild(canvas);
	ctx = canvas.getContext("2d");
}

function play () {
	draw();
	window.requestAnimationFrame(play)
}

function onClick (event) {

}

function doKeyDown(e) {
	player_list[0].action(e.keyIdentifier);
}


function draw () {
	ctx.clearRect(0, 0, Width, Height);
	$.each(stars, function() {
		this.draw(ctx);
	});
	$.each(rec_list, function() {
		this.draw(ctx);
	});

	$.each(player_list, function() {
		this.draw(ctx);
	});
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
}

function generate_rects(line,col){
	wM = Width/2 - 270;
	hM = Height/2 - 50;
	var space = 45;
	var size = 40;

	for( i = 0; i < line; i++ ) {
		for( j = 0; j < col; j++ ) {
			var r = new Rec(wM + j*space + space*i, hM + space*i , size, null);
			r.rand();
			rec_list.push(r);
		}
	}
}

function generate_player(){
	wM = Width/2 - 270;
	hM = Height/2 - 50;
	var size = 50;

	var p = new Player(250, 0 , size, null);
	p.rand();
	player_list.push(p);

	var p = new Player(250, 550 , size, null);
	p.rand();
	player_list.push(p);
}

main();