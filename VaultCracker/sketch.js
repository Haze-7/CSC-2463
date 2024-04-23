
let sprite;
let animations;
let gameFont;
let spriteSheet;
let gameScreen;
let timeLeft = 30; // change to more reasonable time
let gameOver = false;
let gameEnd = false;
let restartKey = 'r';


function preload() {

  gameFont = loadFont("assets/PressStart2P-Regular.ttf"); // load in google font

  //row: index row (vert) column: index colmn (horiz) frames: no index to go through
  // animations = {

  // };

}
function setup() {
  
  createCanvas(1200, 1000);
  textFont(gameFont); 
  gameScreen = 'start'; 
  //start background start sound
  
}
function draw() {
  background(128,128,128);
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

  //display Menu text
  //get input to start
  //set playing to true
  function startMenu() {
    background(128,128,128);
    textSize(25);
    text("Welcome to Safe Cracker!", width / 4, (height / 16));
    textSize(15);
    text("You will have 30 Seconds to Crack the Safe!", 270, 300);
    text("Press space to play!", 430, 750);

    if (key === ' ') {
        gameScreen = 'playing';
        startSpawn = true;

    }
  }
  function playing() {
    //game time counter
    text("Cops will Arrive in:" + ceil(timeLeft), 30 , 45);
    //text("Bugs Squashed: " + bugsSquished , width - 210 , 45); score

    //playing around with vault door
    circle(width /2, height /2, 50);

    timeLeft -= deltaTime / 1000; //track time (deltaTime) convert from milli -> seconds (/1000) // time
    //find way to speed up timeLeft/ remove time for each incorrect answer
    if (timeLeft <= 0)
    {
      gameScreen = 'endScreen';
      timeLeft = 0;
    }
  }
  //replace with victory / failure screens
  //either make new function for each ^^ 
  //or make if statement for boolean value
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
  //end Screen for when player loses the game (cops arrive)
  //Show cops ariving with flashing lights
  function failScreen() {
    //rect(0, 0, 300, 600);
    //rect(300, 0, 300, 600);
  }

  //end screen for when player wins the game
  //have rain money and provide money earned and time remaining?
  function victoryScreen() {

  }

  //vault handle spins along with knob
 function vaultCreation (){
  //create Square

  //create circle


      // textSize(25);
    // text("Welcome to Safe Cracker!", width / 4, (height / 16));
    // textSize(15);
    // text("You will have 30 Seconds to Crack the Safe!", 270, 300);
    // text("Press space to start the Timer.", 350, 400);

  //create vault bars to spin

  // create spinning animation
 }

