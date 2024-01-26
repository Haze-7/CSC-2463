function setup() {
  createCanvas(200, 600);
  angleMode(DEGREES);
}

function draw() {
  background(220);

  //Example 1:
  fill(0, 255, 0);
  rect(0, 0, 200, 100);
  fill('white');
  circle(50, 50, 80);
  square(105 ,10 ,80);
  
  //Example 2:
  noStroke();
  square(0, 100, 200);
  fill(255, 0, 0, 85); //red
  circle(100, 165, 100);
  fill(0, 0, 255, 85); //blue
  circle(65, 225, 100);
  fill(0, 255, 0, 85); //green
  circle(135, 225, 100); 

  //Example 3:
  //top: 300px, bot: 400px

  fill('black');
  rect(0, 300, 200, 100);
  fill(255, 255, 0, 255); //yellow
  arc(50, 350, 80, 80, 225, 135, PIE);
  noStroke();
  fill('red'); 
  rect(110, 350, 80, 40);
  arc(150, 350, 80, 80, 180, 90, PIE);
  fill('white');
  circle(130, 350, 25);
  circle(170, 350, 25);
  fill(0, 0, 255); //blue
  circle(130, 350, 15);
  circle(170, 350, 15);

  //Example 4:
  //top 400px, bot 600px
  fill('blue');
  square(0, 400, 200);
  fill(0, 127, 0);
  stroke('white');
  strokeWeight(4);
  circle(100, 500, 100 );
  //Star formation
  fill('red');
  beginShape()
    vertex(100, 450); //top point
    vertex(112, 485); //top mid right
    vertex(147, 485); //right point
    vertex(120, 505); //right mid
    vertex(130, 540); //bot right point
    vertex(100, 520); //bot mid point
    vertex(70, 540); // bot left point
    vertex(80, 505); // left mid
    vertex(53, 485); //left point
    vertex(87, 485); //top mid left

  endShape(CLOSE);


  


  

}
