let characters;
let sprite;
let animations;
let bugs = [];
let gameFont;


function preload() {

}

function setup() {
  createCanvas(800, 800); 
}

function draw() {
  background(0);



  //bounds check to keep character within screen
  if (bugs.x + bugs.width / 3 > width) // if walk into right wall / edge
  {
    walkLeft(); //turn around
  }
  else if (bugs.x - bugs.width / 3 < 0) // if walk into left wall/ edge
  {
    walkRight(); // turn around
  }
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
          
          this.sprite.vel.x = 0; // stop moving left-right/ horizontally
          
          if (Math.round(random(1,4)) == 1)  // come back to, set bounds
          {
          this.sprite.changeAni("idleUp"); // set to stand animation/ pose
          }
          else if (Math.round(random(1,4)) == 2)//right
          {
            this.sprite.changeAni("idleRight");
          }
          else if (Math.round(random(1,4)) == 3)//left
          {
            this.sprite.changeAni("idleLeft");
          }
          else if (Math.round(random(1,4)) == 4) // down
          {
            this.sprite.changeAni("idleDown");
          }
          //must rotate to fit each direction (default up)
        }

        // squish() {
        //   this.sprite.vel.x = 0;
        //   //replace
        //   // if (startOrientation == 1)
        //   // {
        //   // this.sprite.changeAni("squishRight");
        //   // }
        //   // else if (startOrienation == 2) {
        //   //   this.sprite.changeAni("squishLeft");
        //   // }
        //   // else if (startOrienation == 2) {
        //   //   this.sprite.changeAni("squishUp");
        //   // }
        //   // else if (startOrienation == 2) {
        //   //   this.sprite.changeAni("squishDown");
        //   // }
        //   // this.sprite.vel.x++;//speed up speed of rest of them
        //   //bugSquished++;//increment bug squish counter
        //   bugsOnScreen--;
        //}
        contains (x, y) {
          let insideX = x >= this.sprite.x - 16 && x <= this.sprite.x + 16;
          let insideY = x >= this.sprite.y - 16 && y <= this.sprite.y + 16;
          return insideX, insideY;
        }
      }