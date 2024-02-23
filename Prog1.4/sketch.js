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
  gameScreen = 'start'; // figure this out
  
}
function draw() {
  background(160,82,45);
  if (gameScreen === 'start')
  { 
    startMenu();
  }
  else if (gameScreen === 'endScreen')
  {
    endScreen();
  }
  else if (gameScreen === 'playing')
  {
    playing();
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
  }
  //display Menu text
  //get input to start
  //set playing to true
  function startMenu() {
    background(160,82,45);
    text("Welcome to Bug Squish!", width / 3, (height / 16));
    text("You will have 30 seconds to squish as many bugs as you can!", 100, 300);
    text("Press space to start the Timer.", 300, 400);
    if (key === ' ') {
        gameScreen = 'playing';
        startSpawn = true;
    }
  }
  function playing() {
    //game time counter
   
    text("Time Left:" + ceil(timeLeft), 30 , 45);
    text("Bugs Squashed: " + bugsSquished , width - 210 , 45);
    timeLeft -= deltaTime / 1000; //track time (deltaTime) convert from milli -> seconds (/1000)
    if (timeLeft <= 0)
    {
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
  function endScreen() {
    background(160,82,45);
    text("Good Job!", width / 3, (height / 16));
    text("Final Score: "+ bugsSquished, 100, 300);
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
        startSpawn = true;
        speed = 1;
        bugsSquished = 0;
        timeLeft = 30;
    }
  }
  function mouseReleased() { // detect press on bug / stop dragging

    bugs.forEach((bug) => {
      if (!bug.isSquished && gameScreen === 'playing') // check if game is playing & the bug isn't already squished
      {
        if (bug.contains(mouseX, mouseY)) // if mouse is inside bug
        {
          bug.squish(); //squish it
          bugsSquished++; // and to counter
          speed += 0.1; // increase speed
        }
      }
      
    })
  }

