function setup() {
  createCanvas(800, 800);

 // colorSelections = [
  red = new ColorSelection(10, 60, 50)
  //]
}

function draw() {
  background(220);
  
  fill('red');
  square(10, 10, 50);


  red.draw();
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
    square(this.x, this.y, this.fill);


  }

}