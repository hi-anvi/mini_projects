/*********************************
 * Drag to create a paint splat!!
*********************************/

var g = new Random(20);
var sd = 15;
var meanX = 0;
var meanY = 0;
var numPress = 0;
var mode = "draw";

var drawButton = function(x1, y1, t1, t2, t3) {
    stroke(0, 0, 0);
    fill(0, 255, 0);
    rect(x1, y1, 50, 20);
    fill(0, 0, 0);
    textSize(15);
    text(t1, x1 + 6, y1 + 16);
    fill(0, 255, 0);
    rect(x1 + 300, y1, 50, 20);
    fill(0, 0, 0);
    textSize(15);
    text(t2, x1 + 303, y1 + 16);
    fill(0, 255, 0);
    rect(x1 + 150, y1, 50, 20);
    fill(0, 0, 0);
    textSize(15);
    text(t3, x1 + 157, y1 + 16);
};

var drawScene1 = function() {
    background(255, 255, 255);
    drawButton(20, 350, "Clear", "Eraser", "Draw");
};

var Paint = function(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
};

Paint.prototype.splat = function() {
    for (var i = 0; i <= 50; i++) {
        var splatCircleX = sd * g.nextGaussian() + meanX;
        var splatCircleY = sd * g.nextGaussian() + meanY;
        fill(mouseY, 0, mouseX);
        noStroke();
        pushMatrix();
        translate(mouseX, mouseY);
        ellipse(splatCircleX, splatCircleY, this.size, this.size);
        playSound(getSound("rpg/hit-splat"));
        popMatrix();
        drawButton(20, 350, "Clear", "Eraser", "Draw");
    }
};

var pSplat = [];
drawScene1();

mouseDragged = function() {
    drawButton(20, 350, "Clear", "Eraser", "Draw");
    if(mouseX > 20 && mouseX <= 70 && mouseY > 350 && mouseY <= 370) {
        drawScene1();
        playSound(getSound("retro/thruster-short"));
    } else if (mouseX > 320 && mouseX <= 370 && mouseY > 350 && mouseY <= 370) {
        mode = "erase";
        fill(255, 255, 255);
        noStroke();
        rect(mouseX, mouseY, 30, 30);
        drawButton(20, 350, "Clear", "Eraser", "Draw");
    }
    else if (mode === "draw"){
        numPress ++;
        pSplat[numPress] = new Paint(mouseX, mouseY, random(5, 10));
        pSplat[numPress].splat();
        drawButton(20, 350, "Clear", "Eraser", "Draw");
    }else if ((mouseX > 170 && mouseX <= 220 && mouseY > 350 && mouseY <= 370)) {
        mode = "draw";
        drawButton(20, 350, "Clear", "Eraser", "Draw");
    }else {
        fill(255, 255, 255);
        noStroke();
        rect(mouseX, mouseY, 30, 30);
        playSound(getSound("rpg/battle-magic"));
        drawButton(20, 350, "Clear", "Eraser", "Draw");
    }
};
