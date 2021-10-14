//CANVAS VARIABLES
var c = document.getElementById("myCanvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
var ctx = c.getContext("2d");

//GLOBAL VARIABLE DECLARATION
var hue=getRandomArbitrary(0,255);
var direction=1;
timer = ""
var date = null
var counter = 0
var ga = 0


var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    rand = Math.random()
    return [keys[ keys.length * rand << 0], obj[keys[ keys.length * rand << 0]]];
}
function addStr(str, index, stringToAdd){
    return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
  }
//Preload function
CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    this.beginPath();
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, radius);
    this.arcTo(x, y + height, x, y, radius);
    this.arcTo(x, y, x + width, y, radius);
    this.closePath();
    return this;
}

old_c = ""
c_color = []

//CanvasRenderingContext2D.prototype.fillColoredText = function(fstr, x, y) {
fillColoredText = function(fstr,x,y,max_x) {
    cText = ""
    cx = x
    subStr = 0

    for(i in fstr + 1) {
        if(fstr[i] === "%" && old_c === "%" ) {
            found_closing = false;
            counter_closing = i;
            while (!found_closing) {
                if(fstr[counter_closing] === ")") {
                    c_color = fstr.substring(i, counter_closing).replace("%(", "").split(",")
                    ctx.fillStyle = "rgb(" + c_color[0] + ", " + c_color[1] + ", " + c_color[2] + ")"
                    fstr = fstr.replace("%" + fstr.substring(i, counter_closing), "")
                    found_closing = true
                }
                counter_closing++
            }
            counter_closing = 0
        } else {
            if(old_c !== undefined) {
                if(cx - x > max_x) {
                    cx = x
                    y = y+20
                }
                cText += old_c
                ctx.fillText(old_c, cx, y)
                cx = cx + ctx.measureText(old_c).width
            }
        }
        old_c = fstr[i]
    }
}


//Terminal
var info = {
    whoami : {
        "Who am I?" : "Th3B4llMarcus.",
        "What do I do?" : "Computers.",
        "What do I want?" : "A better world.",
        "How did I learn to do \"computers\"?" : "I spent a lot of time, and I had a good network of people.",
        "Was I inspired by someone?" : "Well, I have always been inspired by the people who work hard and succeed.",
    }
}
terminal_string = "%%(0,0,255)[%%(0,255,255)th3b4llmarcus%%(0,0,255)@%%(255,0,255)unh4ck4bl3%%(0,0,255)] --> [%%(255,0,255)$%%(0,0,255)] %%(255,255,255)"

var current_typing = {
    obj : randomProperty(info.whoami),
    index : 0,
    direction : 1,
    seconds : 0,
    last_typed_seconds : 0
}

console.log(current_typing)
function clear_canvas() {
    ctx.fillStyle='rgb(30,30,30)';
    ctx.fillRect(0,0,c.width,c.height);
}

//Terminal width: 600
//Terminal height : 30 + 30 + 360

function draw_terminal() {
    //Top part of terminal
    ctx.beginPath()
    ctx.roundRect(c.width -700, c.height/2 - 240, 600, 30, 8)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fill()
    //Top filling part of terminal
    ctx.fillStyle='rgba(80,80,80,1)';
    ctx.rect(c.width -700, c.height/2 - 230, 600, 30)
    ctx.fill()
    //Buttom part of terminal
    ctx.beginPath()
    ctx.fillStyle='rgba(80,80,80,0.2)';
    ctx.rect(c.width -700, c.height/2 - 200, 600, 360, 8)
    ctx.fill()

    ctx.beginPath() //red circle
    ctx.fillStyle='rgba(255,80,80,0.9)';
    ctx.arc(c.width -120, c.height/2 - 220, 10, 0, 2 * Math.PI);
    ctx.fill()

    ctx.beginPath() //yellow circle
    ctx.fillStyle='rgba(200,200,80,0.9)';
    ctx.arc(c.width -145, c.height/2 - 220, 10, 0, 2 * Math.PI);
    ctx.fill()

    ctx.beginPath() //green circle
    ctx.fillStyle='rgba(80,255,80,0.9)';
    ctx.arc(c.width -170, c.height/2 - 220, 10, 0, 2 * Math.PI);
    ctx.fill()

    if(current_typing.index == 0 && current_typing.direction == -1) {
        current_typing.obj = randomProperty(info.whoami)
        console.log(current_typing.obj)
        current_typing.direction = 1

    } else if(current_typing.index == current_typing.obj[0].length + 1 + current_typing.obj[1].length) {
        if(current_typing.direction != 0) {
            current_typing.direction = 0
            current_typing.last_typed_seconds = current_typing.seconds

        } else if (current_typing.last_typed_seconds + 2 == current_typing.seconds) {
            current_typing.direction = -1
        } 
    }
    //Text
    ctx.fillStyle='hsl('+hue+',100%,50%)';
    ctx.textAlign = "left"
    ctx.font = "20px Ubuntu";
    fillColoredText(current_typing.obj[0], c.width -570, c.height / 2 - 212)
    ctx.font = "italic 15px Ubuntu";
    fillColoredText("%%(255,255,255)" + "Linux Terminal", c.width -690, c.height / 2 - 215)
    ctx.font = "15px Ubuntu";
    fillColoredText(terminal_string + current_typing.obj[1].substring(0, current_typing.index), c.width -690, c.height / 2 - 170, 580);
    current_typing.index = current_typing.index + current_typing.direction

    //Cube next to text
    cube_at = ctx.measureText(terminal_string + current_typing.obj[1].substring(0, current_typing.index)).width
    ctx.beginPath()
    ctx.fillStyle = "rgb(255,255,255)"
    ctx.fillRect(cube_at + (c.width - 1000), c.height / 2 - 190, 10, 20)
    ctx.fill()
}

function draw_timer() {
    ctx.fillStyle='hsl('+hue+',100%,50%)';
    ctx.textAlign = "center"
    ctx.font = "80px Lato";
    ctx.fillText(timer, c.width / 2, c.height / 2); 
}

function drawCurrentShow() {

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
    draw_terminal()
    drawCurrentShow()
    createRainbowColor()
    draw_timer()
}


draw()
window.setInterval(draw, 100);
var date = new Date();
timer = date.toLocaleTimeString();
window.setInterval(() => {
    var date = new Date();
    timer = date.toLocaleTimeString();
    current_typing.seconds = current_typing.seconds + 1
}, 1000);

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}