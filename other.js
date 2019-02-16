var ctx, w, h;
var j;

var x, y;

window.onload = function() {
	var canv = document.createElement("canvas");
	document.body.appendChild(canv);
	canv.width = w = window.innerWidth;
	canv.height = h = window.innerHeight;
	ctx = canv.getContext("2d");
	
	j = new JoyStick({
		bc: [0, 0, 0, 0.5], // Background col
		kc: [255, 255, 255, 0.75], // Knob col
		br: 80, // Background radius
		kr: 20, // Knob radius
	});
	
	x = w / 2 - 10;
	y = h / 2 - 10;
	
	window.requestAnimationFrame(main);
}

function main() {
	x += j.deltaX * j.force * 32;
	y += j.deltaY * j.force * 32;
	ctx.clearRect(0, 0, w, h);
	ctx.fillRect(x, y, 20, 20);
	
	window.requestAnimationFrame(main);
}
