let sprite;
let animations;
let bugs = [];
let gameFont;
let spriteSheet;
let gameScreen;
let timeLeft = 30;
let gameOver = false;
let gameEnd = false;
let isSquished = false;
let spawnRate = 10;
let bugsSquished = 0;
let bugsSquashed;

let startOrientation = 0;



function preload() {

  gameFont = loadFont("assets/PressStart2P-Regular.ttf"); // load in google font

  //row: index row (vert) column: index colmn (horiz) frames: no index to go through
  animations = {
    idleUp: {row: 0, frames: 1},
    goUp: {row: 0, col: 1, frames: 2},
    squishUp: {row: 3, col: 3, frames: 1},
    goRight: {row: 1, col: 1, frames: 2},
    squishRight: {row:1, col: 3, frames: 1},
    goLeft: {row: 2, col: 1, frames: 2},
    squishLeft: {row: 2, col: 3, frames: 1},
    goDown: {row: 3, col: 1, frames: 2},
    squishDown: {row: 3, col: 3, frames: 1}
  };
  startOrientation = Math.round(random(1,4));

    for(let i = 0; i < 30; i++) 
    {
      bugs.push(new Bug(random(50, 968), random(50, 968), 32, 32, "assets/Bug.png", animations));
    }

}

function setup() {
  
  createCanvas(1000, 1000);
  textFont(gameFont); 
  bugsSquashed = 0;
  gameScreen = 'start'; // figure this out
  
}

function draw() {
  background(160,82,45);

if (gameScreen === 'start')
{
  startMenu();
}
else if (gameScreen === 'playing')
{
  playing();
}
// else if (gameScreen === 'endScreen');
// {
//   endScreen();
// }

}

class Bug {

  constructor (x, y, width, height, spriteSheet, animations) {
    this.sprite = new Sprite(x, y, width, height); // add param
    this.sprite.spriteSheet= spriteSheet; // add param
    
    this.sprite.collider = 'none';
    this.sprite.anis.frameDelay = 8;//how many frames to wait before going to next frame / sets speed
    this.sprite.addAnis(animations); //add the animations / movements selected by movements in preload()
    this.sprite.changeAni("idleUp"); //select ^^ animation to display
    }

     //implementation of walking animations / speed
      goUp() {
      this.sprite.changeAni("goUp"); // no need for rotation
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
    this.sprite.vel.x = -1 // go left
    this.sprite.scale.x = -1;//same size, flip horizontally 
    this.sprite.vel.y = 0; //unused axis
  }

  goDown() {
    this.sprite.changeAni("goDown");
    this.sprite.vel.y = 1; // cdown bc increasing in y
    this.sprite.vel.x = 0;
  }
  squish() {
    if (startOrientation == 1)
    {
    this.sprite.changeAni("squishRight")
    }
    if (startOrientation == 2)
    {
    this.sprite.changeAni("squishLeft")
    }
    if (startOrientation == 3)
    {
    this.sprite.changeAni("squishUp")
    }
    if (startOrientation == 4)
    {
    this.sprite.changeAni("squishDown")
    }
  }

  contains(x,y) {
    let insideX = x >= this.sprite.x && x <= this.sprite.x + 32;
    let insideY = y >= this.sprite.y && y <= this.sprite.y + 32;
   return insideX && insideY;
  }

  bounds() {
  
  if (sprite.x  + sprite.width/4 > width) // if sprite x is past edge of canvas(width)/ for right side sprite.width /2 gives padding
  { 
    walkLeft();
  }
  else if (sprite.x - sprite.width/4 < 0) //if touches left of canvas / x = 0 / padding spritelength /4
  {
    walkRight();
  }
  else if (sprite.y + sprite.height/4  > height)
  {
    walkUp();
  }
  else if (sprite.y - sprite.height/4 < 0)
  {
    walkDown();
  }
  }
}

  //display Menu text
  //get input to start
  //set playing to true

  function startMenu() {
    background(160,82,45);

    if (key === ' ') {
        gameScreen = 'playing';
    }
  }

  function playing() {
    //game time counter

    //console.log(ceil(timeLeft));
    text("Time Left:" + ceil(timeLeft), 30 , 45);
    text("Bugs Squashed: " + bugsSquished , width - 210 , 45);
    timeLeft -= deltaTime / 1000; //track time (deltaTime) convert from milli -> seconds (/1000)

    if (timeLeft == 0)
    {
      gameScreen = 'endScreen';
    }

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
        mouseReleased(bug.squish());
        { 
          
          bugsSquished++;
          console.log("mousePressed");
        }
       });
  }

  function endScreen() {
    background(160,82,45);
    text("Good Job!", width / 3, (height / 16));
    text("Final Score: "+ bugsSquished, 100, 300);
    text("Press space to play again.", 300, 400);

    if (key === ' ') {
        gameScreen = 'playing';
    }
  }

  function mouseReleased()
  {
    for (let i = 0; i < animations.length; i++) {
    if (bugs[0].contains(mouseX, mouseY))
    { 
      if (startOrientation == 1)
      {
      sprite.changeAni("squishRight")
      }
      if (startOrientation == 2)
      {
      sprite.changeAni("squishLeft")
      }
      if (startOrientation == 3)
      {
      sprite.changeAni("squishUp")
      }
      if (startOrientation == 4)
      {
      sprite.changeAni("squishDown")
      }
      sprite.vel.x = 0;
      sprite.vel.y = 0;
      bugsSquished++;
      console.log("mousePressed");
    }
  }
}
