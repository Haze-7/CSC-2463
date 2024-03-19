
let synth = new Tone.Synth;
let membraneSynth = new Tone.PolySynth(Tone.MembraneSynth); 
let metalSynth = new Tone.MonoSynth(Tone.MetalSynth);

let volume = new Tone.Volume(-12)

//add more synth options w/ dropdown menu to switch between

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

// //create new tone objects for effects
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
  background(160,82,45);

  textSize(20); // set text size
  text("Welcome to Music Synthesizer", 150, 30);
  text("Select Sound: ", 5, 75);
  text("Play Primary Keys: A -> J", 160, 300);
  text("Play Sharps: W, E, R, T, Y", 160, 220);
  text("Adjust Pitch: ", 410, 75);
  

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