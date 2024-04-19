// serial communication between a microcontroller with a pot on pin A0
// arduino code can be found here : https://gist.github.com/shfitz/b78b412960fba668d08ccc84b9ee838d

let serial; // variable for the serial object
let latestData = "waiting for data"; // variable to hold the data

function setup() {
  createCanvas(windowWidth, windowHeight);
  // serial constructor
  serial = createSerialPort();

  // serial port to use - you'll need to change this
  serial.open('/dev/cu.usbmodem11301');

  // what to do when we get serial data
  serial.on('data', gotData);

}

// when data is received in the serial buffer

function gotData() {
  let currentString = serial.readLine(); // store the data in a variable
  trim(currentString); // get rid of whitespace
  if (!currentString) return; // if there's nothing in there, ignore it
  console.log(currentString); // print it out
  latestData = currentString; // save it to the global variable
}

function draw() {
  background(255, 255, 255);
  fill(0, 0, 0);
  text(latestData, 10, 10); // print the data to the sketch

  // in this example, we are reciving a value between 0 and 1023
  // and using that to rotate the square
  angleMode(DEGREES);
  let rotDeg = map(latestData, 0, 1023, 0. ,360.);

  translate(width / 2, height / 2);
  rotate(rotDeg);
  rectMode(CENTER);
  rect(0, 0, 100, 100);

}
