/*****************************************************
 * Has holes on ground in level 1 that decrease score
 * There are 2 levels
 * Has NPCs (bugs) that eat the sticks
 * Has score in level 2
 * Has a cooler lose and win state
 * Has made the game a lot more difficult to win
****************************************************/

var s1y = 30;
var s2y = -400;

var Bug = function(x, y) {
    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 50;
    this.img = getImage("cute/EnemyBug");
};

Bug.prototype.draw = function() {
    image(this.img, this.x, this.y, this.width, this.height);
};

var Hole = function(x, y) {
    this.x = x;
    this.y = y;        
    this.height = 10;
    this.width = 50;
    this.color = color(135, 85, 40);
};
    
Hole.prototype.draw = function() {
    fill(this.color);
    ellipse(this.x, this.y, this.width, this.height);
};

var Beaver = function(x, y) {
    this.x = x;
    this.y = y;
    this.img = getImage("creatures/Hopper-Happy");
    this.sticks = 0;
    this.bug = 0;
};

Beaver.prototype.draw = function() {
    fill(255, 0, 0);
    this.y = constrain(this.y, 0, height-50);
    image(this.img, this.x, this.y, 40, 40);
};

Beaver.prototype.hop = function() {
    this.img = getImage("creatures/Hopper-Jumping");
    this.y -= 5;
};

Beaver.prototype.fall = function() {
    this.img = getImage("creatures/Hopper-Happy");
    this.y += 5;
};

Beaver.prototype.checkForStickGrab = function(stick) {
    if ((stick.x >= this.x && stick.x <= (this.x + 40)) &&
        (stick.y >= this.y && stick.y <= (this.y + 40))) {
        stick.y = -400;
        this.sticks++;
    }
};

Beaver.prototype.getThroughHole = function(hole, stick) {
    if(this.x >= hole.x - 25 && this.x <= hole.x + 25 && this.y >= hole.y - 40){
        hole.y = 500;
        this.sticks = this.sticks - 1;
    }
};

Beaver.prototype.checkBugGrab = function(bug) {
    if ((bug.x >= this.x - 50 && bug.x <= (this.x + 25)) &&
        (bug.y + 20 >= this.y && bug.y <= (this.y + 30))) {
        bug.y = -400;
        this.bug--;
    }
};

Beaver.prototype.hitGround = function() {
    if (this.y + 40 > 350) {
        this.bug--;
    }
};

var Stick = function(x, y) {
    this.x = x;
    this.y = y;
};

Stick.prototype.draw = function() {
    fill(89, 71, 0);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 40);
};

var beaver = new Beaver(200, 300);
var hole = [];
var sticks = [];
var bug = [];

for (var i = 0; i < 40; i++) {  
    sticks.push(new Stick(i * 40 + 300, random(20, 260)));
}

for (var i = 40; i < 80; i+=2) {  
    bug.push(new Bug(i * 40 + 300, random(20, 260)));
}

var plus = random(1.5, 10);
for (var i = 2; i < 40; i+= plus) { 
    plus = random(1.5, 5);
    hole.push(new Hole(i * 40 + 300, 350));
}

var grassXs = [];
for (var i = 0; i < 25; i++) { 
    grassXs.push(i*20);
}

draw = function() {
    
    // static
    background(227, 254, 255);
    fill(130, 79, 43);
    rectMode(CORNER);
    rect(0, height*0.90, width, height*0.10);
    
    for (var i = 0; i < grassXs.length; i++) {
        image(getImage("cute/GrassBlock"), grassXs[i], height*0.85, 20, 20);
        grassXs[i] -= 1;
        if (grassXs[i] <= -20) {
            grassXs[i] = width;
        }
    }
    
    for (var i = 0; i < sticks.length; i++) {
        sticks[i].draw();
        beaver.checkForStickGrab(sticks[i]);
        sticks[i].x -= 1;
    }
    
    for (var i = 0; i < bug.length; i++) {
        bug[i].draw();
        beaver.checkBugGrab(bug[i]);
        bug[i].x -= 1;
    }
    textSize(18);
    text("Score: " + beaver.sticks, 20, s1y);
    text("Score: " + beaver.bug, 20, s2y);
    text("Level 1", 325, s1y);
    text("Level 2", 325, s2y);
    
    if (sticks[39].x < 200 && beaver.sticks/sticks.length >= 0.8) {
        textSize(18);
        s1y = -400;
        s2y = 30;
        beaver.hitGround();
    }else if (sticks[39].x < 200 && beaver.sticks/sticks.length < 0.8) {
        draw = function() {
            fill(0, 0, 0);
            textSize(20);
            background(255, 255, 0);
            text("You failed to proceed to the next level (-_-)", 15, 200); 
        };
    }
    for (var i = 0; i < hole.length; i++) {
        hole[i].draw();
        beaver.getThroughHole(hole[i]);
        hole[i].x -= 1;
    }
    if (bug[19].x < 200 && beaver.bug >= -3) {
        draw = function() {
            background(0, 255, 0);
            textSize(50);
            text("YOU WON!!", 65, 225);
        };
    }else if(bug[19].x < 200 && beaver.bug < -3) {
        background(255, 0, 0);
        textSize(50);
        text("YOU LOST", 75, 225);
    }
    
    if (keyIsPressed && keyCode === 0) {
        beaver.hop();
    } else {
        beaver.fall();
    }
    
    beaver.draw();
};
