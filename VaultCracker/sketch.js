//Vault Cracker Game
//Created by: Hayes Chiasson

//working youtube Link: https://youtu.be/GOpyO-VV6l0
//game setup
let gameFont;
let gameScreen;
let timeLeft = 0; 
let realTime = 0;
//webserial port
let port;
//input setup
let buttonVal = 0;
let knobVal = 0;
let vaultState = 'locked'; // update like gameScreen closed = locked, cracked = opened
let difficulty = 'easy';
let numOfKeys = 0; //# of keys to be solved for
let centerX = 0;
let centerY = 0;

//vault setup
let keyRangeSet = false;
let keyVal = 0;
let keyRangeBottom = 0;
let keyRangeTop = 0;
let keyDistance = 0;
let vaultKey = 0;
let keysRemaining = 3;

//output values to arduino for flashing police LED lights
let ledOutput = 0; // set condition

let img; // for vault open image

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

//default sound values for each set of sounds
let musicVolumeLevel = -5; //change to make cop sound or vault sound
let soundVolumeLevel = -15;
let vaultVolumeLevel = -5;
let jailVolumeLevel = 5;

let vaultDistortLevel = 2;


//maybe remove filter
let musicFilter = new Tone.Filter(200, "lowpass"); // low pass for low notes / # is cut off frequency // trigger low pass in end screen to show that game is over
let musicVolume = new Tone.Volume(musicVolumeLevel);// create / set volume effect

let soundVolume = new Tone.Volume(soundVolumeLevel);

let vaultFilter = new Tone.Distortion(vaultDistortLevel);
let vaultVolume = new Tone.Volume(vaultVolumeLevel);

let jailVolume = new Tone.Volume(jailVolumeLevel);

//reverb effects
let reverbLevel = 1.75;

let soundReverb = new Tone.Reverb(reverbLevel); //create / set revert effect/ level

let policePlaybackRate = 1;
let cruiserPlaybackRate = 1;

//clicking params
let clickingVolume = -7; // -5
let vaultPlaybackRate = 7; // 10.5


let music;
let sounds;
let vaultEffects;

music = new Tone.Players({
  introMusic: "assets/introMusic.mp3"
});


sounds = new Tone.Players({
  quickSiren: "assets/quickSiren.mp3",
  policeSiren: "assets/gameSiren.mp3",
  cruiserSiren: "assets/cruiserSiren.mp3",
  failSiren: "assets/failSiren.mp3"// created personally with the help of ableton playground
});

//add a sound for success or fail in guessing key
vaultEffects = new Tone.Players({
  vaultClicking: "assets/singleClick.mp3",
  //vault door open on win?s
});

//jail effect
jailEffects = new Tone.Players({
  jailDoor: "assets/jailDoor.mp3"
  //vault door open on win?s
});

jailEffects.connect(jailVolume);
jailVolume.toDestination();


//effects on sound samples
//effects on introMusic
music.player('introMusic').autostart = true; // starts music when app opened
music.player('introMusic').loop = true; // loop intromusic once finished

//effects for vault clicking / lock
vaultEffects.player('vaultClicking').loop = true;
vaultEffects.player('vaultClicking').volume;
vaultEffects.player('vaultClicking').playbackRate = vaultPlaybackRate;


//playing background police sirens
sounds.player('quickSiren').volume; 
sounds.player('quickSiren').loop = true;

//in game background siren
sounds.player('policeSiren').volume; 
sounds.player('policeSiren').loop = true;
sounds.player('policeSiren').playbackRate = policePlaybackRate;

//cruiser siren
sounds.player('cruiserSiren').volume; 
sounds.player('cruiserSiren').loop = true;
sounds.player('cruiserSiren').playbackRate = cruiserPlaybackRate;

jailEffects.player('jailDoor').volume; 
jailEffects.player('jailDoor').playbackRate = 1;


//connections for music
music.connect(musicFilter); // run through volume first
musicFilter.connect(musicVolume);
musicVolume.toDestination(); // pipe through revereb effect

