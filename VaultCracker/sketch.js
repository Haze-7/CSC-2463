
let sprite;
let animations;
let gameFont;
let spriteSheet;
let gameScreen;
let timeLeft = 60; // change to more reasonable time
let gameOver = false;
let gameEnd = false;
let restartKey = 'r';

let port;
let connectButton;

//new / vault code
let buttonVal = 0;
let knobVal = 0;
let vaultState = 'locked'; // update like gameScreen closed = locked, cracked = opened
let difficulty = 'easy';
let numOfKeys = 0; //# of keys to be solved for

let centerX = 0;
let centerY = 0;


//keys to get into safe
let key1 = 0;
let key2 = 0;
let key3 = 0;

let keyVal = 0;
let keyRangeBottom = 0;
let keyRangeTop = 0;

//get option for red or green LED
let foundKey = false;
let failAttempt = false;
let keyRangeSet = false;
let key = 0;
let keysRemaining = 3;
let ledOutput = 'off';

//0 default
//1 = green light
//2 = red light


function preload() {

  gameFont = loadFont("assets/PressStart2P-Regular.ttf"); // load in google font

  //row: index row (vert) column: index colmn (horiz) frames: no index to go through
  // animations = {

  // };

}
function setup() {
  
  createCanvas(1200, 1000);
  textFont(gameFont); 
  gameScreen = 'start'; // set default screen upon opening game
  
  
  //start background start sound

  port = createSerial(); // like sound, doesn't start on own/ require user to do something to get it to activate
  
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 2400);
  }

  // connectButton = createButton("Connect");
  // connectButton.mousePressed(Connect);
  
  centerX = width / 2;
  centerY = height / 2;
}
function draw() {
  background(128,128,128);

  //replace to accomidate new endscreens
  if (gameScreen === 'start')
  { 
    startMenu();
    //maybe trigger song here

  }
  else if (gameScreen === 'failScreen')
  {
    failScreen();
    //maybe trigger song here
  }
  else if (gameScreen === 'victoryScreen')
  {
    victoryScreen();
  }
  else if (gameScreen === 'playing')
  {
    playing();
    //maybe trigger song here
  }

  let str = port.readUntil("\n"); // reads output until it sees () value
  //text(str, 10, 10); // print out whatever we read from serial port in javaScript page // old printout
  let values = str.split(",");
  if (values.length > 1)
  {
    knobVal = values[0];
    buttonVal = values[1]; 
  }

  //console.log(knobVal, buttonVal);

  //console.log(mouseX - centerX, mouseY - centerY); // just for pixel measurein  delete
  
  //analog output to arduino
  if (port.opened()) //first check that port is open and do every third frame
  {
      
    let message = ledOutput; //object array 
    console.log(message);
    port.write(message); //send message every 60 frames per second
    //write out values^^ over serial port
  }
}
  //display Menu text
  //get input to start
  //set playing to true
  //add difficulty setting?
  function startMenu() {
    background(128,128,128);
    textSize(25);
    text("Welcome to Safe Cracker!", width / 4, (height / 16));
    textSize(15);
    text("You will have 60 Seconds to Crack the Safe!", 270, 300);
    text("Press button to play!", 430, 750);

    text("Select Your Difficulty Level.", 390, 400);


    if (buttonVal == 1) {
        gameScreen = 'playing';

    }
  }
  function playing() {

    // if (difficulty == 'hard') 
    // {
    //   //set game stats to specific things
    //   timeLeft = 15;
    // }
    // else if (difficulty == 'medium')
    // {
    //   //set med stats
    //   timeLeft = 30;

    // }
    // else if (difficulty == 'easy')
    // {
    //   //set easy stats
    //   timeLeft = 45;

    // }

    //game time counter
    text("Cops will Arrive in:" + ceil(timeLeft), 30 , 45);
    text("Keys Remaining: " + keysRemaining, 30, 80);

    //text("Bugs Squashed: " + bugsSquished , width - 210 , 45); score

    vaultCreation();
    vaultLock();

    text("Vault key: " + key, 200, 200);
    text("LED Value: " + ledOutput, 200, 230);
    
    //playing around with vault door
    //circle(width /2, height /2, 50);

    timeLeft -= deltaTime / 1000; //track time (deltaTime) convert from milli -> seconds (/1000) // time
    //find way to speed up timeLeft/ remove time for each incorrect answer
    if (timeLeft <= 0)
    {
      gameScreen = 'failScreen';
      vaultState = 'locked';
      timeLeft = 0;
    }
    else if (keysRemaining == 0)
    {
      gameScreen = 'victoryScreen';
      vaultState = 'unlocked';
      timeLeft = 0;
    }
  }
  //replace with victory / failure screens
  //either make new function for each ^^ 
  //or make if statement for boolean value
  //will be effectively replaced
  //end Screen for when player loses the game (cops arrive)
  //Show cops ariving with flashing lights
  function failScreen() {
    //fill("red");
    //rect(0, 0, 300, 600);
    //fill("blue");
    //rect(300, 0, 300, 600);

    //start / play failure music 
    //end music and restart game
    //show stats? / old keys

    text("You Failed!", 200, 100);
    vaultCreation();

    text("Press button to play again.", 300, 400);
    if (buttonVal == 1) { // find another way to restart game

        //reset/ restart gane
        gameScreen = 'playing';
        timeLeft = 60;
        keysRemaining = 3;
    }

  }

  //end screen for when player wins the game
  //have rain money and provide money earned and time remaining?
  function victoryScreen() {

    //start / play victory song
    //display money earned
    //end music / reset game
    vaultCreation();
    text("Victory!", 200, 100);

    text("Press button to play again.", 300, 400);
    if (buttonVal == 1) { // find another way to restart game
        //reset/ restart gane
        gameScreen = 'playing';
        timeLeft = 60;
        keysRemaining = 3;
    }
  }

  //vault handle spins along with knob
 function vaultCreation (){
  //create Square
  rectMode(CENTER);
  
  push();
    
    fill(183, 186, 181);
    square(centerX, centerY, 700);
    fill(123, 125, 121)
    rect(600, 178, 700 , 55);
    rect(600, 822, 700, 55);
    rect(923, 500  , 55, 700 );
    rect(277, 500, 55, 700);    

    //vault handles
    
    angleMode(DEGREES);
    translate(centerX, centerY); // set origin to middle
    rotate(knobVal);
    
    push() // x= 1200, y = 1000
    noStroke();
    push();
      fill(64, 64, 64);
      circle(0, 0, 220);
    pop();

    // fill(64, 64, 64);
    // circle(0, 0, 350);

    fill(123, 123, 123);
    circle(0, 0, 180); //set x / y to 0, 0 (origin) to translate / spin from center


    
    //create knob / handles for opening vault
    beginShape();
      vertex(-20, -135); // top left corner
      vertex(20, -135); //top right corner
      vertex(20, -45);// return corner top right
      vertex(80, -110); // right top diag/ top left cornor
      vertex(110, -80); // right top diag / top right corner
      vertex(50, -20); // return
      vertex(135, -20); //right top corner
      vertex(135, 20); //right bot corner
      vertex(50, 20); // return
      vertex(110, 80); // bot right diag /right corner
      vertex(80, 110); // bot right diag/ left corner
      vertex(20, 50);// bot diag return
      vertex(20, 135); //bot right corner
      vertex(-20, 135); //bot left corner
      vertex(-20, 50); //return
      vertex(-80, 110); // bot left diag/ bot corner
      vertex(-110, 80); // bot left diag / top corner
      vertex(-50, 20); //return 
      vertex(-135, 20); // left bot corner
      vertex(-135, -20); // left top corner
      vertex(-50, -20); // return
      vertex(-110, -80); // right corner
      vertex(-80, -110); // return
      vertex(-20, -50);
    endShape(CLOSE);

    pop();
  pop();
  //rotate above ^^
  //create circle


      // textSize(25);
    // text("Welcome to Safe Cracker!", width / 4, (height / 16));
    // textSize(15);
    // text("You will have 30 Seconds to Crack the Safe!", 270, 300);
    // text("Press space to start the Timer.", 350, 400);

  //create vault bars to spin

  // create spinning animation
 }
  //where the vault unlocking will occur
  function vaultLock() {

    //set vaultState to locked by default (done)
    //set keysRemaining to # u want, decrement each time successful
    if (keyRangeSet == false)
    {
      setKeyRange();
    }

    console.log(knobVal);

  if (buttonVal == 1)
  {
    if (knobVal >= keyRangeBottom && knobVal <= keyRangeTop)
    {
      //set Green LED to go on
      //move to next key / confirmation click
      // set correct Key count, once reaches certain # you win
      foundKey = true;
      ledOutput = 'green'; // set green light on
      keysRemaining--;
      keyRangeSet = false;

    }
    else
    {
      failAttempt = true;
      ledOutput = 'red'; // set red light on
      // set red LED to go off
      //speed up time
      //timeLeft--;
       timeLeft - 15;
      //error buzzer sound

    }
  }

    //once key vals are gotten, set range for acceptable guesses

    //check if answer is in range(key +/ - keyRange)

    //when time runs out, if vault is locked, fail screen

    //if vault is done before then, vict screen
  }
// set random value for key for vault combination
  function setKey() {
    return Math.floor(Math.random() * 360)
  }

  function setKeyRange() { // maybe remove

    key = setKey(); // get random key value

    keyRangeBottom = key - 15; // get top / bot vals
    keyRangeTop = key + 15;
    keyRangeSet = true;

    text("Vault key: " + key, 200, 200);
    //console.log(key);
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
 

