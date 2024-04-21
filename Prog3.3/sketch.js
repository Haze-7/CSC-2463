
let port;

let connectButton; //can maybe be removed

//box parameters
let x = 350;
let y = 100;
let size = 125;

//background color values
let red = 0;
let blue = 0;
let green = 0;

let fillColor; 

let lightLevel = 0;


function setup() {
  createCanvas(600,600);

  port = createSerial(); //like sound, doesn't start on own/ require user to do something to get it to activate

  connectButton = createButton("Connect"); //connect button implementation
  connectButton.mousePressed(connect);

  frameRate(60); //set fps

}

function draw() {
  background(220, 125, 200);

  textSize(16);
  text("Click inside box to turn on LED, click outside to turn it off!", 100, 400);
  text("Play around with the light sensor to lighten or darken the shapes!", 100, 430);

  


  let str = port.readUntil("\n"); // reads output until it sees () value

  text(str, 25, 25); // print out whatever we read from serial port in javaScript page // old printout
  console.log(str);
  if (str >= 110)
  {
    red = 225;
    green = 225;
    blue = 225;
  }
  else if (str >= 90)
  {
    red = 195;
    green = 195;
    blue = 195;
  }
  else if (str >= 70)
  {
    red = 165;
    green = 165;
    blue = 165;
  }
  else if (str >= 50)
  {
    red = 130;
    green = 130;
    blue = 130 ;
  }
  else if (str >= 30)
  {
    red = 100;
    green = 100;
    blue = 100;
  }
  else
  {
    red = 50;
    green = 50;
    blue = 50;
  }

  //test / show mouse clicked works w/ colors
  fillColor = color(red, blue, green);
  
   fill(fillColor);
   circle(50, 50, 50);
   square(x, y, size);

   //send messages/ data back to LED to turn on / off
   if (port.opened() && frameCount % 3) //first check that port is open and do every third frame
   {
     
     let message = lightLevel ; //object array 
     port.write(message); //send message every 60 frames per second
     //write out values^^ over serial port
   }
}
function connect() {

  if (!port.opened()) // check if port is opened or not
  {
    port.open("Arduino", 2400); // if not opened yet, open and set device, baub rate
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
    //ledState = 'HIGH';
    lightLevel = 255;
    
    console.log("mouseClicked");
  }
  else{ // if click outside
    //ledState = 'LOW'; 
    lightLevel = 0;
  }

}
