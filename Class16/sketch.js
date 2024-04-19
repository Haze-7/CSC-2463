//this program prints out values as it moves from serial monitor / joystick 

let port;
let joyX = 0, joyY = 0, sw = 0;
let connectButton;

//position of circle variables
let circleX;
let circleY;

let speed = 3;

function setup() {
  createCanvas(400, 400);

  circleX = width / 2;
  circleY = width /2; // put in middle of canvas

  port = createSerial(); // like sound, doesn't start on own/ require user to do something to get it to activate
  
  connectButton = createButton("Connect");
  connectButton.mousePressed(connect); //connect is function at bottom

  //automatically opens the port so u don't have to manually each time
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0)
  {
    port.open(usedPorts[0], 57600);
  }
  //optional
  frameRate(20); //set frameRate (default: 60fpt)
}

function draw() {
  background(220);

  //instead of below, 
  let characters = port.available(); //read all available characters
  let str = port.read(characters);
  let lines = str.split("\n");
  let latest = "";
  if (lines.length > 0) //check to see if anything got through/ sent
  {
    let lastIndex = lines.length > 1 ? lines.length - 2 : lines.length - 1; //? comparison operator
    latest = lines[lastIndex];
  }
  //let str = port.readUntil("\n"); // reads output until it sees () value
  text(str, 10, 10); // print out whatever we read from serial port in javaScript page // old printout

  let values = latest.split(","); //read latest
  //let values = str.split(","); //original w/ readuntil
  if (values.length > 2) // just in case mid send error / check if full value
  {
    joyX = values[0];
    joyY = values[1];
    sw = Number(values[2]); // must change to number (makes member of number class)

    //modify circle X / Y location when moving ^^ joystick values
    // for x
    if (joyX < 0)
    {
      circleX += speed;
    }
    else if (joyX < 0)
    {
      circleX -= speed;
    }
    // for y
    if (joyY < 0)
    {
      circleY += speed;
    }
    else if (joyY < 0)
    {
      circleY -= speed;
    }
  }
  noStroke();//get rid of outline / border
  fill('purple');
  rect(0,0,width/2, height);
  fill('gold');
  rect(width/2, 0, width/2, height);

  if (port.opened() && frameCount % 3) //first check that port is open and do every third frame
  {
    let pixel = get(circleX, circleY);
    let message = '${pixel[0]} ${pixel[1]} ${pixel[2]}\n'; //object array 
    port.write(message); //send message every 60 frames per second
    //write out values^^ over serial port
  }

  stroke(0); //return outline for circle 


  if (sw == 1) // now, pressing button on joystick changes color of circle
  {
    fill("blue");
  }
  else
  {
    fill(255);
  }
  circle(circleX, circleY, 50); // draw circle in center of 50 diameter
}

function connect() {
  //check if port is not open
  if (!port.opened()) // is port already opened or not?
  {
    port.open("Arduino", 57600); //if not already opened, then open it // first specifies allowed device / set baub rate (must match arduino)
  }
  else
  {
    port.close() // only one thing can access port at a time
  }
//when program starts, upon first button click will be asked to open serial port, select arduino Uno device from list and click connect

}
