let synth1 = new Tone.PolySynth(Tone.MembraneSynth); // can replace PolySynth with other options
let synth2 = new Tone.PolySynth(Tone.DuoSynth);
let bend = new Tone.PitchShift();
let mySelect;
bend.pitch = 0;
//other options:
//Tone.metalSynth
//Tone.
//Tone.pluckSynth
// if monosynth, can put in poly, else can't (gets 2 notes to play at once)
//^^ ex: Tone.PolySynth(Tone.MembraneSynth)

// do with pitch
let notes = { // must be outside of a function to be called in others
  'a' : 'C4',
  's' : 'D4',
  'f' : 'F4',
  'g' : 'G4',
  'h' : 'A4',
  'j' : 'B4',
  'k' : 'C5'
}
//do it based on frequency instead: 
// let notes = { // must be outside of a function to be called in others
//   'a' : 200,
//   's' : 220,
//   'f' : 245,
//   'g' : 300,
//   'h' : 320,
//   'j' : 344,
//   'k' : 366,

// }
// }
synth1.connect(bend); // route synth to bend
bend.toDestination(); // route bend to audio out
synth2.connect(bend); // route synth to bend
bend.toDestination(); // route bend to audio out
//synth.toDestination();

function setup() {
  createCanvas(400, 400);

  mySelect = createSelect();
  mySelect.position(100, 100);
  mySelect.option("Simple Synth"); // options within drop down menu
  mySelect.option("Duo Synth"); // use .options(text inside)
  mySelect.selected("Simple Synth"); // set selection currently selected
  //create slider for pitch
  //create slider for pitch

  pitchSlider = createSlider(0, 12, 0, 0.1);
  pitchSlider.position(120, 200);
  pitchSlider.mouseMoved(() => bend.pitch =pitchSlider.value());

  // ascending order on assignment\
  //when press key, note gets played

}
//options: triggerAttack / Release (instead of .start w/ sound)
  //synth.triggerAttack or triggerRelease(playNotes, 0.2);

function keyPressed() {
  if (mySelect.selected() === "Simple Synth") // when simple synth selected
  {
  let playNotes = notes[key]; //(below) set release time(0.8) / set to sound 1 / synth1
  synth1.triggerAttackRelease(playNotes, 0.8); // can include time (0.2) if no keyreleased
  }
  else if (mySelect.selected() === "Duo Synth")
  {
    let playNotes = notes[key]; //(below) set release time(0.8) / set to sound 1 / synth1
    synth2.triggerAttackRelease(playNotes, 0.8); // can include time (0.2) if no keyreleased
  }
}

// function keyReleased()
// {
//   let playNotes = notes[key];
//   synth.triggerRelease(playNotes, '+0.03')
// }

function draw() {
  background(100, 220, 150);

  text("Play A-K for Synth", 140, 180);
  mySelect.selected(); // instantiate / draw Selector drop down
}


