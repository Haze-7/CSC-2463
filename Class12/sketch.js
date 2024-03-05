let sine = new Tone.Synth ({
  oscillator: {
    type: 'sine'
  },
  envelope : { // create envelope (acts as css style on type/ wave)
    attack: 0.01, // from when sound starts to full beat/ play  /smaller = more aggressive
    decay: 0.01, //rate it trails off at when stop / opposite of ^^
    sustain: 0.5, //how long to keep the sound going for
    release: 0.5 //how long the sound takes to stop
  }
}).toDestination();

let square = new Tone.Synth ({
  oscillator: {
    type: 'square'
  }, // comma after square
    envelope : { // create envelope (acts as css style on type/ wave)
      attack: 0.01, //speed
      decay: 0.1, //
      sustain: 0.9, //
      release: 0.01 //
    }
}).toDestination();
let triangle = new Tone.Synth ({
  oscillator: {
    type: 'triangle'
  },
  envelope : { // create envelope (acts as css style on type/ wave)
    attack: 0.1, //
    decay: 0.1, //
    sustain: 0.1, //
    release: 0.1 //
  }
}).toDestination();
let saw = new Tone.Synth ({
  oscillator: {
    type: 'sawtooth'
  },
  envelope : { // create envelope (acts as css style on type/ wave)
    attack: 0.1, //
    decay: 0.1, //
    sustain: 0.1, //
    release: 0.1 //
  }
}).toDestination();

function setup() {
  createCanvas(400, 400);
}
function keyPressed() {
  if (key === 'q')
  {
    sine.triggerAttackRelease('c4', 1);
  }
  else if (key === 'w')
  {
    square.triggerAttackRelease('c4', 1);
  }
  else if (key === "e")
  {
    triangle.triggerAttackRelease('c4', 1);
  }
  else if (key === "r")
  {
    saw.triggerAttackRelease('c4', 1);
  }
}

// function keyReleased()
// {
//   let playNotes = notes[key];
//   synth.triggerRelease(playNotes, '+0.03')
// }

function draw() {
  background(100, 220, 150);

  text("Q = Sine", 150, 150);
  text("W = Square", 150, 175);
  text("E = Triangle", 150, 200);
  text("R = Sawtooth", 150, 225);
}


