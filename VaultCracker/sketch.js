
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
let vaultKey = 0;
let keysRemaining = 3;
let ledOutput = 0;

//0 default
//1 = green light
//2 = red light

//setup values for difficulty selection
//easy button
let easyX = 450;
let easyY = 440;
//medium button
let mediumX = 450;
let mediumY = 535;
//hard button
let hardX = 450;
let hardY = 630;
//set size
let diffWidth = 250;
let diffHeight = 75;

//try playBack Rate for sound

//sound  Setup

let volumeLevel = -6; //change to make cop sound or vault sound
let playbackRate = 1;
let bgMusic;
let playMusicSequence;
//maybe remove filter
let filter = new Tone.Filter(200, "lowpass"); // low pass for low notes / # is cut off frequency // trigger low pass in end screen to show that game is over
let volume = new Tone.Volume(volumeLevel) // create / set volume effect

//do sound pipeline

let sounds;

//add a sound for success or fail in guessing key
sounds = new Tone.Players({
  vaultClicking: "assets/vaultClicking.mp3",
  quickSiren: "assets/quickSiren.mp3",
  failureSiren: "assets/endSiren.mp3",
  introMusic: "assets/introMusic.mp3", // created personally with the help of ableton playground
  // victoryMusic: "" // reuse of intro, but with new effects
  

});

//effects on sound samples
//effects on introMusic
sounds.player('introMusic').autostart = true; // starts music when app opened
sounds.player('introMusic').loop; // loop intromusic once finished
sounds.player("introMusic").Filter;
//effects on squish sound
sounds.player('vaultClicking').playbackRate = 1.4; // speed up sound to be more realistic for game
sounds.player('vaultClicking').volume = -.5; // make quieter slightly

//effects on victoryMusic
// sounds.player('outroMusic').loop; // loop intromusic once finished
// sounds.player("outroMusic").Filter;
// sounds.player("outroMusic").volume = -25;

//do same for lose music (sirens);
//set volume high compard to in game

