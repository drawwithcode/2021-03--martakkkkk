var img;
var mySong;
let data = [];
let mountains = [];

function preload() {
  img = loadImage("montagne.png");
  data = loadJSON("mountains.json");
  mySong = loadSound("song.mp3");
}

function setup() {
  console.log(data);
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < data.mountains.length; i++) {
    addMountains(
      random(windowWidth),
      random(windowHeight),
      data.mountains[i].location,
      data.mountains[i].height,
      data.mountains[i].name
    );
    mySong.loop();
  }
}

function draw() {
  mySong.rate((mouseX + 1) * 0.01);
  mySong.amp(mouseY / height);

  image(img, 0, 0);

  push();
  for (let i = 0; i < mountains.length; i++) {
    mountains[i].run();
  }
  pop();
}

function addMountains(x, y, height, location, name) {
  let bubbleColor;
  if (height == 8848) {
    bubbleColor = "red";
  } else {
    bubbleColor = "white";
  }
  const aNewBubble = new Bubble(x, y, location, bubbleColor, name);
  mountains.push(aNewBubble);
}
class Bubble {
  constructor(temp_x, temp_y, temp_r, temp_color, temp_name) {
    this.x = temp_x;
    this.y = temp_y;
    this.r = temp_r / 60;
    this.color = temp_color;
    this.name = temp_name;

    this.speed = 2;
    this.yDir = 1;
    this.xDir = 1;
  }

  display() {
    push();
    noStroke();
    fill(color(this.color));
    ellipse(this.x, this.y, this.r);
    textFont("Saira Condensed");
    textStyle(BOLD);
    textAlign(CENTER);
    fill(0);
    text(this.name, this.x, this.y);
    pop();
  }

  updatePosition() {
    this.x += this.speed * this.xDir;
    this.y += this.speed * this.yDir;
    if (this.y >= height || this.y <= 0) {
      this.yDir *= -1;
    }
    if (this.x >= width || this.x <= 0) {
      this.xDir *= -1;
    }
  }

  run() {
    this.updatePosition();
    this.display();
  }
}

