let paintColor; // color selected to paint
let paint;
let overColorSelection = false; //check if over selection box
let palletSize = 25; // size of pallet squares
let paintSize = 10; // size of pen / painter

function setup() {
  createCanvas(1400, 700);
  paintColor = color('white'); // default color before selection is made

  colors = [
   new ColorSelection(3, 3, color(255, 0 , 0)),
   new ColorSelection(3, 31, color(255,127,0)), 
   new ColorSelection(3, 59, color(255,255,0)),
   new ColorSelection(3, 87, color(0,255,0)),
   new ColorSelection(3, 115, color(0,255,255)),
   new ColorSelection(3, 143, color(0,0,255)),
   new ColorSelection(3, 171, color(255,0,255)),
   new ColorSelection(3, 199, color(127,63,0)),
   new ColorSelection(3, 227, color(255,255,255)),
   new ColorSelection(3, 255, color(0, 0, 0))
  ];

  
}

function draw() {
  //background(220); // hide background to allow for showing past mouse x & y
  //create color pallet
  for (let i = 0; i < colors.length; i++) // iterate through array
  {
    noStroke(); // get rid of outlines
    colors[i].draw(); // draw all squares in array
  }
//create pen / drawing tool
  if (mouseIsPressed) //while holding down the mouse
  {
    fill(paintColor); //set pen to selected color in pallet
    square(pmouseX, pmouseY, paintSize); //pen used to draw/ uses past mouse movement to track
   }
  
}

function mousePressed() {

  for (let i = 0; i < colors.length; i++) //go through array
  {
    if (colors[i].contains(mouseX, mouseY)) // check if mouse is inside any of them
    {
    paintColor = colors[i].fill; //fill with correct color
    overColorSelection = true; //confirm that mouse is within selection square
    }

}
}

class ColorSelection {
  constructor(x, y, fill) //establish variables and parameters of each color/ paint Selection
  {
    this.x = x; // x-axis coordinate
    this.y = y; // y-axis coordinate
    this.fill = fill; // color
  }
  draw() { // draw colorSelections
    fill(this.fill); // set color of squere
    square(this.x, this.y, palletSize); //create square
  }
  contains(x, y) {
    let withinX = x >= this.x && x <= this.x + palletSize; // check if mouse is inside of selection, from top (x) and bottom (x + size of square)
    let withinY = y >= this.y && y <= this.y + palletSize; // boolean values, true / false
    return withinX && withinY; // both must be true to return / false if one or both arent true ( isn't in square)
  }

}
