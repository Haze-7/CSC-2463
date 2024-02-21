let soundFX;
let button1;
let button2;

function preload() {
  //don't have files like she used in class, just switch names w/ keyboard to practice
  soundFX = new Tone.Players ({
    popcorn: "assets/popcorn.mp3",
    water: "assets/water.mp3"
  }) .toDestination(); //TELLS your audio to go to your speakers
  //only works if prompted to with action, won't play on its own

}

function setup() {
  createCanvas(400, 400);

  button1 = createButton('Popcorn Maker');
  button1.position(85, 150);
  button1.mousePressed(() => soundFX.player('popcorn').start());

  button2 = createButton('Water Fall');
  button2.position(205, 150);
  button2.mousePressed(() => soundFX.player('water').start());
}


function draw() {
  background(220, 100, 200);
  text('Press Q or W', 120, 150);
}



// with pressing key
// function KeyPressed() {
//   if (key === 'q')
//   {
//     soundFX.player('popcorn').start();
//   }
//   else if (key == w)
//   {
//     soundFX.player('water').start();
//   }
// }

//in setup
//set up with own functions
// button1 = createButton('Popcorn Maker');
// button1.position(85, 150);
// button1.mousePressed(play1);

// button2 = createButton('Water Fall');
// button2.position(205, 150);
// button2.mousePressed(play2);
// }

// function play1() {
// soundFX.player('popcorn').start();
// }

// function play2() {
// soundFX.player('water').start();
// }

// function draw() {
// background(220, 100, 200);
// text('Press Q or W', 120, 150);
// }