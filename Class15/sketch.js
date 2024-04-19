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
  connectButton.mousePressed(Connect);
}

function draw() {
  background(220);

  let str = port.readUntil("\n"); // reads output until it sees () value
  //text(str, 10, 10); // print out whatever we read from serial port in javaScript page // old printout

  let values = str.split(",");
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

function Connect() {
  //check if port is not open
  if (!port.opened()) // is port already opened or not?
  {
    port.open("Arduino", 9600); //if not already opened, then open it // first specifies allowed device / set baub rate (must match arduino)
  }
  else
  {
    port.close() // only one thing can access port at a time
  }
//when program starts, upon first button click will be asked to open serial port, select arduino Uno device from list and click connect

}
