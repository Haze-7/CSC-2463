let sprite;
let movements;
let spriteSheet = "";

let characters;


let eskimo;
let lime;
let ninja;


//curently truying to make groups/ subgroups from reference page for p5 play

//need to make a character class to make objectsS

//needs to have (x, y , height, width)
//needs to be able to fill in spriteSheet


function preload() {
  
  // eskimo = new Character(200, 200, 80, 80, spriteSheet, movements);
  // eskimo.spriteSheet = "assets/Eskimo.png";
  

  characters = [
    new Character(200, 200, 80, 80, "assets/Eskimo.png", movements),
    new Character(80, 80, 80, 80, "assets/Lime.png", movements),
    new Character(240, 240, 80, 80, "assets/Ninja.png", movements)
  ]

  characters.spriteSheet(spriteSheet);

  // eskimo = new Sprite(80, 80, 80, 80);
  // eskimo.spriteSheet = "assets/Eskimo.png";
  // sprite = new Sprite(200, 200, 80, 80);
  // sprite.spriteSheet = "assets/Lime.png";
  // lime = new Sprite(320, 320, 80, 80);
  // lime.spriteSheet ="assets/Ninja.png";

  //characters.anis.frameDelay = 8;//how many frames to wait before going to next frame / sets speed
  //this.sprite.addAnis(movements); //
  //characters.changeAni("walkRight"); //sets animation to 60fps

}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);

  characters.draw();
}


class Character {


  constructor (x, y, width, height, spriteSheet, movements) {
    this.sprite = new Sprite(x, y, width, height);
    this.spriteSheet = spriteSheet; // need to make a string
    this.sprite.addAnis(movements); //
    this.sprite.changeAni('stand');
  }
  
    movements = { //define as object
      stand: {row: 0, frames: 1}, //find where it is in style sheet (use index system)
      walkRight: {row: 0, col:1, frames: 8} //set column too / don't if 0 (default)
    };

    draw() {

      if (keyIsDown(RIGHT_ARROW))
      {
        Character.walkRight();
      }
      else if (keyIsDown(LEFT_ARROW))
      {
        Character.walkLeft();
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
    

    walkRight() {
      this.sprite.changeAni("walkRight")
      this.sprite.vel.x = 1; // makes character walk forward/ off screen to right
      this.sprite.scale.x = 1;
      this.sprite.vel.y = 0; // make unused axis to 0 / makes them stop
    }
    
    walkLeft() {
      cthis.sprite.changeAni("walkRight"); // same ani, just switch scale
      this.sprite.vel.x = -1; // makes chracter go left
      this.sprite.scale.x = -1;//same size, flip horizontally / not working?
      this.sprite.vel.y = 0; //unused axis
    }
    
    stand() {
      this.sprite.vel.x = 0; // stop moving left-right/ horizontally
      this.sprite.changeAni('stand'); // set to stand animation/ pose
    }
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