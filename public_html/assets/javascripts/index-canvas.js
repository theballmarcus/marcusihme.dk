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

CanvasRenderingContext2D.prototype.fillColoredText = function(fstr,x,y,max_x) {
    old_c = ""
    cText = ""
    cx = x
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
                } else {
                    counter_closing++ 
                }
            }
            counter_closing = 0
        } else {
            if(old_c !== undefined) {
                if((cx - x) > max_x) {
                    cx = x
                    y = y + 20
                }
                cText += old_c
                ctx.fillText(old_c, cx, y)
                cx = cx + ctx.measureText(old_c).width
            }
        }
        old_c = fstr[i]
    }
}
CanvasRenderingContext2D.prototype.fillColoredTextProt = async function(fstr,x,y,max_x) {
    writeThis = []
    old_character = ""
    cx = x
    cur_word = ""
    for(i in fstr + 1) {
        if(fstr[i] === "%" && old_character === "%" ) {
            found_closing = false;
            counter_closing = i;
            while (!found_closing) {
                if(fstr[counter_closing] === ")") {
                    c_color = fstr.substring(i, counter_closing).replace("%(", "").split(",")
                    fstr = fstr.replace("%" + fstr.substring(i, counter_closing), "")
                    writeThis.push([c_color[0], c_color[1], c_color[2]])
                    found_closing = true
                    break
                } else {
                    counter_closing++ 
                }
            }
            counter_closing = 0
        } else {
            if(old_character !== undefined) {
                if(old_character == " " || i == fstr.length) {
                    writeThis.push(cur_word)
                    cur_word = ""
                } else {
                    cur_word += old_character
                }
            }
        }
        old_character = fstr[i]
    }
    console.log(writeThis)
    for(i in writeThis) {
        if(typeof writeThis[i] === "object") {
            ctx.fillStyle = `rgb(${writeThis[i][0]}, ${writeThis[i][1]}, ${writeThis[i][2]})`
        } else {
            if(cx + ctx.measureText(writeThis[i]).width - x > max_x) {
                cx = x
                y += 20
            }
            for(j of writeThis[i]) {
                ctx.fillText(j, cx, y)
                cx += ctx.measureText(j).width
            }
            ctx.fillText(" ", cx, y)
            cx += ctx.measureText(" ").width
        }
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
        "How old am I?" : "I'm currently 15 years old.",
        "How old were you when you started developing?" : "I was 9 years old when I got this domain. That's what inspired me to start developing.",
        "What is my dream?" : "I'm fighting for a more balanced world. I want a more fair and equal world.",
        "How can the world become more fair / equal?" : "That's what I want to figure out.",
        "My favorite food." : "I really enjoy pizza.",
        "Do I want to speak to you?" : "That depends on what you have to offer. If you're just looking for a friendly smalltalk, I won't be the right person.",
        "How can you learn to code?" : "You'll have to be very patient and find motivation in small succeses. You'll probably also need to meet some new people that likes to code as well.",
        "Hello" : "Hey stranger :)",
        "What code IDE do I use?" : "I prefer using VS Code since it is open source and compatible with linux. It is very light weigth as well.",
        "Do you have some kind of super computer?" : "No - I don't - and you don't need one to start coding either. You are probably not gonna write a huge program, that draws more computing power than a standard cheap pc can provide. At least not to begin with.",
        "What programs are important to know?" : "GitHub, some kind of IDE like vscode and Discord are the most important programs to know. Escpecially Discord in my opinion.",
        "What Discord servers should I join?" : "You can basicly join any Discord server for developers. I suggest using Coding Pirates Discord Server if you're a Danish person. www.codingpirates.dk/discord",
        "Where can I suggest more questions / answers to this website?" : "The website is on GitHub at www.github.com/theballmarcus/marcusihme.dk/ - go ahead and drop a pull request!",
        "Is computers your biggest interest?" : "No - social relations and being healthy is much more important to me. But apart from theese, then yes - computers is my biggest hobby. This includes gaming.",
        "What is my favorite game?" : "I have a few of thoose. Head to my steam page at www.steamcommunity.com/users/theballmarcus/ to find out.",
        "What do you do when you done code or hack?" : "I spent a lot of time in my school. I also enjoy spending time with my friends.",
        "Where do you live?" : "I'm sorry, but I can't see how this is relevant for you."
    },
    findme : {
        default : {
            type : "Who am I?",
            name : "Th3B4llMarcus",
            link : "#",
            img_id : "default",
            seconds_img_id : "default",
            description : "Hi, I'm Marcus. I'm a developer, hacker and student. Feel free to contact me on any of the following medias.",
            color : [153, 0, 0, 0.3]
        },
        discord : {
            type : "Discord",
            name : "Marcus#4055",
            link : "https://discordapp.com/users/297044132252090368/",
            img_id : "discord",
            seconds_img_id : "discord_profile_pic",
            description : "Find me on discord.",
            color : [44, 47, 51, 0.3]
        },
        github : {
            type : "GitHub",
            name : "theballmarcus",
            link : "http://www.github.com/theballmarcus/",
            img_id : "discord",
            seconds_img_id : "discord_profile_pic",
            description : "My GitHub profile is where I upload all my code. Go check it out if you'd like to see some of my code projects - it's probably also here that you will find the most detailed description of me.",
            color : [44, 47, 51, 0.3]
        },
        mail : {
            type : "Mail",
            name : "mcihme@gmail.com",
            link : "mailto:mcihme@gmail.com",
            img_id : "discord",
            seconds_img_id : "discord_profile_pic",
            description : "You can always reach me at my mail accoumts. This is not a spam invitation though.",
            color : [44, 47, 51, 0.3]
        },
        reddit : {
            type : "Reddit",
            name : "TheBallMarcus",
            link : "www.reddit.com/u/theballmarcus",
            img_id : "discord",
            seconds_img_id : "discord_profile_pic",
            description : "It might be hard to reach me on reddit, but feel free to give it a try. I won't complain if you try.",
            color : [44, 47, 51, 0.3]
        },
        instagram : {
            type : "Instagram",
            name : "TheBallMarcus",
            link : "www.instagram.com/u/theballmarcus",
            img_id : "discord",
            seconds_img_id : "discord_profile_pic",
            description : "I'm not very active on instagram, but go like all my photos. This is a joke of course, please don't - it would be creepy.",
            color : [44, 47, 51, 0.3]
        },
        twitter : {
            type : "Twitter",
            name : "TheBallMarcus",
            link : "www.twitter.com/theballmarcus",
            img_id : "discord",
            seconds_img_id : "discord_profile_pic",
            description : "I'm planning on making some kind of twitter bot someday. I don't know what it'll do, but I would like to explore their API.",
            color : [50, 50, 255, 1]
        },
    }
}
var active_findme = info.findme.default

