//squencing / loops
let sequence1, square;
let melody = ["C3", ["E3", "G3", "D3", "C3"], "A3", "B2", "C2", "E3", ["A2", "G2"], "C4"];// array of sounds to play
//put inside [] to play them together ^^

square = new Tone.Synth({
  oscillator: {
    type: "square"
  },
  envenlope : {
    attack: 0.8,
    decay: 0.1,
    sustain: 1,
    release: 0.1
  }
}).toDestination();

//create sequence object
//will continue till released (ex, stop when gameOver = true)
sequence1 = new Tone.Sequence(function (time, note){
  square.triggerAttackRelease(note, 0.8);
  }, melody, "4n");

//how tcomputer keeps track of it
Tone.Transport.start();
Tone.Transport.bpm.Value = 100;
Tone.Transport.timeSignature = [3,4]; // ??
//beat per minute
//great way to speed things up


function mousePressed() { // another way to check for action
  Tone.start(); // starts tone
  sequence1.start(); //starts the clock of the sequencer (starts tracking, but doesn't start till this)
}

function mouseReleased() {
  sequence1.stop();
}

function setup() { 
  createCanvas(400, 400);

}

function draw() {
  //mouseIsPressed thing for image (not included)
  //cant use ^ for sound, must do outside
  background(100, 170, 200);
  text("Hold mouse for Sound", 150, 200)
}



//AM / FM Synth


// let amSynth = new Tone.AMSynth().toDestination();
// amSynth.type = 'sine';
// amSynth.harmonicity.value = .4; // ratio between amp and frquency / sticks/ posts location
// //noisier or less noisy
// //easier way to use / replace regular synth

// //frequency modulation
// let FMSynth = new Tone.FMSynth().toDestination();
// FMSynth.type = 'sine';
// //main to values you need to set / only
// FMSynth.harmonicity.value = 0.1; // ratio ^^
// FMSynth.modulationIndex = 0.2; // similar to harmonicity/ combination does magic / 0 - 1 range

// let notes = {
//   'a' : 'C4',
//   's' : 'D4',
//   'd' : 'E4',
//   'f' : 'F4',
//   'g' : 'G4',
//   'h' : 'A4',
//   'j' : 'F4',
//   'k' : 'C5'
// }

// function keyPressed() { // another way to check for action
//   amSynth.triggerAttack('c4'); // can add 2nd param (time) to repalce key Released
// }

// function keyReleased() {
//   amSynth.trigggerRelease();
// }

// function setup() { 
//   createCanvas(400, 400);

// }

// function draw() {
//   //mouseIsPressed thing for image (not included)
//   //cant use ^ for sound, must do outside
//   background(100, 170, 200);
//   text("Play A-K for synth", 150, 200)
// }



//oscilator / LFO Code

// let osc = new Tone.Synth(100, 'sine').toDestination();
// let lfo = new Tone.LFO(10, 100, 310).connect(osc.frequency).start(); // (how often oscilates(beep speed), bot freq, top freq << both are range used)

// function keyPressed() { // another way to check for action
// osc.triggerAttack();
// }

// function keyReleased() {
//   osc.triggerRelease();
// }

// function setup() { 
//   createCanvas(400, 400);

// }

// function draw() {
//   background(100, 170, 200);
//   text("Press any key for LFO", 150, 200)
// }
