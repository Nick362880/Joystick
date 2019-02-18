var ctx, w, h;
var j;

var x, y;
var bx, by;

window.onload = function() {
	var canv = document.createElement("canvas");
	document.body.appendChild(canv);
	canv.width = w = window.innerWidth;
	canv.height = h = window.innerHeight;
	ctx = canv.getContext("2d");
	
	j = new JoyStick({
		x: w / 2 - 80,
		y: h - 40 - 80 * 2, // Coords (top left)
		bc: [0, 0, 0, 0.5], // Background col
		kc: [255, 255, 255, 0.75], // Knob col
		br: 80, // Background radius
		kr: 20, // Knob radius
	});
	
	x = w / 2 - 10;
	y = h / 2 - 10;
	bx = 0;
    by = 0;
	
	window.requestAnimationFrame(main);
}

function main() {
	x += j.deltaX * j.force * 4;
    y += j.deltaY * j.force * 4;
    //ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
    //ctx.fillRect(0, 0, w, h);
    ctx.clearRect(0, 0, w, h);
    
    ctx.beginPath();
    ctx.fillStyle = "#C00"
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
    
    var a = Math.atan2(y - by, x - bx);
    bx += Math.cos(a);
    by += Math.sin(a);
    
    ctx.beginPath();
    ctx.fillStyle = "#099";
    ctx.arc(bx, by, 10, 0, 2 * Math.PI);
    ctx.fill();
    
    window.requestAnimationFrame(main);
}
