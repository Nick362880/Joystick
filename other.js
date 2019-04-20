var ctx, w, h;
var j1, j2;

var x, y;
var bx, by;

window.onload = function() {
    var canv = document.createElement("canvas");
    document.body.appendChild(canv);
    canv.width = w = window.innerWidth;
    canv.height = h = window.innerHeight;
    ctx = canv.getContext("2d");
    
    j1 = new Joystick(w / 2 - 48 * 3, h - 40 - 48 * 2, 48, 16, [101, 101, 101, 0.5], [255, 255, 255, 0.75]);
    
    j2 = new Joystick(w / 2 + 48, h - 40 - 48 * 2, 48, 16, [101, 101, 101, 0.5], [255, 255, 255, 0.75]);
    
    x = w / 2 - 20;
    y = h / 2;
    bx = w / 2 + 20;
    by = h / 2;
    
    window.requestAnimationFrame(main);
}

function main() {
    x += j1.deltaX * j1.force * 4;
    y += j1.deltaY * j1.force * 4;
    bx += j2.deltaX * j2.force * 4;
    by += j2.deltaY * j2.force * 4;
    
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
    // ctx.clearRect(0, 0, w, h);
    
    ctx.beginPath();
    ctx.fillStyle = "#C00"
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.beginPath();
    ctx.fillStyle = "#099";
    ctx.arc(bx, by, 10, 0, 2 * Math.PI);
    ctx.fill();
    
    window.requestAnimationFrame(main);
}
