//set up sounds
let sounds = new Tone.Players ({

  'piano': "assets/piano.mp3",
  'guitar': "assets/guitar.mp3",
  'drums': "assets/drums.mp3",
  'trombone': "assets/trombone.mp3"
});

//set up buttons to select sound
let pianoButton;
let guitarButton;
let drumsButton;
let tromboneButton;

let pitchLevel = new Tone.PitchShift(-12, 7); // fix values
let reverbLevel = new Tone.Reverb(); // add values

let pitchSlider; //set up
let reverbSlider; // set up

//variables for effects
//make proper order
sounds.connect(pitchLevel);
pitchLevel.toDestination(reverbLevel);
sounds.toDestination();

function setup() {
  createCanvas(600, 600);

  //create buttons / done
  pianoButton = createButton('Piano');
  pianoButton.position(25, 50);
  pianoButton.mousePressed( () => sounds.player
  ('piano').start());

  guitarButton = createButton('Guitar');
  guitarButton.position(150, 50);
  guitarButton.mousePressed(() => sounds.player
  ('guitar').start());

  drumsButton = createButton("Drums");
  drumsButton.position(275, 50);
  drumsButton.mousePressed(() => sounds.player
  ('drums').start());

  tromboneButton = createButton("Trombone");
  tromboneButton.position(400, 50);
  tromboneButton.mousePressed(() => sounds.player
  ('trombone').start());

  // add an effect

  //add sliders / button to make it work

  pitchSlider = createSlider (-12, 7, 0, 0.05); // figure out proper values
  pitchSlider.position(25, 150); // pick good position
  pitchSlider.mouseMoved(() => pitchSlider.value = pitchSlider.value()); // figure out pitchSLider.(???).value
}

function draw() {
  background(220);

  textSize(20); // set text size
  text("Welcome to Music Player!", 25, 25);
  text("Use the sliders below to add effects!", 25, 125);
  //add headers for sliders
  //add header for 2nd slider



  //create labeling text to explain how to use the sampler
  //text();
}
