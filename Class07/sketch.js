let sprite;

let characters = []; //create array



function preload() {

  //leave in preload
  let animations = { //define as object
    stand: {row: 0, frames: 1}, //find where it is in style sheet (use index system)
    walkRight: {row: 0, col:1, frames: 8}, //set column too / don't if 0 (default)
    walkUp: {row: 5, frames: 6}, //0-5 frames, index, so start next at 6 \/
    walkDown: {row: 5, col: 6, frames: 6}
  };

  //define new character
  //put new characters into array
  characters.push(new Character(100, 100, 80, 80, "assets/Eskimo.png", animations));
  characters.push(new Character(200, 200, 80, 80, "assets/Eskimo.png", animations));

  // sprite = new Sprite(200, 200, 80, 80);
  // sprite.spriteSheet= "assets/Eskimo.png";
  // let animations = { //define as object
  //   stand: {row: 0, frames: 1}, //find where it is in style sheet (use index system)
  //   walkRight: {row: 0, col:1, frames: 8}, //set column too / don't if 0 (default)
  //   walkUp: {row: 5, frames: 6}, //0-5 frames, index, so start next at 6 \/
  //   walkDown: {row: 5, col: 6, frames: 6}
  // };
  // sprite.anis.frameDelay = 8;//how many frames to wait before going to next frame / sets speed
  // sprite.addAnis(animations); //
  // sprite.changeAni("walkRight"); //sets animation to 60fps
  // sprite.changeAni("walkLeft");
  // sprite.changeAni("walkUp");
  // sprite.changeAni("walkDown");

}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  //explanation of forEach for array
  characters.forEach((character) => {
    if (kb.pressing('d')) // replace with arrows / other option 
  {
  character.walkRight(); // set to call character version of it
  }
  else if (kb.pressing('a'))
  {
    character.walkLeft();
  }
  else if (kb.pressing('w')) 
  {
    character.walkUp();
  }
  else if (kb.pressing('s'))
  {
    character.walkDown();
  }
  else 
  {
    character.stop();
  }

  })
   //changed to character.sprite
  // if (character.sprite.x  + character.sprite.width/4 > width) // if sprite x is past edge of canvas(width)/ for right side sprite.width /2 gives padding
  // { 
  //   walkLeft();
  // }
  // else if (character.sprite.x - character.sprite.width/4 < 0) //if touches left of canvas / x = 0 / padding spritelength /4
  // {
  //   walkRight();
  // }
  // else if (character.sprite.y + character.sprite.height/4  > height)
  // {
  //   walkUp();
  // }
  // else if (character.sprite.y - character.sprite.height/4 < 0)
  // {
  //   walkDown();
  // }


  //for project, stop fron walking out of bounds/ turn around
  // if (sprite.x  + sprite.width/4 > width) // if sprite x is past edge of canvas(width)/ for right side sprite.width /2 gives padding
  // { 
  //   walkLeft();
  // }
  // else if (sprite.x - sprite.width/4 < 0) //if touches left of canvas / x = 0 / padding spritelength /4
  // {
  //   walkRight();
  // }
  // else if (sprite.y + sprite.height/4  > height)
  // {
  //   walkUp();
  // }
  // else if (sprite.y - sprite.height/4 < 0)
  // {
  //   walkDown();
  // }

}


// function keyTyped() { // allow keyboard control of character /  heck for key to be typed
//   switch(key){ //when key is __ do __
//     case 'd': //when key is d
//       walkRight();
//       break;
//     case 'a':
//       walkLeft();
//       break;
//     case 'w':
//       walkUp();
//       break;
//     case 's':
//       walkDown();
//       break;
//   }
//}


//old code good for studying
/*
 sprite.rotation(45); //rotates to angle 45 DEGREES
  sprite.rotation++; does the full rotation like before
sprite.color = blue; sets sprite color
sprite = new Sprite(200, 200); //instantiate sprite object
*/ 

//how to set up wrapper class (multiple objects)

//create class w/ constructor w/ those parameters
//copy preload above/ change this.sprite and params
//does all these things when you call (new Character) (character array)
class Character {
  constructor(x, y, width, height, spriteSheet, animations) {
    this.sprite = new Sprite(x, y, width, height); // add param
    this.sprite.spriteSheet= spriteSheet; // add param

    this.sprite.anis.frameDelay = 8;//how many frames to wait before going to next frame / sets speed
    this.sprite.addAnis(animations); //
    this.sprite.changeAni("stand"); //sets animation to 60fps
  }

  //all moved into class
  walkRight() {
    this.sprite.changeAni("walkRight")
    this.sprite.vel.x = 1; // makes character walk forward/ off screen to right
    this.sprite.scale.x = 1;
    this.sprite.vel.y = 0; // make unused axis to 0 / makes them stop
  }
  walkLeft() {
    this.sprite.changeAni("walkRight");
    this.sprite.vel.x = -1; // makes chracter go left
    this.sprite.scale.x = -1;//same size, flip horizontally / not working?
    this.sprite.vel.y = 0;
  }
  walkUp() {
    this.sprite.changeAni("walkUp");
    this.sprite.vel.y = -1; //.y means y value/ -1 means subtract y so up
    this.sprite.vel.x = 0;
  }
  walkDown() {
    this.sprite.changeAni("walkDown");
    this.sprite.vel.y = 1; // cdown bc increasing in y
    this.sprite.vel.x = 0;
  }

  stop() {
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 0;
    this.sprite.changeAni("stand");

  }
}