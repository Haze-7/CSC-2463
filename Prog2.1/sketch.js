//set up sounds
let sounds = new Tone.Players ({

  'piano': "assets/piano.mp3"
  //add 3 more 
});

//set up buttons to select sound
let button1, button2;

//variables for effects


function setup() {
  createCanvas(400, 400);

  button2 = createButton('Piano Player');
  button2.position(85, 150);
  button2.mousePressed( () => sounds.player('piano').start());

  // add an effect

  //add slider / button to make it work
}

function draw() {
  background(220);

  //create labeling text to explain how to use the sampler
  //text();
}
