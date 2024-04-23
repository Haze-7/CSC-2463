let volumeLevel = -6;
let playbackRate = 1;
let bgMusic;
let playMusicSequence;

//to do:
//replace all mouseclicked or keyboard press with switch 
//figure out how to do contains / when above circle



//sound stuff from before, change to fit bug squish
//let membraneSynth = new Tone.PolySynth(Tone.MembraneSynth); 
let filter = new Tone.Filter(200, "lowpass"); // low pass for low notes / # is cut off frequency // trigger low pass in end screen to show that game is over
let volume = new Tone.Volume(volumeLevel) // create / set volume effect


let playMusic = [["G2","E3"], ["G3","F2"], ["C3", "B3"]];// array of sounds to play

bgMusic = new Tone.AMSynth({

  envelope : {
    attack: 0.3,
    decay: 0.3,
    sustain: 0.8,
    release: 0.56
  }
})

volumeLevel = 10;

bgMusic.connect(volume);
volume.connect(filter);
filter.toDestination();



playMusicSequence = new Tone.Sequence(function (time, note){
  bgMusic.triggerAttackRelease(note, 0.4);
  }, playMusic, "4n");

Tone.Transport.start();


let sounds;

sounds = new Tone.Players({
  squish: "assets/splat.mp3", //gotten from youtube / free use
  introMusic: "assets/introMusic.mp3", // created personally with the help of ableton playground
  outroMusic: "assets/outroMusic.mp3" // reuse of intro, but with new effects

});

//effects on introMusic
sounds.player('introMusic').autostart = true; // starts music when app opened
sounds.player('introMusic').loop; // loop intromusic once finished
sounds.player("introMusic").Filter;
//effects on squish sound
sounds.player('squish').playbackRate = 1.4; // speed up sound to be more realistic for game
sounds.player('squish').volume = -.5; // make quieter slightly

//effects on outroMusic
sounds.player('outroMusic').loop; // loop intromusic once finished
sounds.player("outroMusic").Filter;
sounds.player("outroMusic").volume = -25;


// start original bug squish code
let sprite;
let animations;
let bugs = [];
let gameFont;
let spriteSheet;
let gameScreen;
let timeLeft = 30;
let gameOver = false;
let gameEnd = false;
let spawnRate = 10;
let bugsSquished = 0; // score
let startOrientation = [0, 90, 180, 270];
let startSpawn = false;
let speed = 1;

sounds.connect(volume);
volume.toDestination();

//Joystick 
let port;
let joyX = 0, joyY = 0, sw = 0;
let connectButton;
//position of circle variables
let circleX;
let circleY;
let joySpeed = 3;
//buzzer output
let soundLevel = 0;

