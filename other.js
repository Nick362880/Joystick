var ctx, w, h;
var j;

window.onload = function() {
	var canv = newCanvas();
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
	
	window.requestAnimationFrame(main);
}

function main() {
	
	
	window.requestAnimationFrame(main);
}

function newCanvas(ws, hs) {
	var canv = document.createElement("canvas");
	document.body.appendChild(canv);
	canv.width = ws;
	canv.height = hs;
	return canv;
}

function rgba(arr) {
	return "rgba(" + arr + ")";
}