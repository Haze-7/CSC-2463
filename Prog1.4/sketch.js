let sprite;
let animations;
let bugs = [];

let spawnX;
let spawnX2;
let spawnX3;
let spawnY;
let spawnY2;
let spawnY3;
let startOrientation = 0;
let numBugSpawn = 0;

//Mouse detection/ clicking
let dragging = false;
let bugWidth = 32;
let bugHeight = 32;
let bugSize = 32;


//game function

let gameOver = false;
let bugSquished = false;
let timeLeft = 30; // default 30 secs
let playing = false;

// squish counter
let squishCounter = 0;

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
  spawnX2 = random(32, 568);
  spawnX3 = random(32, 568);
  spawnY = random(32, 568);
  spawnY2 = random(32, 568);
  spawnY3 = random(32, 568);

  startOrientation = Math.round(random(1,4));
  numBugSpawn = Math.round(random(1,5));

  //fix to set random # of bug
  if (numBugSpawn == 1)
  {
  bugs.push(new Bug(spawnX, spawnY, bugWidth, bugHeight, "assets/Bug.png", animations));
  }
  bugs.push(new Bug(spawnX2, spawnY2, bugWidth, bugHeight, "assets/Bug.png", animations));
  bugs.push(new Bug(spawnX3, spawnY3, bugWidth, bugHeight, "assets/Bug.png", animations));

}

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);
  //start menu here

  // playing == true; // temporary

  // if (playing)
  // {
  //   play();
  // }
  // else
  // {
  //   gameEnd();
  // }

  if (bugSquished) {

  }

  //startMenu();
  bugs.forEach((bug) => {
  
  if (startOrientation == 1)
  {
    bug.goRight();
  }
  else if (startOrientation == 2)
  {
    bug.goLeft();
  }
  else if (startOrientation == 3)
  {
    bug.goUp();
  }
  else if (startOrientation == 4)
  {
    bug.goDown();
  }


  })
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
        //necessary?
        idle() {
          
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
          bugSquished++;//increment bug squish counter
          this.sprite.vel.x++;//speed up speed of rest of them
        }
  }
  //display Menu text
  //get input to start
  //set playing to true
  function startMenu() {
    //text("message", xloc, yloc)
    background();
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
  function mousePressed()
  {
    if (mouseX >= spawnX && mouseX <= spawnX + bugSize && mouseY >= spawnY && mouseY <= spawnY + bugSize){
      dragging = true;
      bugSquished = true;
      squishCounter++;
      console.log("mousePressed");
    }
  }
  //(check mouse released)
  function mouseReleased() {
    dragging = false;
    console.log("mouseReleased");
  }
//no dragging 
  function mouseDragged() {
    if (dragging) {
      spawnX += mouseX - pmouseX;
      spawnY += mouseY - pmouseY;
      console.log("mouseDragged");
    }
  }

  /*
  Need to do:
  Finish setting up mouse clicking (x/y = spawnX/spawnY? figure that out)
  better way to spawn multiple (insteadof spawnX1-3/spawnY1-3)
  start / end menu
  counter / timer
  displaying ^^
  */