//connections for sounds(sirens)

sounds.connect(soundVolume);
soundVolume.connect(soundReverb);
soundReverb.toDestination(); // add other effects / filters

//connections for vault sounds(vaultEffects)

vaultEffects.connect(vaultFilter);
vaultFilter.connect(vaultVolume);
vaultVolume.toDestination();

//victory music
let victoryMusic;
let playMusicSequence;

let victoryTheme = [["G2","E3"], ["G3","F2"], ["C3", "B3"]];// array of sounds to play

victoryMusic = new Tone.AMSynth({

  envelope : {
    attack: 0.3,
    decay: 0.3,
    sustain: 0.8,
    release: 0.56
  }
});

victoryMusic.toDestination();

victoryMusicSequence = new Tone.Sequence(function (time, note){
  victoryMusic.triggerAttackRelease(note, 0.4);
  }, victoryTheme, "4n");

Tone.Transport.start();



function preload() {

  gameFont = loadFont("assets/courbi.ttf"); // load in google font

  img= loadImage('assets/gold.png');

}
function setup() {
  
  createCanvas(1200, 1000);
  textFont(gameFont); 
  gameScreen = 'start'; // set default screen upon opening game
  //automatically connect to serial port
  port = createSerial(); // like sound, doesn't start on own/ require user to do something to get it to activate
  
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 2400);
  }
  
  centerX = width / 2;
  centerY = height / 2;

}
function draw() {
  background(128,128,128);

  //determine / change game state
  if (gameScreen === 'start')
  { 
    startMenu();
  }
  else if (gameScreen === 'fail')
  {
    failScreen();
  }
  else if (gameScreen === 'victory')
  {
    victoryScreen();
  }
  else if (gameScreen === 'playing')
  {
    playing();
  }

  let str = port.readUntil("\n"); // reads output until it sees () value
  let values = str.split(",");
  if (values.length > 1)
  {
    knobVal = values[0];
    buttonVal = values[1]; 
  }
  
  //analog output to arduino
  if (port.opened()) //first  check that port is open and do every third frame
  {
    let message = `${ledOutput}\n`; 
    port.write(message); //send message every 60 frames per second
    //write out values^^ over serial port
  }
}

  function startMenu() {
    background(128,128,128);
    textSize(65);
    text("Welcome to Safe Cracker!", 115, 150);
    textSize(25);
    text("Break into the Safe before the police arrive!", 260, 270);
    text("Use audio cues to guess the combination!", 280, 800);
    text("Select Your Difficulty Level.", 380, 400);
    ledOutput = 2;

    //difficulty selection menu
    difficultySelect();
  }
  function playing() {
    //incrementing value for time elapsed
    realTime += deltaTime / 1000; // keep track of current 

    soundVolumeLevel++; // cop sirens grow louder over time
    reverbLevel--; // cop siren reverb(distance simulation) weakens over time

    //decrement play time for counter
    timeLeft -= deltaTime / 1000; //track time (deltaTime) convert from milli -> seconds (/1000) // time
    //find way to speed up timeLeft/ remove time for each incorrect answers

    if (timeLeft <= 0)
    {
      //end game sounds
      sounds.player("policeSiren").stop();  //stop game siren
      sounds.player('cruiserSiren').stop();
      vaultEffects.player('vaultClicking').stop();
      //set game screen and start sound
      gameScreen = 'fail';
      jailEffects.player('jailDoor').start();
      vaultState = 'locked';
      timeLeft = 0;
    }
    else if (keysRemaining == 0)
    {
      //set game screem amd start spimd
      gameScreen = 'victory';
      vaultState = 'unlocked';
      //stop gameplay sounds
      vaultEffects.player('vaultClicking').stop();
      sounds.player("policeSiren").stop();  //stop game siren
      sounds.player('cruiserSiren').stop();

      victoryMusicSequence.start(); // start music sequence

    }

    //game time counter
    text("Cops will Arrive in:" + ceil(timeLeft), 30 , 45);
    text("Keys Remaining: " + keysRemaining, 30, 80);

    vaultCreation();
    vaultLock();
    distanceFromKey();
    keyProximity();
    policeResponse();

    //developerMode() // for testing values
    
  }

  function failScreen() {
    ledOutput = 1; // set sirens to keep going
    jailBars();
    textSize(50);
    text("You got Arrested!", 345, 140);
    textSize(25);
    text("Select a difficulty to try again!", 340, 750);
    rectMode(CORNER);
    difficultySelect();
  }

  //end screen for when player wins the game
  function victoryScreen() {

    ledOutput = 2;
    textSize(50);
    text("Victory!", 480, 100);
    textSize(25);
    text("Select a difficulty to play again!", 340, 750);

    vaultOpen();
    rectMode(CORNER);
    difficultySelect();
  }

  //draws jailbars for fail screen
  function jailBars()
  {
    push();
    noStroke();
      fill(80, 80, 80);
      rect(20, 0, 50, height);
      rect(120, 0, 50, height);
      rect(220, 0, 50, height);
      rect(320, 0, 50, height);
      rect(420, 0, 50, height);
      rect(520, 0, 50, height);
      rect(620, 0, 50, height);
      rect(720, 0, 50, height);
      rect(820, 0, 50, height);
      rect(920, 0, 50, height);
      rect(1020, 0, 50, height);
      rect(1120, 0, 50, height);
    pop();
  }

  //vault handle spins along with knob
 function vaultCreation (){
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
    push() // x= 1200, y = 1000
    noStroke();
      push();
        fill(64, 64, 64);
        circle(centerX, centerY, 470);
      pop();
    circle(centerX, centerY, 450); // door perimeter
    rect(385, 410, 50, 60); //top hinge
    rect(385, 590, 50, 60); //bot hinge
    fill(183, 186, 181);

    circle(374, 394, 12); //top, top hinge screw
    circle(374, 423, 12); //bot, top hinge screw

    circle(374, 575, 12); //top, bot hinge screw
    circle(374, 605, 12); // bot, bot hinge screw
    
    angleMode(DEGREES);
    translate(centerX, centerY); // set origin to middle
    rotate(knobVal);
    
    fill(80, 80, 80);
    circle(0, 0, 370);

    fill(123, 123, 123);
    circle(0, 0, 180); //set x / y to 0, 0 (origin) to translate / spin from center

    //door handles
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
//creates open vault image for display at victory
 function vaultOpen()
 {
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
    push();
      fill(64, 64, 64);
      circle(centerX, centerY, 470); // door outline
      image(img, 380, 275, 450, 450);
      pop(); 
    fill(64, 64, 64);
    fill(183, 186, 181);
    circle(centerX - 430, centerY, 450); // door perimeter // outer door perim(light grey)
    rect(385, 410, 50, 60); //top hinge
    rect(385, 590, 50, 60); //bot hinge
    fill(183, 186, 181);
  pop();

  push() // x= 1200, y = 1000
    angleMode(DEGREES);
    translate(centerX, centerY); 
    noStroke();

    fill(80, 80, 80);
    circle(-430, 0, 370); // outer ring

    fill(123, 123, 123);
    circle(-430, 0, 180) // center circle
  pop();
 }
  //where the vault unlocking will occur
  function vaultLock() {
    if (keyRangeSet == false)
    {
      setKeyRange();
    }

  if (buttonVal == 1)
  { // return here
    if (knobVal >= keyRangeBottom && knobVal <= keyRangeTop) // if in range
    {
      keysRemaining--; //when key found, 1 less key remaining
      keyRangeSet = false; 
    }
    else if (keyDistance >= 35)
    {
    timeLeft--; //penalize player (speed up time) for incorrect guesses
    }
  }
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
  //determine distance from key and set sound effects accordingly
  function keyProximity() { 
    if (keyDistance <= 15)//range 1 (over key) / in key (+ / - 15)
    {
      vaultPlaybackRate = 3; 
      vaultEffects.player('vaultClicking').playbackRate = 2;
    }
    else if (keyDistance <= 50)//range 2 // close (within 50 )
    {
      vaultPlaybackRate = 5;
      vaultEffects.player('vaultClicking').playbackRate = 3.5;

    }
    else if (keyDistance <= 75)//range 3 (approaching (within 75))
    {
      vaultPlaybackRate = 7;
      vaultEffects.player('vaultClicking').playbackRate = 5;

    }
    else//range 4 / far (default) (beyond 75)
    {
      vaultPlaybackRate = 10;
      vaultEffects.player('vaultClicking').playbackRate = 6;
    }
  }
//calculate your current distance from the key
  function distanceFromKey() {
    keyDistance = Math.abs(knobVal - vaultKey);     
  }
  //create boxes for difficulty selection
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
//handle checking for mouse clicks inside certain perameters
  function mouseClicked() {
    if (mouseX >= easyX && mouseX <= easyX + diffWidth && mouseY >= easyY && mouseY <= easyY + diffHeight)
    {
      //set easy mode
      keysRemaining = 3;
      difficulty = 'easy';
      timeLeft = 60;
      gameScreen = 'playing';
      music.player('introMusic').stop(); // end start music
      victoryMusicSequence.stop(); // start music sequence
      sounds.player('cruiserSiren').start(); // each gamemode has diff sirens
      vaultEffects.player('vaultClicking').start();
    }
    else if (mouseX >= mediumX && mouseX <= mediumX + diffWidth && mouseY >= mediumY && mouseY <= mediumY + diffHeight)
    { 
      //set medium mode
      keysRemaining = 3;
      difficulty = 'medium';
      timeLeft = 45;
      gameScreen = 'playing';
      music.player('introMusic').stop(); // end start music
      victoryMusicSequence.stop(); // start music sequence
      sounds.player('policeSiren').start();
      vaultEffects.player('vaultClicking').start();
    }
    else if (mouseX >= hardX && mouseX <= hardX + diffWidth && mouseY >= hardY && mouseY <= hardY + diffHeight)
    {
      //set hard mode
      keysRemaining = 3;
      difficulty = 'hard';
      timeLeft = 30;
      gameScreen = 'playing';
      console.log("hard");
      music.player('introMusic').stop(); // end start music
      victoryMusicSequence.stop(); // start music sequence
      sounds.player('policeSiren').start();
      sounds.player('cruiserSiren').start(); // added difficulty of this siren?
      vaultEffects.player('vaultClicking').start();
    }
  }
//calculate / start police response (lights and sirens) based on time remaining and player input
  function policeResponse() {
    if (timeLeft <= 28) //in this format, logic is opposite (block / set sirens to mute UNTIL time passed, then play them)
    {
      sounds.player('policeSiren').playbackRate = 0; // first siren starts at 28 seconds left
      sounds.player('cruiserSiren').playbackRate = cruiserPlaybackRate;
      ledOutput = 2; // leds start flashing
      if (timeLeft <= 18)
      {
        sounds.player('policeSiren').playbackRate = policePlaybackRate; // 
        ledOutput = 1;
      }
    }
    else
    {
      sounds.player('policeSiren').playbackRate = 0; // s
      sounds.player('cruiserSiren').playbackRate = 0
      ledOutput = 1
    }
  }
//function for displaying all relevant data on screen for developement
  function developerMode() {
    text("Vault key: " + vaultKey, 200, 200);
    text("LED Value: " + ledOutput, 200, 230);
    text("Knob Value: " + knobVal, 200, 260);
    text("Distance from Key: " + keyDistance, 200, 290);
    text("playbackRate: " + vaultPlaybackRate, 500, 50);
    text("volume: " + vaultVolumeLevel, 500, 80);
  }



 

