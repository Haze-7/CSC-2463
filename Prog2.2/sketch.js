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
  dropDownMenu.position(5, 90);
  dropDownMenu.option("Membrane Synth");
  dropDownMenu.option("Duo Synth");
  dropDownMenu.option("Metal Synth");
  dropDownMenu.option("FMSynth");




  //add slider1
  //effect1Slider = createSlider()
  //effectSlider.position(x, y);
  //effectSlider.mouseMOved(() => effect1.pitch = effect1Slider.value());

  //add slider2

}

function draw() {
  background(160,82,45);

  textSize(20); // set text size
  text("Welcome to Music Synthesizer", 150, 30);
  text("Select Sound: ", 5, 75);
  text("Play Primary Keys: A -> J", 160, 300);
  text("Play Sharps: W, E, R, T, Y", 160, 220);
  text("Select Effect: ", 400, 75);
  

  //text("play q - u", 100, 200);
  //dropDownMenu.selected()
}

function keyPressed() {
  if (dropDownMenu.selected() === "Membrane Synth") // when membrane synth selected
   {
    let playNotes = notes[key]; //(below) set release time(0.8) / set to sound 1 / synth1
    membraneSynth.triggerAttackRelease(playNotes, 0.8); // can include time (0.2) if no keyreleased
   }
  else if (dropDownMenu.selected() === "Duo Synth")
  {
    let playNotes = notes[key]; //(below) set release time(0.8) / set to sound 1 / synth1
    duoSynth.triggerAttackRelease(playNotes, 0.8); // can include time (0.2) if no keyreleased
  }
  else if (dropDownMenu.selected() === "Metal Synth")
  {
    let playNotes = notes[key]; //(below) set release time(0.8) / set to sound 1 / synth1
    metalSynth.triggerAttackRelease(playNotes, 0.8); // can include time (0.2) if no keyreleased
  } 
  else if (dropDownMenu.selected() === "FM Synth")
  {
    let playNotes = notes[key]; //(below) set release time(0.8) / set to sound 1 / synth1
    FMSynth.triggerAttackRelease(playNotes, 0.8); // can include time (0.2) if no keyreleased
  } 
}


