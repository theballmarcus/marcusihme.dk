//CANVAS VARIABLES
var c = document.getElementById("myCanvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
var ctx = c.getContext("2d");

//GLOBAL VARIABLE DECLARATION
var hue=125;
var direction=1;
timer = ""
var date = null
var counter = 0
var ga = 0



function calc_new_time() {
    var date = new Date();
    timer = date.toLocaleTimeString();
}

function clear_canvas() {
    ctx.fillStyle='black';
    ctx.fillRect(0,0,c.width,c.height);
}

function draw_timer() {
    ctx.fillStyle='hsl('+hue+',100%,50%)';
    ctx.textAlign = "center"
    ctx.font = "80px Lato";
    ctx.fillText(timer, c.width / 2, c.height / 2); 
}

function createRainbowColor() {   
    hue+=direction*2;
    if(hue>254){direction*=-1;hue=255;}
    if(hue<1){direction*=-1;hue=0;}
}

draw_quotes = []
recieved_motto = {}

function draw() {
    clear_canvas()
    createRainbowColor()
    draw_timer()
}


calc_new_time()
draw()
window.setInterval(draw, 100);
window.setInterval(calc_new_time, 1000);



function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  