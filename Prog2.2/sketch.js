
//check out FMSynth
let synth = new Tone.FMSynth;

//add more synth options w/ dropdown menu to switch between

//set up notes
//change order / keys?
let notes = {
  'q' : 'C4', // replace / change later
  'w' : 'D4',
  'e' : 'F4',
  'r' : 'G4',
  't' : 'A4',
  'y' : 'B4',
  'u' : 'C5'
}

//create dropdown menu to select  (see Class 10)
let dropDownMenu;

//create new tone objects for effects


//set sound direction chain
//synth.connect(effect);
//effect.toDestination();
//^^ repeat for each synth (1, 2, 3, etc..)
synth.toDestination();


function setup() {
  createCanvas(600, 600);

  //create dropdown menu to select synths

  //add slider1
  //effect1Slider = createSlider()
  //effectSlider.position(x, y);
  //effectSlider.mouseMOved(() => effect1.pitch = effect1Slider.value());

  //add slider2

}

function draw() {
  background(160,82,45);

  textSize(20); // set text size
  text("play q - u", 100, 200);

}

function keyPressed() {
  let playNotes = notes[key];
  synth.triggerAttack(playNotes); // no need for time setting when keyreleased exists
}

function keyReleased() {
  let playNotes = notes[key]; // redundant?
  synth.triggerRelease(playNotes, '+0.03');
}
