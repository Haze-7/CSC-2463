let sprite;
let animations;
let bugs = [];

let spawnX = 0;
let spawnY = 0;
let startOrientation = 0;

//game function
let bugSquished = false;
let timeLeft = 30; // default 30 secs
let playing = false;

function preload() {

  

  //row: index row (vert) column: index colmn (horiz) frames: no index to go through
  animations = {
    idleUp: {row: 0, frames: 1},
    goUp: {row: 0, col: 1, frames: 2},
    squishUp: {row: 3, col: 3, frames: 1},
    idleRight: {row: 1, frames: 1},
    goRight: {row: 1, col: 1, frames: 2},
    squishRight: {row:1, col: 3, frames: 1},
    idleLeft: {row: 2, frames: 1},
    goLeft: {row: 2, col: 1, frames: 2},
    squishLeft: {row: 2, col: 3, frames: 1},
    idleDown: {row: 3, frames: 1},
    goDown: {row: 3, col: 1, frames: 2},
    squishDown: {row: 3, col: 3, frames: 1}

  };

  spawnX = random(32, 568);
  spawnY = random(32, 568);
  startOrientation = Math.round(random(1,4));
  //playing = true;

  startMenu();
  
  bugs.push(new Bug(spawnX, spawnY, 32, 32, "assets/Bug.png", animations));
    
  

}

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);

  //start menu here
  startMenu();

  
  playing == true; // temporary

  if (playing)
  {
    play();
  }
  else
  {
    gameEnd();
  }

  //startMenu();
  bugs.forEach((bug) => {

  bug.idle();


  })


  //start left go right

  //start right go left

  //start up go down

  //start down go up
}

class Bug {

  constructor (x, y, width, height, spriteSheet, animations) {
    this.sprite = new Sprite(x, y, width, height); // add param
    this.sprite.spriteSheet= spriteSheet; // add param

    this.sprite.anis.frameDelay = 8;//how many frames to wait before going to next frame / sets speed
    this.sprite.addAnis(animations); //add the animations / movements selected by movements in preload()
    this.sprite.changeAni("idleUp"); //select ^^ animation to display
    }

        //implementation of walking animations / speed
        goUp() {
          this.sprite.changeAni("goUp");
          this.sprite.vel.y = -1; //.y means y value/ -1 means subtract y so up
          this.sprite.vel.x = 0;
        }
        
        goRight() {
          this.sprite.changeAni("goRight")
          this.sprite.vel.x = 1; // makes character walk forward/ off screen to right
          this.sprite.scale.x = 1; // right facing
          this.sprite.vel.y = 0; // make unused axis to 0 / makes them stop
        }
        
        goLeft() {
          this.sprite.changeAni("goRight"); // same ani, just switch scale
          this.sprite.vel.x = -1; // makes character go left
          this.sprite.scale.x = -1;//same size, flip horizontally 
          this.sprite.vel.y = 0; //unused axis
        }

        goDown() {
          this.sprite.changeAni("goDown");
          this.sprite.vel.y = 1; // cdown bc increasing in y
          this.sprite.vel.x = 0;
        }
        
        idle() {
          
          console.log(startOrientation);
          this.sprite.vel.x = 0; // stop moving left-right/ horizontally
          
          if (startOrientation == 1)  // come back to, set bounds
          {
          this.sprite.changeAni("idleUp"); // set to stand animation/ pose
          }
          else if (startOrientation == 2)//right
          {
            this.sprite.changeAni("idleRight");
          }
          else if (startOrientation == 3)//left
          {
            this.sprite.changeAni("idleLeft");
          }
          else if (startOrientation == 4) // down
          {
            this.sprite.changeAni("idleDown");
          }
          //must rotate to fit each direction (default up)
        }

        squish() {
          this.sprite.vel.x = 0;
          this.sprite.changeAni("squishUp");
          //increment bug squish counter
          //speed up speed of rest of them
        }
  }
  //display Menu text
  //get input to start
  //set playing to true
  function startMenu() {
    //text("message", xloc, yloc)
    
    text("Welcome to Bug Squish!", 300, 200);
    text("You will have 30 seconds to squishas many bugs as you can!", 300, 300);
    text("Press space to start playing.", 300, 400);
    if (key === ' ') {
      playing = true;
    }

  }
  function play() {
    playing = true;

    //time decrements over time in seconds
    timeLeft -= deltaTime / 1000; //track time (deltaTime) convert from milli -> seconds (/1000)

    // while (playing == true && timeLeft > 0)
    // {
    //   bugs.push(new Bug(spawnX, spawnY, 32, 32, "assets/Bug.png", animations));
    //   //new Bug(spawnX, spawnY, 32, 32, "assets/Bug.png", animations);
    // }
    bugs.push(new Bug(spawnX, spawnY, 32, 32, "assets/Bug.png", animations));
    
  }

  function gameEnd() {

    
  }
  // fix / replace later
  function keyTyped() {
    if (key === ' ') // checks for press space
    {
      if (gameEnd) { //restarts game with starting settings
        timeLeft = 30; // sets time back to start
        score = 0; // reset score
        gameOver = false; // go back to playing
      }
      else
      { //runs game mechanics
      { 
        //successful condition
        //if bug gets pressed properly, set squished to true
        if (bugSquished)
        {
        score++; //add  1 score if make it // set color based on last press ( success blue)
        }
      }

      }
    }
    } 

  //mouse click detection
  //no dragging (check mouse released)
