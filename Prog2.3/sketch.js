
//sound setup
//let synth = new Tone.Synth;
let membraneSynth = new Tone.PolySynth(Tone.MembraneSynth); 
// let metalSynth = new Tone.MonoSynth(Tone.MetalSynth);
let volume = new Tone.Volume(5)
let reverbLevel = new Tone.Reverb(1.75); 
//sprite setup
let sprite;
let lookingLeft = false;
let bullet;
let shot;
let shotAnis;
let shotXPos;
let shotYPos;
let shotXVel;

let target1;
let target2;
let numOfTargets = 0;




//fix and set to appropriate sound path
// synth.connect(bend); // route synth to bend
// bend.toDestination(); // route bend to audio out
// membraneSynth.connect(bend); // route synth to bend
// bend.toDestination(); // route bend to audio out
// metalSynth.connect(bend); // route synth to bend
// bend.toDestination(); // route bend to audio out
// membraneSynth.connect(reverbLevel);
// reverbLevel.toDestination(volume);
membraneSynth.connect(volume);
volume.connect(reverbLevel);
reverbLevel.toDestination();


function preload() {
  sprite = new Sprite(200, 200, 42, 39);
  sprite.spriteSheet= "assets/tank.png";
  let animations = { //define as object
    stop: {row: 0, col: 2}, //find where it is in style sheet (use index system)
    driveRight: {row: 0, frames: 2}, //set column too / don't if 0 (default)
    shoot: {row: 0, col: 2, frames: 2},
    
  };
  sprite.anis.frameDelay = 15;//how many frames to wait before going to next frame / sets speed
  sprite.addAnis(animations); //
  sprite.changeAni("driveRight"); //sets animation to 60fps


}

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(0);
  

  
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
    //play sound on shot
    membraneSynth.triggerAttackRelease("C1", "8n"); // can include time (0.2) if no keyreleased
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

function targets()
{
  if (numOfTargets == 2)
  {
    
    target1 = new Sprite(385, 195, 25, 25);

    target2 = new Sprite(15, 195, 25, 25);
    a
  }
  numOfTargets++;

}








