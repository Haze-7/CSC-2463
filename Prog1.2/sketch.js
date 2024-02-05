let paintColor;
let colorSelections;
let paint;
let overColorSelection = false;
let size = 0;

function setup() {
  createCanvas(1400, 700);
  paintColor = color('white');

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
  //background(220);
  
  for (let i = 0; i < colors.length; i++)
  {
    noStroke();
    colors[i].draw();
  }
  if (mouseIsPressed) 
  {
    fill(paintColor);
    square(pmouseX, pmouseY, paintSize);
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
    size = 25;
    fill(this.fill); // set color of squere
    square(this.x, this.y, size); //create square
  }
  contains(x, y) {
    size = 20;
    let withinX = x >= this.x && x <= this.x + size; // check if mouse is inside of selection, from top (x) and bottom (x + size of square)
    let withinY = y >= this.y && y <= this.y + size; // boolean values, true / false
    return withinX && withinY; // both must be true to return / false if one or both arent true ( isn't in square)
  }

}
