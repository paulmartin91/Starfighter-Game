$(document).ready(function(){

//Music

//Canvas
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

//Player
let player = new Image();
player.src = "https://pngimage.net/wp-content/uploads/2018/06/x-wing-png-7.png"

//Target

let cTT = false;

function createTargetTrue(){
  cTT = true;
  console.log(cTT)
}
/*
function createTarget(){
  
  this.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.rect(50,50,10,10);
    ctx.stroke();
  }
  
   this.update = function(){
   this.draw();
  }
  
}
*/
//Stars Function
function Dots(x, z, y){
this.x = x;
this.z = z;
this.y = y;
this.redShift = 255;
this.greenShift = 255;
this.blueShift = 255;
this.starFade = z*10;
console.log(this.starFade)
this.draw = function(){
ctx.beginPath();
ctx.strokeStyle = "rgba("+this.blueShift+","+255+","+this.blueShift+","+this.starFade+")";
ctx.rect(this.y, this.x,this.z*speedChange*2,1);
ctx.stroke();
  }
  
  this.update = function(){
  if (this.y < 0) {
    this.y = 1000;
  }
    this.y -= this.z*speedChange;
    
    this.draw();
  }
  
}

//Stars Array & Function
var dotArray = [];
var speedChange = 1;
for (let i = 0; i<150; i++){

let dotHeight = Math.random() * 150;
let dotSpeed = Math.random() * 2;
let start = Math.random() * 1000;
  
dotArray.push(new Dots(dotHeight, dotSpeed, start));
}

//Weapons Function

function Weapon(){
  
this.start = playerLength;
if (weaponUp % 2 == 1) {
this.end = playerX+16;
} else {this.end = playerX+5;}
this.length = 20;

this.draw = function(){
ctx.beginPath();
ctx.strokeStyle="red"
ctx.moveTo(this.start,this.end);
ctx.lineTo(this.start+this.length,this.end);
ctx.stroke();
}
  
this.update = function(){
  this.start+=5
  
  this.draw();
}
}

//Weapons array & Functions
var ticker = 0
var weaponArr = []
var weaponSwitch = false;
var weaponUp = 0;

function fire(){
 weaponArr.push(new Weapon);
}
fire();

//Animation
function animate(){
  //FTL
  var speedChangeText = speedChange*10000+"MPH";
  if (speedChange == 100){speedChangeText = "FTL"}
//Background
ctx.clearRect(0, 0, 800, 500);
ctx.beginPath();
ctx.rect(0, 0, c.width, c.height);
ctx.fillStyle = "black";
ctx.fill();
  
  //Speed
ctx.fillStyle = "red";
ctx.font = "10px Arial";
ctx.fillText("Speed: " + speedChangeText,5,10);


window.requestAnimationFrame(animate);

  //Stars
 for (let i = 0; i<dotArray.length; i++){
    dotArray[i].update();
  }
  //player
  ctx.drawImage(player,20,playerX, playerLength, 20);
  
  //Weapons
  if(weaponSwitch == true){
  for (let i=0;i<weaponArr.length;i++){
  weaponArr[i].update();
  weaponUp = i;
  }
}
/*
  //Target
  if (cTT == true){
    new createTarget.update();
  }
*/  
}

animate();

//Controls

var playerX = 60;
var playerLength = 40;

document.addEventListener("keydown",function(e){
console.log(e.which)
//Up
if (e.which == 38) { 
playerX-=3;
};
//Down
if (e.which == 40) { 
playerX+=3;
};
if (e.which == 39) { 
  if (speedChange<20){
speedChange+=2;
  }
};
if (e.which == 37) {
   if (speedChange>1){
speedChange-=2;
  }
}
if (e.which == 74) {
speedChange=100;
playerLength = 60;
speedChangeText = "FTL";
setTimeout(function(){speedChange=1; playerLength = 40;}, 10000)

};
  
if (e.which == 32) { 
weaponSwitch = true;
ticker++;
console.log(ticker)
fire();
}
  
});
});
