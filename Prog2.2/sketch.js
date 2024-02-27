
//check out FMSynth
let synth = new Tone.FMSynth;

//set up notes
let notes = {
  'a' : 'C4', // replace / change later
  's' : 'D4',
  'f' : 'F4',
  'g' : 'G4',
  'h' : 'A4',
  'j' : 'B4',
  'k' : 'C5'
}

//set up buttons to select sound


//create new tone objects for effects


//set sound direction chain
//synth.connect(effect);
//effect.toDestination();
synth.toDestination();


function setup() {
  createCanvas(600, 600);

  //add slider1
  //effect1Slider = createSlider()
  //effectSlider.position(x, y);
  //effectSlider.mouseMOved(() => effect1.pitch = effect1Slider.value());

  //add slider2

}

function draw() {
  background(160,82,45);

  textSize(20); // set text size
  //text("text", x, y);

  piano({
    noteon: (playNotes) => synth.triggerAttack(playNotes),
    noteoff: (playNotes) => synth.triggerRelease()
  });

}

function keyPressed() {
  let playNotes = notes[key];
  synth.triggerAttack(playNotes); // no need for time setting when keyreleased exists
}

function keyReleased() {
  let playNotes = notes[key]; // redundant?
  synth.triggerRelease(playNotes, '+0.03');
}
