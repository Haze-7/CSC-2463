let sprite;



function preload() {
  sprite = new Sprite(200, 200, 80, 80);
  sprite.spriteSheet= "assets/Eskimo.png";
  let animations = { //define as object
    stand: {row: 0, frames: 1}, //find where it is in style sheet (use index system)
    walkRight: {row: 0, col:1, frames: 8}, //set column too / don't if 0 (default)
    walkUp: {row: 5, frames: 6}, //0-5 frames, index, so start next at 6 \/
    walkDown: {row: 5, col: 6, frames: 6}
  };
  sprite.anis.frameDelay = 8;//how many frames to wait before going to next frame / sets speed
  sprite.addAnis(animations); //
  sprite.changeAni("walkRight"); //sets animation to 60fps
  // sprite.changeAni("walkLeft");
  // sprite.changeAni("walkUp");
  // sprite.changeAni("walkDown");

}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  if (kb.pressing('d'))
  {
    walkRight();
  }
  else if (kb.pressing('a'))
  {
    walkLeft();
  }
  else if (kb.pressing('w')) 
  {
    walkUp();
  }
  else if (kb.pressing('s'))
  {
    walkDown();
  }
  else 
  {
    stop();
  }

  function stop() {
    sprite.vel.x = 0;
    sprite.vel.y = 0;
    sprite.changeAni('stand');

  }

  //for project, stop fron walking out of bounds/ turn around
  if (sprite.x  + sprite.width/4 > width) // if sprite x is past edge of canvas(width)/ for right side sprite.width /2 gives padding
  { 
    walkLeft();
  }
  else if (sprite.x - sprite.width/4 < 0) //if touches left of canvas / x = 0 / padding spritelength /4
  {
    walkRight();
  }
  else if (sprite.y + sprite.height/4  > height)
  {
    walkUp();
  }
  else if (sprite.y - sprite.height/4 < 0)
  {
    walkDown();
  }
  //continue including walkup and down
}
//define functions to work directions (repetitive)
function walkRight() {
  sprite.changeAni("walkRight")
  sprite.vel.x = 1; // makes character walk forward/ off screen to right
  sprite.scale.x = 1;
  sprite.vel.y = 0; // make unused axis to 0 / makes them stop
}
function walkLeft() {
  sprite.changeAni("walkRight");
  sprite.vel.x = -1; // makes chracter go left
  sprite.scale.x = -1;//same size, flip horizontally / not working?
  sprite.vel.y = 0;
}
function walkUp() {
  sprite.changeAni("walkUp");
  sprite.vel.y = -1; //.y means y value/ -1 means subtract y so up
  sprite.vel.x = 0;
}
function walkDown() {
  sprite.changeAni("walkDown");
  sprite.vel.y = 1; // cdown bc increasing in y
  sprite.vel.x = 0;
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