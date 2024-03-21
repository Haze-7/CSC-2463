let player = new Tone.Player("assets/popcorn.mp3").toDestination();
player.loop = true // easy way do make simple loop of sound / (sound name).loop

player.playbackRate = 1; // changes file time (compresses to do so ) rate (1 is normal), higher is faster/ sounds squished

player.reverse = true; // T/F to play sound in reverse / all work w/ notes / sounds by calling their name (notes.reverse)

function mousePressed() {
  player.start(); // start sound
}

function mouseReleased() {
  player.stop(); // stop sound
}

function preload() {

}

function setup() {

}

function draw() {

}