sounds.connect(volume);
volume.toDestination();


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
  
  //analog output to arduino
  if (port.opened()) //first  check that port is open and do every third frame
  {
      //replace with way to send state of game / speed of lights compared to time
    //let message = ledOutput; //object array 
    let message = `${ledOutput}\n`; 
    //console.log(message); //message log return point

    port.write(message); //send message every 60 frames per second
    //write out values^^ over serial port
  }
}

  function startMenu() {
    background(128,128,128);
    textSize(25);
    text("Welcome to Safe Cracker!", 300, 100);
    textSize(15);
    text("You will have 60 Seconds to Crack the Safe!", 270, 300);
    text("Select Your Difficulty Level.", 380, 400);

    //end start music

    //difficulty seleciton menu
    difficultySelect();
    sounds.player('introMusic').stop(); // end start music
    //quickSiren.start(); // start gameplay police siren / loop sound
  
  }
  function playing() {
    //find a way to track time incrementing for uping volume over time

    //decrement time
    timeLeft -= deltaTime / 1000; //track time (deltaTime) convert from milli -> seconds (/1000) // time
    //find way to speed up timeLeft/ remove time for each incorrect answer
    //console.log(timeLeft);
    if (timeLeft <= 0)
    {
      quickSiren.stop(); // stop gameplay sirens
      sounds.player("failureSiren").start(); // sound return

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

    //game time counter
    text("Cops will Arrive in:" + ceil(timeLeft), 30 , 45);
    text("Keys Remaining: " + keysRemaining, 30, 80);


    vaultCreation();
    vaultLock();

    text("Vault key: " + vaultKey, 200, 200);
    text("LED Value: " + ledOutput, 200, 230);
    text("Knob Value: " + knobVal, 200, 260);
    
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
    difficultySelect();
    vaultCreation();
    text("Select a difficulty to play again!", 340, 750);
    rectMode(CORNER);
    difficultySelect();

  }

  //end screen for when player wins the game
  //have rain money and provide money earned and time remaining?
  function victoryScreen() {

    //start / play victory song
    //display money earned
    //end music / reset game
   // vaultCreation();

    text("Victory!", 200, 100);
    text("Select a difficulty to play again!", 340, 750);

    //vaultOpen()
    rectMode(CORNER);
    difficultySelect();

  }

  //vault handle spins along with knob
 function vaultCreation (){
  //create Square
  
  rectMode(CENTER);
  push();
    fill(183, 186, 181);
    square(centerX, centerY, 700);
    fill(123, 125, 121) //outer border
    rect(600, 178, 700 , 55);
    rect(600, 822, 700, 55);
    rect(923, 500  , 55, 700 );
    rect(277, 500, 55, 700);
    noStroke();
    circle(centerX, centerY, 450); // door perimeter
    rect(385, 410, 50, 60); //top hinge
    rect(385, 590, 50, 60); //bot hinge
    fill(183, 186, 181);

    circle(374, 394, 12); //top, top hinge screw
    circle(374, 423, 12); //bot, top hinge screw

    circle(374, 575, 12); //top, bot hinge screw
    circle(374, 605, 12); // bot, bot hinge screw
  
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

    fill(80, 80, 80);
    circle(0, 0, 370);

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
 }

 function vaultOpen()
 {
  // open vault animation
  //to be shown when character wins
 }
  //where the vault unlocking will occur
  function vaultLock() {

    //set vaultState to locked by default (done)
    //set keysRemaining to # u want, decrement each time successful
    if (keyRangeSet == false)
    {
      setKeyRange();
    }

    //console.log(knobVal); //knob val return point

  if (buttonVal == 1)
  {
    if (knobVal >= keyRangeBottom && knobVal <= keyRangeTop)
    {
      //set Green LED to go on
      //move to next key / confirmation click
      // set correct Key count, once reaches certain # you win
      foundKey = true;
      ledOutput = 2; // set green light on / green = 1, red = 2
      keysRemaining--;
      keyRangeSet = false;

    }
    else
    {
      ledOutput = 1; // set red light on
      // set red LED to go off
      //speed up time
      //timeLeft--;
       //timeLeft - 15;
    }
  }
  else{
    ledOutput = 0;
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

    vaultKey = setKey(); // get random key value

    keyRangeBottom = vaultKey - 15; // get top / bot vals
    keyRangeTop = vaultKey + 15;
    keyRangeSet = true;    
  }

  function difficultySelect() {
    
    fill(183, 186, 181); // change all to variable names
    rect(easyX, easyY, diffWidth, diffHeight);
    fill('black');
    text("Easy", 546, 485); // done
  //medium / normal
    fill(183, 186, 181);
    rect(mediumX, mediumY, diffWidth, diffHeight);
    fill('black');
    text("Medium", 530, 580);
  //hard
    fill(183, 186, 181);
    rect(hardX, hardY, diffWidth, diffHeight);
    fill('black');
    text("Hard", 546, 675);
  }

  function mouseClicked() {
  
    if (mouseX >= easyX && mouseX <= easyX + diffWidth && mouseY >= easyY && mouseY <= easyY + diffHeight)
    {
      //set easy mode
      keysRemaining = 3;
      difficulty = 'easy';
      timeLeft = 60;
      gameScreen = 'playing';
      console.log("easy");

    }
    else if (mouseX >= mediumX && mouseX <= mediumX + diffWidth && mouseY >= mediumY && mouseY <= mediumY + diffHeight)
    { 
      //set medium mode
      keysRemaining = 3;
      difficulty = 'medium';
      timeLeft = 45;
      gameScreen = 'playing';
      
      console.log("medium");
    }
    else if (mouseX >= hardX && mouseX <= hardX + diffWidth && mouseY >= hardY && mouseY <= hardY + diffHeight)
    {
      //set hard mode
      keysRemaining = 3;
      difficulty = 'hard';
      timeLeft = 30;
      gameScreen = 'playing';
      console.log("hard");
    }
    else
    {

    }
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

 

