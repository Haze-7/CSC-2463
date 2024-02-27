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

//create new tone objects for effects
let pitchLevel = new Tone.PitchShift(); es
let reverbLevel = new Tone.Reverb(); 

let pitchSlider; //set up
let reverbSlider; // set up

//set sound direction chain
sounds.connect(pitchLevel);
pitchLevel.toDestination(reverbLevel);
reverbLevel.toDestination();

function setup() {
  createCanvas(600, 600);

  //create sound / play buttons 
  pianoButton = createButton('Piano');
  pianoButton.position(95, 90);
  pianoButton.mousePressed( () => sounds.player
  ('piano').start());

  guitarButton = createButton('Guitar');
  guitarButton.position(195, 90);
  guitarButton.mousePressed(() => sounds.player
  ('guitar').start());

  drumsButton = createButton("Drums");
  drumsButton.position(300, 90);
  drumsButton.mousePressed(() => sounds.player
  ('drums').start());

  tromboneButton = createButton("Trombone");
  tromboneButton.position(400, 90);
  tromboneButton.mousePressed(() => sounds.player
  ('trombone').start());

  // add an effect

//adjust pitch slider
  pitchSlider = createSlider (0, 12, 0, 0.1);
  pitchSlider.position(215, 200); 
  pitchSlider.mouseMoved(() => pitchLevel.pitch = pitchSlider.value());

//adjust reverb slider
  reverbSlider = createSlider (0, 0.9, 0, 0.05); 
  reverbSlider.position(215, 270); 
  reverbSlider.mouseMoved(() => reverbLevel.delay = reverbSlider.value());
}

function draw() {
  background(160,82,45);

  textSize(20); // set text size
  text("Welcome to Music Sampler", 170, 25);
  text("Select a Sound to Start Mixing!", 150, 70);
  text("Use the sliders below to add effects!", 130, 145);
  text("Adjust the Pitch:", 210, 190);
  text("Adjust the Reverb:", 200, 250);
}