function preload() {

  spriteSheet = loadImage("assets/Bug.png");
  gameFont = loadFont("assets/PressStart2P-Regular.ttf"); // load in google font

  //row: index row (vert) column: index colmn (horiz) frames: no index to go through
  animations = {
    idle: {row: 0, frames: 1},
    walk: {row: 0, col: 1, frames: 2},
    squish: {row: 3, col: 3, frames: 1},
  };

}
function setup() {
  
  createCanvas(1000, 1000);
  textFont(gameFont); 
  gameScreen = 'start'; 
  //start background start sound

  //Joystick
  circleX = width / 2;
  circleY = width /2; // put in middle of canvas

  port = createSerial(); // like sound, doesn't start on own/ require user to do something to get it to activate
  
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
  }
  
  connectButton = createButton("Connect");
  connectButton.mousePressed(Connect);
  
}
function draw() {
  background(160,82,45);
  if (gameScreen === 'start')
  { 
    startMenu();
    //maybe trigger song here

  }
  else if (gameScreen === 'endScreen')
  {
    endScreen();
    //maybe trigger song here
  }
  else if (gameScreen === 'playing')
  {
    playing();
    //maybe trigger song here
  }

  //Joystick
  let str = port.readUntil("\n"); // reads output until it sees () value
  //text(str, 10, 10); // print out whatever we read from serial port in javaScript page // old printout
  let values = str.split(",");

  if (values.length > 2) // just in case mid send error / check if full value
  {
    joyX = values[0];
    joyY = values[1];
    sw = Number(values[2]); // must change to number (makes member of number class)

    //modify circle X / Y location when moving ^^ joystick values
    //Joystick Movement
    console.log(joyX, joyY, sw);
    if (joyX < 0)
    {
      circleX += joySpeed;
    }
    else if (joyX > 0)
    {
      circleX -= joySpeed;
    }
    // for ys
    if (joyY < 0)
    {
      circleY += joySpeed;
    }
    else if (joyY > 0)
    {
      circleY -= joySpeed;
    }

    //analog output to arduino
    if (port.opened() && frameCount % 3) //first check that port is open and do every third frame
    {
      
      let message = soundLevel ; //object array 
      console.log(message);
      port.write(message); //send message every 60 frames per second
      //write out values^^ over serial port
    }

    //get mouseClicked transfered to joystick
    //find a new way to track circle space
    //replace mouseX / mouseY with circleX/Y
    //either shrink circle or find way to include radius
  }
  if (sw == 1) // now, pressing button on joystick changes color of circle
  {
    //fill("blue"); // I want to replace this with some other indication of click happening
    bugs.forEach((bug) => {
      if (!bug.isSquished && gameScreen === 'playing') // check if game is playing & the bug isn't already squished
      {
        if (bug.contains(circleX, circleY)) // if mouse is inside bug
        {
          bug.squish(); //squish it
          bugsSquished++; // and to counter
          speed += 0.2; // increase speed

          //play splat sound effect on squish/
          sounds.player('squish').start(); // maybe error here

          //set buzzer sound to go off
          soundLevel = 115;
        
        }
      }
      
    });

  }
  else
  {
    //turn off buzzer when not squish
    soundLevel = 0;
    //fill(255);
    //make to where it doesn't count if above not true, maybe boolean value
    //could be boolean switchPressed
    //make sure doesn't work unless above is true / on

  }
  //cursor circle
  circle(circleX, circleY, 25); // draw circle in center of 50 diameter
}
class Bug {
  constructor (x, y, width, height, spriteSheet, animations) {
    this.sprite = new Sprite(x, y, width, height); // add param
    this.sprite.spriteSheet= spriteSheet; // add param
    
    this.sprite.collider = 'none';
    this.sprite.anis.frameDelay = 8;//how many frames to wait before going to next frame / sets speed
    this.sprite.addAnis(animations); //add the animations / movements selected by movements in preload()
    this.sprite.changeAni("idle"); //select ^^ animation to display
    this.isSquished  = false;
    
    }
     //implementation of walking animations / speed
    goUp() {
      this.sprite.changeAni("walk"); // no need for rotation
      this.sprite.vel.y = -speed; //.y means y value/ -1 means subtract y so up
      this.sprite.vel.x = 0;
      this.sprite.rotation = 0;
    }
        
    goRight() {
      this.sprite.changeAni("walk")
      this.sprite.vel.x = speed; // makes character walk forward/ off screen to right
      this.sprite.vel.y = 0; // make unused axis to 0 / makes them stop
      this.sprite.rotation = 90;
    }
        
