
//sound setup
let synth = new Tone.Synth;
let membraneSynth = new Tone.PolySynth(Tone.MembraneSynth); 
let metalSynth = new Tone.MonoSynth(Tone.MetalSynth);

//sprite setup
let sprite;
let animations;
let tanks = [];

function preload() {
  sprite = new Sprite(200, 200, 80, 80);
  sprite.spriteSheet= "assets/tank.png";
  let animations = { //define as object
    stop: {row: 0, col: 2}, //find where it is in style sheet (use index system)
    driveRight: {row: 0, frames: 2}, //set column too / don't if 0 (default)
    shoot: {row: 0, col: 2, frames: 2}
  };
  sprite.anis.frameDelay = 8;//how many frames to wait before going to next frame / sets speed
  sprite.addAnis(animations); //
  sprite.changeAni("driveRight"); //sets animation to 60fps

  characters.push(new Character(100, 100, 80, 80, "assets/tank.png", movements));
  characters.push(new Character(200, 200, 80, 80, "assets/tank.png", movements));
  characters.push(new Character(280, 280, 80, 80, "assets/tank.png", movements));

}

//GamePlan:

//make tank sprite that drives left and right
//tank makes noise while moving
//tank makes noise while shooting and does animation

//TO DO
//sprite sheet
//walking/driving animation
//shoot animation
//shoot function
//mouse pressed function
//create gun sound / move sound
//link sound to action

//set up notes
let notes = {
  'a' : 'C6', // replace / change later
  'w' : 'C#6', // #w 
  's' : 'D6',
  'e' : 'D#6', // #e 
  'd' : 'F6',
  'r' : 'F#6', //#r
  'f' : 'G6',
  't' : 'G#6', //#t
  'g' : 'A6',
  'y' : 'A#6', //#y
  'h' : 'B6',
  'j' : 'C6'
}

//create dropdown menu to select  (see Class 10)
let dropDownMenu;

//create new tone objects for effects
let pitchSlider;
let bend = new Tone.PitchShift();
bend.pitch = 0



//set sound direction chain
synth.connect(bend); // route synth to bend
bend.toDestination(); // route bend to audio out
membraneSynth.connect(bend); // route synth to bend
bend.toDestination(); // route bend to audio out
metalSynth.connect(bend); // route synth to bend
bend.toDestination(); // route bend to audio out


function setup() {
  createCanvas(600, 600);

  //create dropdown menu to select synths
  dropDownMenu = createSelect();
  dropDownMenu.position(5, 90);
  dropDownMenu.option("Synth");
  dropDownMenu.option("Membrane Synth");
  dropDownMenu.option("Metal Synth");




  pitchSlider = createSlider (0, 12, 0, 0.1);
  pitchSlider.position(400, 90); 
  pitchSlider.mouseMoved(() => bend.pitch = pitchSlider.value());

  //add slider2

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
  else 
  {
    stop();
  }

  function stop() {
    sprite.vel.x = 0;
    sprite.vel.y = 0;
    sprite.changeAni('stand');

  }
  

  // textSize(20); // set text size
  // text("Welcome to Music Synthesizer", 150, 30);
  // text("Select Sound: ", 5, 75);
  // text("Play Primary Keys: A -> J", 160, 300);
  // text("Play Sharps: W, E, R, T, Y", 160, 220);
  // text("Adjust Pitch: ", 410, 75);
  

  //text("play q - u", 100, 200);
  //dropDownMenu.selected()
}

function keyPressed() {
  if (dropDownMenu.selected() === "Synth") // when membrane synth selected
   {
    let playNotes = notes[key]; //(below) set release time(0.8) / set to sound 1 / synth1
    synth.triggerAttackRelease(playNotes, 0.2); // can include time (0.2) if no keyreleased
   }
  else if (dropDownMenu.selected() === "Membrane Synth")
  {
    let playNotes = notes[key]; //(below) set release time(0.8) / set to sound 1 / synth1
    membraneSynth.triggerAttackRelease(playNotes, 0.2); // can include time (0.2) if no keyreleased
  }
  else if (dropDownMenu.selected() === "Metal Synth")
  {
    let playNotes = notes[key]; //(below) set release time(0.8) / set to sound 1 / synth1
    metalSynth.triggerAttackRelease(playNotes, 0.2); // can include time (0.2) if no keyreleased
  } 
}

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