terminal_string = "%%(0,0,255)[%%(0,255,255)th3b4llmarcus%%(0,0,255)@%%(255,0,255)unh4ck4bl3%%(0,0,255)] --> [%%(255,0,255)$%%(0,0,255)] %%(255,255,255)"
seconds_terminal_string = "%%(0,0,255)[%%(0,255,255)public_user%%(0,0,255)@%%(255,0,255)unh4ck4bl3%%(0,0,255)] --> [%%(255,0,255)$%%(0,0,255)] %%(255,255,255)"

var current_typing = {
    obj : randomProperty(info.whoami),
    index : 0,
    direction : 1,
    seconds : 0,
    last_typed_seconds : 0
}

function clear_canvas() {
    ctx.fillStyle='rgba(120,120,0, 0.5)';
    ctx.fillRect(0,0,c.width,c.height);
}

//Terminal width: 600
//Terminal height : 30 + 30 + 360
function choose_active_profile() {
    results = []
    for(key of Object.keys(info.findme)) {
        if(key.includes(typed_string)) {
            results.push(key)
        }
    }
    if(results.length === 1) {
        active_findme = info.findme[results[0]]
    } else {
        active_findme = info.findme["default"]
    }
}

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
    ctx.fillStyle='rgba(20,20,20,0.8)';
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
    ctx.fillText(current_typing.obj[0], c.width -570, c.height / 2 - 212)
    ctx.fillStyle='#ffffff';
    ctx.font = "italic 15px Ubuntu";
    ctx.fillText("Linux Terminal", c.width -690, c.height / 2 - 215)
    ctx.font = "15px Ubuntu";
    ctx.fillColoredTextProt(terminal_string + current_typing.obj[1].substring(0, current_typing.index), c.width -690, c.height / 2 - 170, 580);
    current_typing.index = current_typing.index + current_typing.direction
}

