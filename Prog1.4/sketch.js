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
let speed = 1;




let startOrientation;
// let numBugSpawn = 0;

let bugsOnScreen = 0;

let rotation;
//Mouse detection/ clicking
let dragging = false;
let bugWidth = 32;
let bugHeight = 32;
let bugSize = 32;

function preload() {

  gameFont = loadFont("assets/PressStart2P-Regular.ttf"); // load in google font
  spriteSheet = loadImage("assets/Bug.png");

  //row: index row (vert) column: index colmn (horiz) frames: no index to go through
  animations = {
    idle: {row: 0, frames: 1},
    walk: {row: 0, col: 1, frames: 2},
    squish: {row: 3, col: 3, frames: 1}
    };

    for(let i = 0; i < 15; i++) {
      bugs.push(new Bug(random(32, 568), random(32, 568), bugWidth, bugHeight, "assets/Bug.png", animations));
      }

}

function setup() {
  
  createCanvas(1000, 1000);
  //resizeCanvas(windowWidth, windowHeight);
  textFont(gameFont); 
  
  
  bugsSquashed = 0;
  gameScreen = 'start'; // figure this out
  //timeOut = false; / maybe add back in after
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


}

class Bug {

  constructor (x, y, width, height, spriteSheet, animations) {
    this.sprite = new Sprite(x, y, width, height); // add param
    this.sprite.spriteSheet= spriteSheet; // add param
    
    this.sprite.collider = 'none';
    this.sprite.anis.frameDelay = 8;//how many frames to wait before going to next frame / sets speed
    this.sprite.addAnis(animations); //add the animations / movements selected by movements in preload()
    this.sprite.changeAni("idle"); //select ^^ animation to display
    this.sprite.rotation = rotation;
    this.sprite.speed = speed;
    }

        //implementation of walking animations / speed
        goUp() {
          this.sprite.changeAni("walk"); // no need for rotation
          this.sprite.vel.y = -1; //.y means y value/ -1 means subtract y so up
          this.sprite.vel.x = 0;

        }
        
        goRight() {
          this.sprite.changeAni("walk")
          this.sprite.vel.x = 1; // makes character walk forward/ off screen to right
          this.sprite.scale.x = 1; // right facing
          this.sprite.vel.y = 0; // make unused axis to 0 / makes them stop
        }
        
        goLeft() {
          this.sprite.changeAni("walk"); // same ani, just switch scale
          this.sprite.vel.x = -1; // makes character go left
          this.sprite.scale.x = -1;//same size, flip horizontally 
          this.sprite.vel.y = 0; //unused axis
        }

        goDown() {
          this.sprite.changeAni("walk");
          this.sprite.scale.y = -1;
          this.sprite.vel.y = 1; // cdown bc increasing in y
          this.sprite.vel.x = 0;
        }
        
        // idle() {
        //   this.sprite.changeAni("idle");
        //   this.sprite.vel.x = 0; // stop moving left-right/ horizontally
        // }
        squish() {
          this.sprite.changeAni("squish");
          this.sprite.vel.x = 0;
          bugsOnScreen--;
        }
        contains(x,y) {
          let insideX = x >= this.sprite.x && x <= this.sprite.x + 32;
          let insideY = y >= this.sprite.y && y <= this.sprite.y + 32;
          return insideX && insideY;
        }
  }

  //display Menu text
  //get input to start
  //set playing to true

  function startMenu() {
    background(160,82,45);
    text("Welcome to Bug Squish!", width / 3, (height / 16));
    text("You will have 30 seconds to squish as many bugs as you can!", 100, 300);
    text("Press space to start playing.", 300, 400);
    if (key === ' ') {
         //playing();
        gameScreen = 'playing';
    }
  }

  function playing() {
    //game time counter

   
    console.log(ceil(timeLeft));
    text("Time Left:" + ceil(timeLeft), 30 , 45);
    text("Bugs Squashed: " + bugsSquished , width - 210 , 45);
    
    timeLeft -= deltaTime / 1000; //track time (deltaTime) convert from milli -> seconds (/1000)
    
    if (timeLeft <= 0)
    {
      gameOver = true;
      timeLeft = 0;
    }
      //bugs.push(new Bug(random(32, 568), random(32, 568), bugWidth, bugHeight, "assets/Bug.png", animations));

    bugs.forEach((bug) => {
      
      if (bug.mousePressed()) {
        if(bug.isSquished === false)
        {
          bug.isSquished = true;
          this.sprite.changeAni("squish");
          this.bug.vel.x = 0;
          this.bug.vel.y = 0;
          bugsSquished++;
        }
        if (bugs.size() === 0)
        {
          spawnBugs();
        }
      }
      // if (rotation == 90)
      // {
      //   bug.goRight();
      // }
      // else if (rotation == 270)
      // {
      //   bug.goLeft();
      // }
      // else if (rotation == 0)
      // {
      //   bug.goUp();
      // }
      // else if (rotation == 180)
      // {
      //   bug.goDown();
      // }
      // else if (bug.mouse.pressed())
      // {
      //   bug.squish();
      // }
      })
    }

    function spawnBugs() {
      for (let i = 0; i < spawnRate ; i++)
      {
        bugs.add(bug)
      }
    }

    //game set up

  //(check mouse released)

  function mousePressed()
  {
    if (bugs[0].contains(mouseX, mouseY)){ 
      dragging = true;
      //bugSquished = true;
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

     function mouseReleased() {
    
    
     for(let i = 0; i < bugs.length;i++) 
     {
      if(bugs[i].contains(mouseX,mouseY)) {
         bugsSquished += 1;
         speed += 0.5;
      }
    }
  }

  // function mouseReleased() {
    
    
  //    for(let i = 0; i < bugs.length;i++) 
  //    {
  //     if(bugs[i].contains(mouseX,mouseY)) {
  //       if(bug.isSquished === false)
  //       {
  //         bug.isSquished = true;
  //         this.sprite.changeAni("squish");
  //         this.bug.vel.x = 0;
  //         this.bug.vel.y = 0;
  //         bugsSquished++;

  //       }
  //     }
  //   }
  // }

    
  //   function mouseReleased() {
    
    
  //    for(let i = 0; i < bugs.length;i++) 
  //    {
  //     if(bugs[i].contains(mouseX,mouseY)) {
  //        bugsSquished += 1;
  //        speed += 0.5;
  //     }
  //   }
  // }

