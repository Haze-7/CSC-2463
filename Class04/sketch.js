
let selectedColor;
let faces;



function setup() {
  createCanvas(400, 400);
  selectedColor = color('white');

  faces = [
    new Face(200,150, color('blue')), 
    new Face(50, 50, color('orange')), 
    new Face(100, 250, color('purple'))]; //brackets create array
}

function draw() {
  background(220);

  for (let i = 0; i < faces.length; i++) { // loop from index 0 until the length/ end of the array / has to be less than < ( 1 less than length (index))
    faces[i].draw();//use array/ specify object [] and its index / goes through array and prints faces
  }

  fill(selectedColor); // use this to show what color is currently being used (circle in corner)
  circle(width - 30, 30, 20);
}

function mousePressed() {
  let isinFace = false;

  for(let i = 0; i < faces.length; i++) // go through array
  {
    if (faces[i].contains(mouseX, mouseY)) //if face contains mouse click
    {
      selectedColor = faces[i].fill; //set to fill value
      isInFace = true;
  }

  if (!isInFace) // if not in a face
  {
    selectedColor = color('white'); // set color to white
  }
//old / original code
  // if (face.contains(mouseX, mouseY)) // check if within face
  // {
  //   selectedColor = face.fill; // sets selectd color to color of selected face
  // } 
  // else if (face2.contains(mouseX, mouseY)) // if face 1 doesn't contain it, check face 2
  // {
  //   selectedColor = face2.fill;
 }
  console.log("selectedColor is " + selectedColor);
}

class Face {
  constructor(x,y, fill) {
    this.x = x;
    this.y = y;
    this.fill = fill;
  }

  draw() { // no background
    fill(this.fill);
    square(this.x, this.y, 100);
    fill(0);
    circle(this.x + 20, this.y + 20, 10);
    circle(this.x + 80, this.y + 25, 10);
  
    stroke(0);
    line(this.x + 20, this.y + 50, this.x + 80, this.y + 50)

  }
  contains(x,y) { // check if inside face / return true if inside, false if not
    let insideX = x >= this.x && x <= this.x + 100; // say if x val is inside of face
    let insideY = y >= this.y && y <= this.y + 100; //say if y val is inside of face
    return insideX && insideY; // return true if both are true/ else return false
  }
}
