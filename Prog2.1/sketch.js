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

let pitchLevel = new Tone.PitchShift(-12, 7);
let reverbLevel = new Tone.Reverb();

let pitchSlider; 
let reverbSlider;

//variables for effects

sounds.connect(pitchLevel);
pitchLevel.toDestination(reverbLevel);
sounds.toDestination();

function setup() {
  createCanvas(600, 600);

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

  //add slider / button to make it work

  pitchSlider = createSlider (-12, 7, 0, 0.05);
  pitchSlider.position(25, 150);
  pitchSlider.mouseMoved(() => pitchSlider.feedback.value = pitchSlider.value());
}

function draw() {
  background(220);

  textSize(20);
  text("Welcome to Music Player!", 25, 25);
  text("Welcome to Music Player!");


  //create labeling text to explain how to use the sampler
  //text();
}
