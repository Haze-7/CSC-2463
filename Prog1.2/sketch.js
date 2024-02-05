let paintColor;
let colorSelections;
let paint;

function setup() {
  createCanvas(750, 450);
  paintColor = color('white');

  colorSelections = [
   new ColorSelection(3, 3, color(255, 0 , 0)),
   new ColorSelection(3, 26, color(255,127,0)), 
   new ColorSelection(3, 49, color(255,255,0)),
   new ColorSelection(3, 72, color(0,255,0)),
   new ColorSelection(3, 94, color(0,255,255)),
   new ColorSelection(3, 116, color(0,0,255)),
   new ColorSelection(3, 138, color(255,0,255)),
   new ColorSelection(3, 160, color(127,63,0)),
   new ColorSelection(3, 182, color(255,255,255)),
   new ColorSelection(3, 204, color(0, 0, 0))
  ];
}

function draw() {
  background(220);
  
  for (let i = 0; i < colorSelections.length; i++)
  {
    noStroke();
    colorSelections[i].draw();

  fill(paintColor); // use this to show what color is currently being used (circle in corner)
  circle(width - 30, 30, 20);
  }

}

function mousePressed() {
  let overColorSelection = false;

  if (ColorSelection.contains(mouseX, mouseY))
  {
    paintColor = ColorSelection.fill();
  }
}

class ColorSelection {
  constructor(x, y, fill) 
  {
    this.x = x;
    this.y = y;
    this.fill = fill;
  }

  draw() {
    
    fill(this.fill);
    square(this.x, this.y, 20);



  }

}