    goLeft() {
    this.sprite.changeAni("walk"); // same ani, just switch scale
    this.sprite.vel.x = -speed // go left
    this.sprite.vel.y = 0; //unused axis
    this.sprite.rotation = 270;
  }
  goDown() {
    this.sprite.changeAni("walk");
    this.sprite.vel.y = speed; // cdown bc increasing in y
    this.sprite.vel.x = 0;
    this.sprite.rotation = 180;
  }
  squish() {
    this.sprite.changeAni("squish");
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 0;
    this.isSquished = true;
  }
  contains(x,y) {
    let insideX = x >= this.sprite.x && x <= this.sprite.x + 32;
    let insideY = y >= this.sprite.y && y <= this.sprite.y + 32;
   return insideX && insideY;
  }

}


  function isBugSquished() {
    return this.isSquished; // check for bug being squished to make sure it can't be messed with again/ after
    //maybe play sound if bug is missed / not
  }

  //Changes to be made:
  //get input from joystick
  //use input (switch) to start 
  function startMenu() {
    background(120,82,45);
    
    text("Welcome to Bug Squish!", width / 3, (height / 16));
    text("You will have 30 seconds to squish as many bugs as you can!", 100, 300);
    text("Press down on the Joystick to start the Timer.", 300, 400);
    text("This is your cursor, move around with the Joystick and press it to begin.", 100, 100);
    //replace space press w/ joystick press
    if (sw == 1) {
        sounds.player('introMusic').stop();
        gameScreen = 'playing';
        startSpawn = true;        
        playMusicSequence.start(); // start music sequence

    }
  }
  //Changes to be made:
  //output to LED
  //input from Joystick(maybe not)
  //May not need to make changes here
  function playing() {
    //game time counter
    
    
    text("Time Left:" + ceil(timeLeft), 30 , 45);
    text("Bugs Squashed: " + bugsSquished , width - 210 , 45);

    timeLeft -= deltaTime / 1000; //track time (deltaTime) convert from milli -> seconds (/1000)

    if (timeLeft <= 0)
    {
      playMusicSequence.stop(); // send play music sequence
      //Tone.Transport.stop();
      sounds.player("outroMusic").start();
      gameScreen = 'endScreen';
      timeLeft = 0;
    }

    if (startSpawn == true) // check if spawning enabled
    {
      startSpawn = false; // if spawning, disable it until next space click / game start

    for(let i = 0; i < 55; i++) //bug spawner
    {
      bugs.push(new Bug(random(50, 968), random(50, 968), 32, 32, spriteSheet, animations));

    bugs.forEach((bug) => {

      bug.rotation = random(startOrientation);

      if (bug.rotation === 90)
      {
        bug.goRight();
      }
      else if (bug.rotation === 270)
      {
        bug.goLeft();
      }
      else if (bug.rotation === 0)
      {
        bug.goUp();
      }
      else if (bug.rotation === 180)
      {
        bug.goDown();
      }
      else
      {
        bug.squish();
      }

       });
      }
    }
    bugs.forEach((bug) => {
      
      if (bug.sprite.x + bug.sprite.width/4 > width) //if hit right wall
      {
        bug.goLeft(); // go back left
        
      } 
      else if (bug.sprite.x - bug.sprite.width/4 < 0) //if hit left wall
      {
        bug.goRight(); // go back right
      }
  
  
      if (bug.sprite.y + bug.sprite.height/4 > height) // if reach bottom border
      {
        bug.goUp(); // turn around (up)
      } 
      else if (bug.sprite.y - bug.sprite.height/4 < 0) //if reach top border
      {
        bug.goDown(); // turn back down
        
      }
  
    });

       //do border / bounds (make function?)
  }
  //changes to be made
  //change input to switch / joystick
  //maybe change start / restart to click on button / specific area instead of straight click
  //get outputs to led?
  function endScreen() {
    background(130,82,45);

    text("Good Job!", width / 3, (height / 16));
    text("Final Score: "+ bugsSquished, 100, 300);
    text("Press down on the joystick to play again.", 300, 400); // maybe change
    if (sw == 1) { // if button pressed
        //reset/ restart game
         // stop endscreen music
        sounds.player("outroMusic").stop();
        //restart playing bg music
        playMusicSequence.start(); // start music sequence
        //reset / restart game values
        gameScreen = 'playing';
        startSpawn = true; // maybe use to start play music
        speed = 1;
        bugsSquished = 0;
        timeLeft = 30;
    }
    //decide if else is necessary / needed
  }
  //replace function w/ joystick presses
  //may need to move into draw / can't be own function
  // function buttonPressed() { // detect press on bug / stop dragging

  //   bugs.forEach((bug) => {
  //     if (!bug.isSquished && gameScreen === 'playing') // check if game is playing & the bug isn't already squished
  //     {
  //       if (bug.contains(mouseX, mouseY)) // if mouse is inside bug
  //       {
  //         bug.squish(); //squish it
  //         bugsSquished++; // and to counter
  //         speed += 0.2; // increase speed
         

  //         //play splat sound effect on squish/
  //         sounds.player('squish').start();
  //       }
  //     }
      
  //   });
  //}
  //Joystick
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
