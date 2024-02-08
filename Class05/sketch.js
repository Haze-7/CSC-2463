let mike; // variable to hold mike image
let rotation = 0; // sets angle of rotation
let score = 0; //sets score
let speed = 3; //sets rotation speed
let timeRemaining = 15; // set time remaining to start
let gameOver = false; //determine if game is over
let success, fail, normal; // set colors for actions
let lastAttempt; //set color for last attempt ^^
let gameFont; // set gamefont to google font


function preload() {
  mike = loadImage("assets/mike3.png"); // load in mike image
  gameFont = loadFont("assets/PressStart2P-Regular.ttf"); // load in google font
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER); // centers images at the origin
  angleMode(DEGREES); // sets angle measurements to degrees

  success = color('blue'); // if successful, display blue
  fail = color('red'); // if fial, display red
  normal = color('white'); // normal/ default, display white
  lastAttempt = normal; // by default, set to white

  textFont(gameFont); // set text in game to google font

}

function draw() {
  background(lastAttempt); // set background color to indicate last attempt success or fail
  if (gameOver) //when game ends
  {
    gameDone(); // go to gameover screen
  }
  else{
    playing(); // play the game
  }

}

function playing() { // the game while its playing/ the game
push(); //start section
  translate(width/2, height/2); // set origin to middle / transformation
  rotate(rotation += speed); // rotate the object at set speed
  image(mike, 0, 0, mike.width/3, mike.height/3); // create and draw mike image to certain size
pop(); // end section

  if (rotation >= 360) //when reach top
  {
  rotation = 0; // restart rotation
  }
  textSize(10); //set size of text
  text("Score: " + score, 20, 20); //display time
  text("Time: " + ceil(timeRemaining), width-100, 20); //display time / ceil (round to whole #), location

  timeRemaining -= deltaTime / 1000; //track time (deltaTime) convert from milli -> seconds (/1000)
  if (timeRemaining < 0) // when time runs out
  {
    lastAttempt = normal; //when game ends, set background back to normal
    gameOver = true; //end game/ game over
  }
}

function gameDone() { // the game over screen and its actions

  text("Time's up!", 100, 100) // show title message
  text("Score: " + score, 100, 150) // display score
  text("Press Space to Play Again.", 100, 200) // display option to restart
}

function keyTyped() {
  if (key === ' ') // checks for press space
  {
    if (gameOver) { //restarts game with starting settings
      timeRemaining = 15; // sets time back to start
      score = 0; // reset score
      gameOver = false; // go back to playing
    }
    else
    { //runs game mechanics
    if (rotation  >= 350 || rotation <= 10  ) // either greater than 350 or less than or equal to 10 degrees
    { 
      //successful condition
      score++; //add  1 score if make it
      lastAttempt = success; // set color based on last press ( success blue)
    }
    else{
      score--; //lose score if not in range/ upright
      lastAttempt = fail; // sets color based on last press ( fail red)
    }
  }
  } 
}