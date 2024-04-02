let volumeLevel = -6;
let playbackRate = 1;
let bgMusic;
let playMusicSequence;


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
});

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
let restartKey = 'r';

sounds.connect(volume);
volume.toDestination();

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

  //display Menu text
  //get input to start
  //set playing to true
  function startMenu() {
    background(120,82,45);
    
    text("Welcome to Bug Squish!", width / 3, (height / 16));
    text("You will have 30 seconds to squish as many bugs as you can!", 100, 300);
    text("Press space to start the Timer.", 300, 400);
    //backgroundMusic.start();
    //add effects like backgroundMusic.reverse() = true;


    if (key === ' ') {
        sounds.player('introMusic').stop();
        gameScreen = 'playing';
        startSpawn = true;
        //find way to start tone here
        
        playMusicSequence.start(); // start music sequence

        //get to work with : playMusicSequence.start(); 
    }
  }
  function playing() {
    //game time counter
    
    
    text("Time Left:" + ceil(timeLeft), 30 , 45);
    //text("Bugs Squashed: " + bugsSquished , width - 210 , 45); score

    timeLeft -= deltaTime / 1000; //track time (deltaTime) convert from milli -> seconds (/1000) // time

    if (timeLeft <= 0)
    {
      gameScreen = 'endScreen';
      timeLeft = 0;
    }
  }
  function endScreen() {
    background(130,82,45);

    //text("Good Job!", width / 3, (height / 16));
    //text("Final Score: " , 100, 300);
    text("Press " + restartKey + " to play again.", 300, 400);
    if (key === restartKey) {
      if (restartKey = 'r') // added to alternate restart key between r and space, resolves error where game skips straight to end scene
      {
        restartKey = ' ';
      }
      else
      {
        restartKey = 'r';
      }
        //reset/ restart gane
        gameScreen = 'playing';
    }
  }
  // function mouseClicked() { // detect press on bug / stop dragging
  // }
