
//sound setup
// let synth = new Tone.Synth;
// let membraneSynth = new Tone.PolySynth(Tone.MembraneSynth); 
// let metalSynth = new Tone.MonoSynth(Tone.MetalSynth);

//sprite setup
let sprite;
let lookingLeft = false;
let bullet;
let shot;
let shotAnis;
let shotXPos;
let shotYPos;
let shotXVel;



//GamePlan:

//make tank sprite that drives left and right and shoots DONE DONE DONE
//tank makes noise while moving
//tank makes noise while shooting and does animation


//TO DO
//sprite sheet DONE
//walking/driving animation DONE
//shoot animation DONE
//shoot function DONE
//mouse pressed function DONE
//add ^^ 
//create gun sound / move sound
//link sound to action

//set up notes
// let notes = {
//   'a' : 'C6', // replace / change later
//   'w' : 'C#6', // #w 
//   's' : 'D6',
//   'e' : 'D#6', // #e 
//   'd' : 'F6',
//   'r' : 'F#6', //#r
//   'f' : 'G6',
//   't' : 'G#6', //#t
//   'g' : 'A6',
//   'y' : 'A#6', //#y
//   'h' : 'B6',
//   'j' : 'C6'
// }

function preload() {
  spriteSheet = loadImage("assets/tank.png");

  sprite = new Sprite(200, 200, 42, 39);
  sprite.spriteSheet= "assets/tank.png";
  let animations = { //define as object
    stop: {row: 0, col: 2}, //find where it is in style sheet (use index system)
    driveRight: {row: 0, frames: 2}, //set column too / don't if 0 (default)
    shoot: {row: 0, col: 2, frames: 2},
    
  };
  sprite.anis.frameDelay = 14;//how many frames to wait before going to next frame / sets speed
  sprite.addAnis(animations); //
  sprite.changeAni("driveRight"); //sets animation to 60fps


}

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(0);
  

  if (kb.pressing('d'))
  {
    driveRight()
    lookingLeft = false;
    
  
  }
  else if (kb.pressing('a'))
  {
    driveLeft();
    lookingLeft = true;
  }
  else 
  {
    stop();
  }


}
//add sound (in shoot)
function mouseClicked() {
      shoot();
    console.log("shooting");
}


function stop() {
  sprite.vel.x = 0;
  sprite.vel.y = 0;
  sprite.changeAni('stop');

}



//driving / movement
function driveRight() {
  sprite.changeAni("driveRight")
  sprite.vel.x = 1; // makes character walk forward/ off screen to right
  sprite.scale.x = 1;
  sprite.vel.y = 0; // make unused axis to 0 / makes them stop
}
function driveLeft() {
  sprite.changeAni("driveRight");
  sprite.vel.x = -1; // makes chracter go left
  sprite.scale.x = -1;//same size, flip horizontally / not working?
  sprite.vel.y = 0;

  
}
// ADD SOUND activation for shot
function shoot() {
  //set movement of sprite tank
  sprite.changeAni("shoot");
  sprite.vel.x = .5;

  shotXPos = sprite.position.x + 25;
  shotYPos = sprite.position.y - 5.2;
  shotXVel = 3;

  if (lookingLeft === true)
  {
    shotXPos = sprite.position.x - 25;
    shotYPos = sprite.position.y - 5.2;
    shotXVel = -3;
    
  }

  //set bullet movement / creation
  shot = new Sprite(shotXPos, shotYPos, 10, 10);
  shot.scale.x = 0.5;
  shot.scale.y = 0.5;

  shot.vel.x = shotXVel;;
  shot.vel.y = 0;
  
}








