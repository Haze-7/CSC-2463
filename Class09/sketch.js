let sounds = new Tone.Players ({

  'piano': "assets/piano.mp3",
  'meditation': "assets/meditation.mp3",
  
});

let delAmt = new Tone.FeedbackDelay("8n", 0.5); // set speed (8n (8th note), how much delay(0.5) / distortion ammount
let distAmt = new Tone.Distortion(0.5); //distortion amount
let button1, button2;
let delaySlider;
let fbSlider; //feedback slider
let distSlider;

//new button for loop way
let soundNames = ['popcorn', 'water'];
let buttons = [];

sounds.connect(delAmt); // put sound to delAmt / effect
delAmt.toDestination(distAmt); // route to distAmt next
sounds.toDestination(); //breaks up sound source to add effects before sending to speaker

function setup() {
  createCanvas(400, 400);

  //faster for loop way
  soundNames.forEach((names, index) => {
    buttons[index] = createButton (names);
    buttons[index].position (120, 100 + index * 50);
    buttons[index].mousePressed(sounds.player(names.start()));
  })

  //Original way to do button
  // button1 = createButton('Piano');
  // button1.position(85, 150);
  // button1.mousePressed( () => sounds.player('piano').start());
  
  // button2 = createButton('Meditation');
  // button2.position(205, 150);
  // button2.mousePressed( () => sounds.player("meditation").start());

  delaySlider = createSlider(0, 1, 0, 0.05); // range 0(none) to max(1), start @ 0, gradual 0.05
  delaySlider.position(120, 200);
  delaySlider.mouseMoved(() => delAmt.delayTime.value = delaySlider.value());

  fbSlider = createSlider (0, 0.9, 0, 0.05);
  fbSlider.position(120, 250);
  fbSlider.mouseMoved(() => delAmt.feedback.value = fbSlider.value());

  distSlider = createSlider (0, 0.9, 0, 0.05);
  distSlider.position(120, 300);
  distSlider.mouseMoved(() => distAmt.distortion = distSlider.value());
}

function draw() {
  background(220, 100, 210);
}
