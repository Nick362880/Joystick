class JoyStick {
	constructor(p) {
		this.x = p.x;
		this.y = p.y;
		this.bc = p.bc;
		this.kc = p.kc;
		this.br = p.br;
		this.kr = p.kr;
		this.kx = 0;
		this.ky = 0; // Knob coords
		this.deltaX = 0;
		this.deltaY = 0;
		this.force = 0; // Can be used for dynamic velocity
		this.canvas = this.newCanvas(p.br * 2, p.br * 2);
		this.canvas.style.position = "absolute";
		this.canvas.style.left = "" + this.x + "px";
		this.canvas.style.top = "" + this.y + "px";
		this.canvas.style.backgroundColor = this.rgba(this.bc);
		this.canvas.style.borderRadius = "50%";
		this.w = this.canvas.width;
		this.h = this.canvas.height;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.translate(this.w / 2, this.h / 2); // Moves origin to canvas center
		
		// Read why https://stackoverflow.com/questions/12731528/adding-event-listeners-in-constructor
		var self = this;
		// For mouse drag
		var isdown = false;
		this.addEventListeners(self.canvas, ["mouseup", "mouseout", "touchend"], function() { // Fix mouseout
			isdown = false;
			self.kx = 0;
			self.ky = 0;
			self.update();
		});
		this.addEventListeners(self.canvas, ["mousedown", "touchstart"], function(e) {
			isdown = true;
			if (e.touches) { // If touch (not mousedown)
				self.kx = e.touches[0].clientX - self.x - self.w / 2;
				self.ky = e.touches[0].clientY - self.y - self.h / 2;
			} else {
				self.kx = e.clientX - self.x - self.w / 2;
				self.ky = e.clientY - self.y - self.h / 2;
			}
            self.update();
        });
        this.addEventListeners(self.canvas, ["mousemove", "touchmove"], function(e) {
            if (e.touches) {
				self.kx = e.touches[0].clientX - self.x - self.w / 2;
				self.ky = e.touches[0].clientY - self.y - self.h / 2;
			} else {
				if (isdown) {
					self.kx = e.clientX - self.x - self.w / 2;
					self.ky = e.clientY - self.y - self.h / 2;
				}
			}
			self.update();
        });
        
		this.update();
	}
	
	update() {
		var a = Math.atan2(this.ky, this.kx);
        var cos = Math.cos(a);
        var sin = Math.sin(a);
        if (this.kx && this.ky) { // If knob not at joystick center
            this.deltaX = cos;
            this.deltaY = sin;
        } else {
            this.deltaX = 0;
            this.deltaY = 0;
            this.force = 0; // Cancelling deltas and force if joystick is inactive
        }
		
		var dk = this.dist(0, 0, this.kx, this.ky); // Origin - knob dist
		var md = this.br - this.kr; // Maximum allowed dist
		if (dk >= md) {
			this.kx = cos * (this.br - this.kr);
			this.ky = sin * (this.br - this.kr);
		}
		
		dk = this.dist(0, 0, this.kx, this.ky); // Updating dk in case knob was moved
		this.force = dk / md;
		
		var c = this.ctx;
		c.clearRect(-this.w / 2, -this.h / 2, this.w, this.h);
		c.beginPath();
		c.arc(0, 0, this.br, 0, 2 * Math.PI);
		c.fillStyle = this.rgba(this.bc);
		c.fill();
		
		c.beginPath();
		c.arc(this.kx, this.ky, this.kr, 0, 2 * Math.PI);
		c.fillStyle = this.rgba(this.kc);
		c.fill();
	}
	
	// Some utility functions
	newCanvas(ws, hs) {
		var canv = document.createElement("canvas");
		document.body.appendChild(canv);
		canv.width = ws;
		canv.height = hs;
		return canv;
	}
	
	rgba(arr) {
		return "rgba(" + arr + ")";
	}
	
	dist(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	}
	
	// Like normal listener, but with multiple events (p)
	addEventListeners(e, p, func) {
		for (var i = 0; i < p.length; i++) {
			var c = p[i];
			e.addEventListener(c, func);
		}
	}
}
