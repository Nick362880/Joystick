function JoyStick(p) {
	this.bc = p.bc;
	this.kc = p.kc;
	this.br = p.br;
	this.kr = p.kr;
	this.kx = 0;
	this.ky = 0; // Knob coords
	this.canvas = newCanvas(p.br * 2, p.br * 2);
	this.canvas.style.backgroundColor = "blue"
	this.w = this.canvas.width;
	this.h = this.canvas.height;
	this.ctx = this.canvas.getContext("2d");
	this.ctx.translate(this.w / 2, this.h / 2); // Moves origin to canvas center
	this.ctx.save();
	// Read why https://stackoverflow.com/questions/12731528/adding-event-listeners-in-constructor
	var self = this;
	this.canvas.addEventListener("touchstart", function(e) {
		this.kx = e.touches[0].clientX - self.w / 2;
		this.ky = e.touches[0].clientY - self.h / 2;
		self.update();
		console.log(this.ky)
	});/*
	this.canvas.addEventListener("touchmove", function(e) {
		this.kx = e.touches[0].clientX;
		this.ky = e.touches[0].clientY;
		self.update();
	}); */
	this.canvas.addEventListener("touchend", function(e) {
		this.kx = 0;
		this.ky = 0;
		//self.update();
	});
	
	set kx(v) {
		this.kx = v;
	}
	
	set ky(v) {
		this.ky = v;
	}
	
	get kx() {
		return this.kx;
	}
	
	get ky() {
		return this.ky;
	}
	
	this.update = function() {
		console.log(this.ky)
		var c = this.ctx;
		c.clearRect(-this.w / 2, -this.h / 2, this.w, this.h);
		c.beginPath();
		c.arc(0, 0, this.br, 0, 2 * Math.PI);
		c.fillStyle = rgba(this.bc);
		c.fill();
		
		c.beginPath();
		c.arc(this.kx, this.ky, this.kr, 0, 2 * Math.PI);
		c.fillStyle = rgba(this.kc);
		c.fill();
	}
}