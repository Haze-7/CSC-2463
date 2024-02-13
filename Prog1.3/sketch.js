let sprite;
let characters;
let createChars;

let eskimoChar;
let limeChar;
let ninjaChar;

//curently truying to make groups/ subgroups from reference page for p5 play

//need to make a character class to make objects

//needs to have (x, y , height, width)
//needs to be able to fill in spriteSheet


function preload() {

  characters = new Group();
    characters.x = 200;
    characters.y = 200;
    characters.height = 80;
    characters.width =  80;


  sprite = new characters.Sprite();
  sprite.spriteSheet = "assets/Eskimo.png";



  //sprite = new Sprite(250, 150, 80, 80);
  //sprite.spriteSheet = "assets/Lime.png";
  
  //sprite = new Sprite(150, 140, 80, 80);
  //sprite.spriteSheet = "assets/Ninja.png";

  let movements = { //define as object
    stand: {row: 0, frames: 1}, //find where it is in style sheet (use index system)
    walkRight: {row: 0, col:1, frames: 8} //set column too / don't if 0 (default)
  };

sprite.anis.frameDelay = 8;//how many frames to wait before going to next frame / sets speed
sprite.addAnis(movements); //
sprite.changeAni("walkRight"); //sets animation to 60fps

}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  if (keyCode === RIGHT_ARROW)
  {
    walkRight();
  }
  else if (keyCode === LEFT_ARROW)
  {
    walkLeft();
  }
  else 
  {
    stand();
  }

}


class Character {

  constructor (x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  setup() {
    characters = new Group();
    characters.x = 200;
    characters.y = 200;
    characters.height = 80;
    characters.width =  80;
  }


}


    

    //sprite = new Sprite(x, y, width, height)
    //sprite.spriteSheet = "assets/Eskimo.png";

// function KeyPressed() {
//  if (keyCode === LEFT_ARROW) 
//   {
//     walkRight();//walk right
//   }
//   else if (keyCode === RIGHT_ARROW)
//   {
//     walkLeft();//walk left
//   }
// }

function walkRight() {
  sprite.changeAni("walkRight")
  sprite.vel.x = 1; // makes character walk forward/ off screen to right
  sprite.scale.x = 1;
  sprite.vel.y = 0; // make unused axis to 0 / makes them stop
}

function walkLeft() {
  sprite.changeAni("walkRight"); // same ani, just switch scale
  sprite.vel.x = -1; // makes chracter go left
  sprite.scale.x = -1;//same size, flip horizontally / not working?
  sprite.vel.y = 0; //unused axis
}

function stand() {
  sprite.vel.x = 0; // stop moving left-right/ horizontally
  sprite.changeAni('stand'); // set to stand animation/ pose
}

// characters = [
//   new Character(200, 200, 80, 80),
//   new Character(250, 250, 80, 80)
// ]

 // constructor(xLoc, yLoc, charWidth, charHeight) {
  //   this.xLoc = xLoc;
  //   this.yLoc = yLoc;
  //   this.charWidth = charWidth;
  //   this.charHeight = charHeight;