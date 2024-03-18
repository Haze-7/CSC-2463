let noise = new Tone.Noise("brown"); //pink, brown, or white sound
let filter = new Tone.Filter(200, "lowpass"); // highpass, lowpass, bandpass / # is cut off frequency
//w/ highpass use 5000

let filterSlider;

noise.connect(filter);
filter.toDestination();

function keyPressed() { // another way to check for action
  if (key === 'q')
  {
    filter.frequency.rampTo(10000, 3) // automatically increases frequency (like a slider) over set time / 5000 instead of 10 w/ highpass / goes high to low
    noise.start();
  }
  else if (key === 'w')
  {
    noise.stop();
    filter.frequency.value = 5000;
  }
}

function setup() { 
  createCanvas(400, 400);
  filterSlider = createSlider(100, 10000, 100, 0,1); //loc, freq, size, stepsize
  filterSlider.position(130, 200);
  filterSlider.mouseMoved(()=> {
    filterSlider.value(); // anything with a .value can be ramped / used / automatically ramp instead of using slider
  })
}

function draw() {
  background(100, 170, 200);

}

//can ramp to othe types of effects
// Ex: any that uses .value()
//in keyPressed, rampTo value
//in keyReleased, set frequency back to 0
//also works for delay.feedback.rampTo





//set up for project example code for loading and calling sound w/ image (need to make own sound / get code for draw function)



// function preload() {
//   //mouse = loadImage();
// }

// function setup(){
//   createCanvas(400,400);
// }

// function draw() {
  //
// }

// let soundFX = newTone.Players({
//   //squeaks: "sound.mp3"

// }).toDestination();

// function mousePressed() {
//   soundFX.player("squeaks").start();
// }

// function mouseReleased() {
//   soundFX.player("squeaks").stop();
// }