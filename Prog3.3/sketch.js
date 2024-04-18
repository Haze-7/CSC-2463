
let port;

//p5 -> Arduino
//Click on square to turn on LED light when click in box, turn off when click outside
//use contains code / work with bugsquish to get ready for 3.4
//Arduino -> p5
// joystick? move into box, press when needed
//once again work with joystick, or something else analog

let connectButton; //can maybe be removed

//box parameters
let x = 350;
let y = 100;
let size = 125;

let ledColor = "";

//setup for knob
//turn knob to turn arrow or object
//track #'s of knob and use them to translate to movement on screen
//Knob: 3 #s (0,0,0), figure out where or why they go 
let rotation; 


function setup() {
  createCanvas(600,600);

  port = createSerial(); //like sound, doesn't start on own/ require user to do something to get it to activate

  connectButton = createButton("Connect"); //connect button implementation
  connectButton.mousePressed(connect);

  frameRate(60); //set fps

}

function draw() {
  background(220);
  
  //automatically open port
  // let usedPorts = usedSerialPorts();
  // if (usedPorts.length >0)
  // {
  //   port.open(usedPorts[0], 9600);
  // }
  //get data from arduino into p5

  let chars = port.available(); //read all available characters
  let str = port.read(chars); //reae chars brought in from port
  let lines = str.split("\n"); //split the string once it reaches a new line
  let latest = ""; //update latest instead of readUntil(may change)

  if (lines.length > 0) //check to see if anything got through/ sent
  {
    let lastIndex = lines.length > 1 ? lines.length - 2 : lines.length - 1; //? comparison operator
    latest = lines[lastIndex];
  }
  text(str, 10, 10); // print out whatever we read from serial port in javaScript page // old printout

  let values = latest.split(","); //read latest

  //way of sending message / data back to  arduino
  if (port.opened() && frameCount % 3) //first check that port is open and do every third frame
  {
    let pixel = get(circleX, circleY);
    let message = '${pixel[0]} ${pixel[1]} ${pixel[2]}\n'; //object array 
    port.write(message); //send message every 60 frames per second
    //write out values^^ over serial port
  }

  fill("blue");
  square(x, y, size);

  //effects inside will be kept inside
  //push();
  
  //pop();

  angleMode(DEGREES);
  let rotateDeg = map(latest, 0, 1023, 0., 360.); //first 2 actual range, 2nd 2 range being mapped to
  translate(width /2, height / 2);
  square(100, 100, 100);
  rectMode(CENTER);
  rotate(rotateDeg);

  //test / show mouse clicked works w/ colors
   //fill(testColor);
   circle(50, 50, 50);
}
//can maybe remove
function connect() {

  if (!port.opened()) // check if port is opened or not
  {
    port.open("Arduino", 9600); // if not opened yet, open and set device, baub rate
  }
  else
  {
    port.close(); //close if already opened, because only one thing can be open at a time
  }
}
//when program starts, upon first button click will be asked to open serial port, select arduino Uno device from list and click connect


function mouseClicked() {
  let isInSquare = false;

  if (mouseX >= x && mouseX <= x + size && mouseY >= y && mouseY <= y + size)
  {
  
    //do arduino code / send data to turn on light
    //turn on LED
    
    console.log("mouseClicked");
  }
  else{ // if click outside
    //turn off LED
    
  }

}
