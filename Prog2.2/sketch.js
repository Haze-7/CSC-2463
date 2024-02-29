let membraneSynth = new Tone.PolySynth(Tone.MembraneSynth); 
let duoSynth = new Tone.PolySynth(Tone.DuoSynth);
let metalSynth = new Tone.MonoSynth(Tone.MetalSynth);
let FMSynth = new Tone.FMSynth();

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

//create new tone objects for effects

let bend = new Tone.PitchShift();
bend.pitch = 0



//set sound direction chain
membraneSynth.connect(bend); // route synth to bend
bend.toDestination(); // route bend to audio out
duoSynth.connect(bend); // route synth to bend
bend.toDestination(); // route bend to audio out
metalSynth.connect(bend); // route synth to bend
bend.toDestination(); // route bend to audio out
FMSynth.connect(bend); // route synth to bend
bend.toDestination(); // route bend to audio out
//synth.toDestination();
//synth.toDestination();


function setup() {
  createCanvas(600, 600);

  //create dropdown menu to select synths
  dropDownMenu = createSelect();
  dropDownMenu.

  //add slider1
  //effect1Slider = createSlider()
  //effectSlider.position(x, y);
  //effectSlider.mouseMOved(() => effect1.pitch = effect1Slider.value());

  //add slider2

}

function draw() {
  background(160,82,45);

  textSize(20); // set text size
  text("Play Primary Keys: A -> J", 100, 225);
  text("Play Sharps: W, E, R, T, Y", 100, 200);
  //text("play q - u", 100, 200);
  //dropDownMenu.selected()
}

function keyPressed() {
  let playNotes = notes[key];
  synth.triggerAttack(playNotes); // no need for time setting when keyreleased exists
  // if (mySelect.selected() === "Simple Synth") // when simple synth selected
  // {
  // let playNotes = notes[key]; //(below) set release time(0.8) / set to sound 1 / synth1
  // synth1.triggerAttackRelease(playNotes, 0.8); // can include time (0.2) if no keyreleased
  // }
  // else if (mySelect.selected() === "Duo Synth")
  // {
  //   let playNotes = notes[key]; //(below) set release time(0.8) / set to sound 1 / synth1
  //   synth2.triggerAttackRelease(playNotes, 0.8); // can include time (0.2) if no keyreleased
  // }
}

function keyReleased() {
  let playNotes = notes[key]; // redundant?
  synth.triggerRelease(playNotes, '+0.03');
}
