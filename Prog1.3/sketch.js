let sprite;
let movements;
let characters = [];


function preload() {
  // determines location of desired frame within spritesheet 
  movements = { //define as object
    stand: {row: 0, frames: 1}, //find where it is in style sheet (use index system)
    walkRight: {row: 0, col:1, frames: 8} //set column too / don't if 0 (default)
  };
  //add / create new characters 
  characters.push(new Character(100, 100, 80, 80, "assets/Eskimo.png", movements));
  characters.push(new Character(200, 200, 80, 80, "assets/Lime.png", movements));
  characters.push(new Character(280, 280, 80, 80, "assets/Ninja.png", movements));

}

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);
  //for all the characters within the characters array
  characters.forEach((character) => {

  if (keyIsDown(RIGHT_ARROW)) // if right arrow is held down
  {
    character.walkRight(); // display walk right animation / velocity(1)
  }
  else if (keyIsDown(LEFT_ARROW))//if left arrow is held down
  {
    character.walkLeft(); //display let walk animation / velocity(-1)
  }
  else // if nothing is held down/ all released
  {
    character.stand(); //stand still and stop walking
  }
})
}
//wrapping character class
class Character {

  constructor (x, y, width, height, spriteSheet, movements) {
    this.sprite = new Sprite(x, y, width, height); // add param
    this.sprite.spriteSheet= spriteSheet; // add param

    this.sprite.anis.frameDelay = 8;//how many frames to wait before going to next frame / sets speed
    this.sprite.addAnis(movements); //add the animations / movements selected by movements in preload()
    this.sprite.changeAni("stand"); //select ^^ animation to display
    }

    //implementation of walking animations / speed
    walkRight() {
      this.sprite.changeAni("walkRight")
      this.sprite.vel.x = 1; // makes character walk forward/ off screen to right
      this.sprite.scale.x = 1; // right facing
      this.sprite.vel.y = 0; // make unused axis to 0 / makes them stop
    }
    
    walkLeft() {
      this.sprite.changeAni("walkRight"); // same ani, just switch scale
      this.sprite.vel.x = -1; // makes character go left
      this.sprite.scale.x = -1;//same size, flip horizontally 
      this.sprite.vel.y = 0; //unused axis
    }
    
    stand() {
      this.sprite.vel.x = 0; // stop moving left-right/ horizontally
      this.sprite.changeAni('stand'); // set to stand animation/ pose
    }

 
  }