const AUDIO_ON = true;
let micHist = []; //array that records the sound level.
let mic;

function setup() {
  createCanvas(400, 400);
   if (AUDIO_ON) {
    mic = new p5.AudioIn();
    mic.start(); 
  }
}

function draw() {
  setBackground();
  strokeCap(ROUND);
    // If AUDIO_ON is set, activate audio animation
  let m;
  if (AUDIO_ON) {
    let micLevel = sqrt(mic.getLevel()); //scales the micLevel such that softer sounds are amplified in the vizualization, but the order of louder is kept so visually there is still a difference between softer and loud sound.
    m = map(micLevel, 0, 1, height*0.9,0); //maps mic level to a value between 0 and 90% of the canvas height where softer sounds are mapped to higher values. 
  }
  micHist.push(m); //records the sqrt of sound level
  //draws the lower rails of the railroad
  stroke(105,105,105);
  noFill();
  strokeWeight(7);
  beginShape(LINES);
  for(let i =0; i < micHist.length; i++){
    curveVertex(i, micHist[i]);
  }
  endShape();
   //draws the upper rails of the railroad at an angle to give it depth. The two rails are parallel.
  sinX =width*0.1
  let d = width*0.85%sinX;
  beginShape();
  for(let i =sinX; i < micHist.length; i++){
    curveVertex(i-sinX, micHist[i]-height*0.05);
  }
  endShape();
   //draws the woodplanks of the railroads.
  strokeWeight(10)
  stroke(150, 75, 0)
  strokeCap(SQUARE);
  for(let i =sinX; i < micHist.length; i+=sinX){
   beginShape();
   vertex(i, micHist[i]);
   vertex(i-sinX, micHist[i]-height*0.05);
   endShape();
  }
  
  //the cart
  stroke(0);
  ellipse(micHist.length-6*sinX-d,micHist[micHist.length-6*sinX]-height*0.05,10,10);
  ellipse(micHist.length-5*sinX-d,micHist[micHist.length-5*sinX],10,10); 
  ellipse(micHist.length-4*sinX-d,micHist[micHist.length-4*sinX]-height*0.05,10,10);
  ellipse(micHist.length-3*sinX-d,micHist[micHist.length-3*sinX],10,10); 
  strokeWeight(2);
  fill(130);
  let h = height*0.2;
  beginShape();
  vertex(micHist.length-6*sinX-d,micHist[micHist.length-6*sinX]-height*0.05);
  vertex(micHist.length-5*sinX-d,micHist[micHist.length-5*sinX]); 
  vertex(micHist.length-3*sinX-d,micHist[micHist.length-3*sinX]); 
  vertex(micHist.length-4*sinX-d,micHist[micHist.length-4*sinX]-height*0.05);
  endShape(CLOSE);
  beginShape();
  vertex(micHist.length-6*sinX-d,micHist[micHist.length-6*sinX]-height*0.05); 
  vertex(micHist.length-6*sinX-d,micHist[micHist.length-6*sinX]-h-height*0.05);
  vertex(micHist.length-4*sinX-d,micHist[micHist.length-4*sinX]-h-height*0.05); 
  vertex(micHist.length-4*sinX-d,micHist[micHist.length-4*sinX]-height*0.05); 
  endShape(CLOSE);
  fill(152);
  beginShape();
  vertex(micHist.length-3*sinX-d,micHist[micHist.length-3*sinX]-h); 
  vertex(micHist.length-4*sinX-d,micHist[micHist.length-4*sinX]-h-height*0.05); 
  vertex(micHist.length-4*sinX-d,micHist[micHist.length-4*sinX]-height*0.05);   
  vertex(micHist.length-3*sinX-d,micHist[micHist.length-3*sinX]); 
  endShape(CLOSE);
  beginShape();
  vertex(micHist.length-5*sinX-d,micHist[micHist.length-5*sinX]-h); 
  vertex(micHist.length-6*sinX-d,micHist[micHist.length-6*sinX]-h-height*0.05);
  vertex(micHist.length-6*sinX-d,micHist[micHist.length-6*sinX]-height*0.05); 
  vertex(micHist.length-5*sinX-d,micHist[micHist.length-5*sinX]); 
  endShape(CLOSE);
  beginShape();
  vertex(micHist.length-5*sinX-d,micHist[micHist.length-5*sinX]); 
  vertex(micHist.length-5*sinX-d,micHist[micHist.length-5*sinX]-h);
  vertex(micHist.length-3*sinX-d,micHist[micHist.length-3*sinX]-h); 
  vertex(micHist.length-3*sinX-d,micHist[micHist.length-3*sinX]); 
  endShape(CLOSE);
  
  //limits the array length to the width ofthe canvas.
  //if micHist is longer than width, we delete oldest micLevel and replace with new mic Level
  if(micHist.length >width) {
    micHist.splice(0,1); 
  }
}

//creates a simple background for our rollercoaster
function setBackground(){
  //grass
  noStroke();
  fill(color(0,154,23));
  rect(0,height*0.75, width, height);
  //sky
  fill(color(135,206,235))
  rect(0,0,width, height*0.75);
  //the sun, referenced https://openlab.bmcc.cuny.edu/makerspace/drawing-in-p5-js/
  fill(255, 204, 0);
  noStroke ();
  ellipse (325,65, 80, 80);
  fill(255, 153, 0);
  noStroke ();
  ellipse (325,65, 65, 65);
  fill(255, 255, 102);
  noStroke ();
  ellipse (325,65, 50, 50);
}