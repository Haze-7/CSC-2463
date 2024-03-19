
//sound setup
let membraneSynth = new Tone.PolySynth(Tone.MembraneSynth); 
let volume = new Tone.Volume(5) // create / set volume effect
let reverbLevel = new Tone.Reverb(1.75); //create / set revert effect/ level

//tank sprite setup
let sprite;

//shot sprite setup
let lookingLeft = false;
let bullet;
let shot;
let shotAnis;
let shotXPos;
let shotYPos;
let shotXVel;

//targets sprite setup
let target1;
let target2;
let numOfTargets = 0;

//Sound pathing
membraneSynth.connect(volume); // run through volume first
volume.connect(reverbLevel); // pipe through revereb effect
reverbLevel.toDestination(); // out to speakers


function preload() {
  //create tank sprite, its animations, and framerate/ default state
  sprite = new Sprite(200, 200, 42, 39);
  sprite.spriteSheet= "assets/tank.png";
  let animations = { //define as object
    stop: {row: 0, col: 2}, //find where it is in style sheet (use index system)
    driveRight: {row: 0, frames: 2}, //set column too / don't if 0 (default)
    shoot: {row: 0, col: 2, frames: 2},
    
  };
  sprite.anis.frameDelay = 15;//how many frames to wait before going to next frame / sets speed
  sprite.addAnis(animations); 
  sprite.changeAni("driveRight"); 


}

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(0);

  //display UI / Game Instructions
  textSize(20); // set text size
  fill("white");
  text("Welcome to Tank Shooter Demo", 55, 20);
  textSize(12);
  text("Controls:", 10, 35);
  textSize(7);
  fill("cyan");
  text("Move Right: Press D", 12, 50);
  text("Move Left: Press A", 12, 60);
  text("Shoot: Press LMB", 12, 70);

  targets();

  if (kb.pressing('d')) // drive right key check
  {
    driveRight()
    lookingLeft = false; // show that tank is NOT moving left for shot calculation
    
  
  }
  else if (kb.pressing('a')) // drive left key check
  {
    driveLeft();
    lookingLeft = true; // show that tank is moving left for shot calculation
  }
  else 
  {
    stop(); // if not moving, just stop
  }


}
//add sound (in shoot)
function mouseClicked() {
      shoot(); // shoot gun / run function when mouse pressed
    console.log("shooting");
    //play sound on shot
    membraneSynth.triggerAttackRelease("C1", "8n"); // trigger sound que for shot when mouse is clicked
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
  sprite.vel.x = .5; // slow down when shooting

  shotXPos = sprite.position.x + 25; // right shot position
  shotYPos = sprite.position.y - 5.2; // right shot position
  shotXVel = 3; // makes bullet go right

  if (lookingLeft === true) // if tank is looking left, move shot location to match tank barrel
  {
    shotXPos = sprite.position.x - 25; // left shot position
    shotYPos = sprite.position.y - 5.2; // left shot position
    shotXVel = -3; // makes bullet go left
    
  }

  //set bullet movement / creation
  shot = new Sprite(shotXPos, shotYPos, 10, 10); // create bullet sprite object to shoot
  shot.scale.x = 0.5; // set x size of bullet
  shot.scale.y = 0.5; // set y size of bullet

  shot.vel.x = shotXVel; //set velocity of bullet
  shot.vel.y = 0;
  
}
//creates 2 temporary targets for the tank to knock out
function targets()
{
  if (numOfTargets == 2)
  {
    
    target1 = new Sprite(385, 195, 25, 25); // create right target sprite

    target2 = new Sprite(15, 195, 25, 25); // create left target sprite
    a
  }
  numOfTargets++; 

}