function draw_text() {
    ctx.font = "40px Comforta";
    ctx.textAlign = "left"
    header = "Hello! I'm Th3B4llMarcus. I'm a developer, hacker and a student."
    colored_header = "%%(255,255,255)Hello! I'm Th3B4llMarcus. I'm a developer, hacker and a student."
    subheader = "Type in the terminal below to find information about me. There's a list of different platforms that you can find me on."
    ctx.fillColoredText(colored_header, c.width / 2 - (ctx.measureText(header).width / 2), 100, c.width - 200);

    //Line between header and subheader
    ctx.beginPath()
    ctx.roundRect(c.width / 2 - (ctx.measureText(header).width / 2) - 100, 107, ctx.measureText(header).width + 200, 1, 4)
    ctx.fillStyle = "rgb(255,255,255)"
    ctx.fill()
    ctx.font = "20px Comforta";
    ctx.fillText(subheader, c.width / 2 - (ctx.measureText(subheader).width / 2), 145);
}

function draw_timer() {
    ctx.fillStyle='hsl('+hue+',100%,50%)';
    ctx.textAlign = "center"
    ctx.font = "80px Lato";
    ctx.fillText(timer, c.width / 2, c.height / 2); 
}

function drawInformation() {
    //Top part of terminal
    ctx.beginPath()
    ctx.roundRect(20, c.height/5, 600, 30, 8)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fill()

    //Top filling part of terminal
    ctx.fillStyle='rgba(80,80,80,1)';
    ctx.rect(20, c.height/5 + 20, 600, 30)
    ctx.fill()

    //Buttom part of terminal
    ctx.beginPath()
    ctx.fillStyle='rgba(20,20,20,0.8)';
    ctx.rect(20, c.height/5 + 50, 600, 450, 8)
    ctx.fill()

    ctx.beginPath() //red circle
    ctx.fillStyle='rgba(255,80,80,0.9)';
    ctx.arc(600, c.height/5 + 25, 10, 0, 2 * Math.PI);
    ctx.fill()

    ctx.beginPath() //yellow circle
    ctx.fillStyle='rgba(200,200,80,0.9)';
    ctx.arc(575, c.height/5 + 25, 10, 0, 2 * Math.PI);
    ctx.fill()

    ctx.beginPath() //green circle
    ctx.fillStyle='rgba(80,255,80,0.9)';
    ctx.arc(550, c.height/5 + 25, 10, 0, 2 * Math.PI);
    ctx.fill()
    //Text
    ctx.textAlign = "left"
    ctx.font = "italic 15px Ubuntu";
    ctx.fillStyle = "#ffffff"
    ctx.fillColoredText("Linux Terminal", 30, c.height / 5 + 30)
    ctx.font = "15px Ubuntu";
    ctx.fillColoredText(seconds_terminal_string + "ls", 30, c.height / 5 + 80, 580);
    ctx.fillText(Object.keys(info.findme).join("    "), 30, c.height / 5 + 100, 580);
    ctx.fillColoredText(seconds_terminal_string + typed_string, 30, c.height / 5 + 120, 580);
    current_typing.index = current_typing.index + current_typing.direction

    ctx.beginPath()
    ctx.roundRect(120, c.height/5*2, 400, 300, 20)
    ctx.fillStyle = `rgba(${active_findme.color[0]}, ${active_findme.color[1]}, ${active_findme.color[2]}, ${active_findme.color[3]})`;
    ctx.fill()

    ctx.font = "25px Ubuntu";
    ctx.textAlign = "left"
    ctx.fillStyle = "#ffffff"
    ctx.fillText(active_findme.type, 220, c.height/5*2 + 60);
    ctx.font = "15px Ubuntu";
    ctx.fillColoredText("%%(255,255,255)" + active_findme.description, 150, c.height/5*2 + 120, 340);
    ctx.font = "13px Ubuntu";
    ctx.fillText("Find me : " + active_findme.name, 230, c.height/5*2 + 30, 340);

    ctx.drawImage(document.getElementById(active_findme.img_id), 140, c.height/5*2 + 20, 60, 60)
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
    choose_active_profile()
    draw_terminal()
    drawInformation()
    createRainbowColor()
    draw_timer()
    draw_text()
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

//You are probably not gonna touch this code in... well forever
function setResizeHandler(callback, timeout) {
    var timer_id = undefined;
    window.addEventListener("resize", function() {
        if(timer_id != undefined) {
            clearTimeout(timer_id);
            timer_id = undefined;
        }
        timer_id = setTimeout(function() {
            timer_id = undefined;
            callback();
        }, timeout);
    });
}
function resizeCanvas() {
    var c = document.getElementById("myCanvas");
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    var ctx = c.getContext("2d");
}

setResizeHandler(resizeCanvas, 0);