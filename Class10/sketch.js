let synth = new Tone.PolySynth(Tone.MembraneSynth); // can replace PolySynth with other options

let bend = new Tone.PitchShift();

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
synth.connect(bend); // route synth to bend
bend.toDestination(); // route bend to audio out
//synth.toDestination();

function setup() {
  createCanvas(400, 400);

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
  let playNotes = notes[key];
  synth.triggerAttack(playNotes); // can include time (0.2) if no keyreleased
}

function keyReleased()
{
  let playNotes = notes[key];
  synth.triggerRelease(playNotes, '+0.03')
}

function draw() {
  background(100, 220, 150);

  text("Play A-K for Synth", 140, 180);
}


