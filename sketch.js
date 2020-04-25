var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
 
var engine;
var world;
var boxes = [];
 
var ground;
var gSlider;
 
 
function setup() {
    createCanvas(1450,875);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
 
    gSlider = createSlider(0, 100, 50);
    gSlider.position(1450/2-50,height-40);
    gSlider.input = map(engine.world.gravity, gSlider.min, gSlider.max, 0, 1);
 
    var options = {
        isStatic: true
    }
    ground = Bodies.rectangle(1450/2, height - 50,1450,10, options);
    World.add(world, ground);
}
 
function mousePressed() {
    if (mouseY < 750) {
        boxes.push(new Box(mouseX, mouseY, random(10, 200), random(10, 200)));
    }
}
 
function draw() {
    background(0);
    var fVal = gSlider.value();
 
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }
    noStroke();
    fill(170);
    strokeWeight(4);
    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, width, 10);
    fill(255);
    textSize(15);
    text("Gravity " + fVal,600,850);
}
 
function Box(x, y, w, h, options) {
    var options = {
        friction: 0.5,
        restitution: 0.5,
    }
 
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
 
    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
 
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(0.5);
        stroke("red");
        fill("black");
        rect(0, 0, this.w, this.h);
        pop();
    }
}