let sounds = new Tone.Players ({

  'piano': "assets/piano.mp3"
});

let delAmt = new Tone.FeedbackDelay("8n", 0.5); // set speed (8n (8th note), how much delay(0.5) / distortion ammount
let disAmt = new Tone.Distortion(0.5); //distortion amount
let button1, button2;
let delaySlider;
let fbSlider; //feedback slider
let distSlider;



sounds.connect(delAmt); // put sound to delAmt / effect
delAmt.toDestination(distAmt); // route to distAmt next
sounds.toDestination(); //breaks up sound source to add effects before sending to speaker

function setup() {
  createCanvas(400, 400);

  button1 = createButton('Popcorn Maker');
  button1.position(85, 150);
  button1.mousePressed( () => sounds.player('popcorn').start());
  
  button2 = createButton('Piano Player');
  button2.position(205, 150);
  button2.mousePressed( () => sounds.player('piano').start());

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
