let characters;

function preload() {
  //let characters = new Group();

  characters = new Sprite(200, 200, 80, 80);
  characters.spriteSheet = "assets/Eskimo.png";

  // characters = [
  //   new Character(200, 200, 80, 80, "assets/Eskimo.png", movements),
  //   new Character(80, 80, 80, 80, "assets/Lime.png", movements),
  //   new Character(240, 240, 80, 80, "assets/Ninja.png", movements)
  // ];

  let movements = { //define as object
    stand: {row: 0, frames: 1}, //find where it is in style sheet (use index system)
    walkRight: {row: 0, col:1, frames: 8} //set column too / don't if 0 (default)
  };

characters.anis.frameDelay = 8;//how many frames to wait before going to next frame / sets speed
characters.addAnis(movements); //
characters.changeAni("walkRight"); //sets animation to 60fps

}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);

  if (keyIsDown(RIGHT_ARROW))
  {
    walkRight();
  }
  else if (keyIsDown(LEFT_ARROW))
  {
    walkLeft();
  }
  else
  {
    stand();
  }

  //bounds check to keep character within screen
  if (characters.x + characters.width / 3 > width) // if walk into right wall / edge
  {
    walkLeft(); //turn around
  }
  else if (characters.x - characters.width / 3 < 0) // if walk into left wall/ edge
  {
    walkRight(); // turn around
  }
}

class Character {

  constructor (x, y, height, width, spriteSheet, moevements) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.spriteSheet = spriteSheet;
    this.movements = movements;
  }
  //Create sprite (x, y, height, width)
  //set sprite sheet
  //anis.frameDelay = 8
  //addAnis(movements)
  // .changeAni('stand')

  createSprite (x, y, height, width) {
    
  }


}

function walkRight() {
  characters.changeAni("walkRight")
  characters.vel.x = 1; // makes character walk forward/ off screen to right
  characters.scale.x = 1;
  characters.vel.y = 0; // make unused axis to 0 / makes them stop
}

function walkLeft() {
  characters.changeAni("walkRight"); // same ani, just switch scale
  characters.vel.x = -1; // makes chracter go left
  characters.scale.x = -1;//same size, flip horizontally / not working?
  characters.vel.y = 0; //unused axis
}

function stand() {
  characters.vel.x = 0; // stop moving left-right/ horizontally
  characters.changeAni('stand'); // set to stand animation/ pose
}