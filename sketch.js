
var trex ,trex_running;
var cactus1;
var cactus2;
var cactus3;
var cactus4;
var cactus5;
var cactus6;
var cactus;
var cloudimage;
var sueloinvisible;
var PLAY=1;
var END=0;
var gameState = PLAY;
var score =0;
var cloudsgroup,obstaclesgroup;
var restart,restartimg;
var gameover,gameoverimg;
var trex_collided;
var tero,teroimg;
var dieSound, jumpSound, checkpointSound;
function preload(){
 trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
groung = loadImage("ground2.png");
cloudimage = loadImage("cloud.png");
cactus1 = loadImage("obstacle1.png");
cactus2 = loadImage("obstacle2.png");
cactus3 = loadImage("obstacle3.png");
cactus4 = loadImage("obstacle4.png");
cactus5 = loadImage("obstacle5.png");
cactus6 = loadImage("obstacle6.png");
gameoverimg = loadImage("gameOver.png");
restartimg = loadImage("restart.png");
trex_collided = loadAnimation("trex_collided.png");
teroimg= loadAnimation("tero1.png","tero2.png")
dieSound = loadSound("die.mp3");
jumpSound =loadSound("jump.mp3");
checkpointSound = loadSound("checkpoint.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  
  //crear sprite de Trex
 trex = createSprite(50,height-70,20,50);
 trex.addAnimation("running",trex_running);
 trex.addAnimation("collided",trex_collided);
 trex.scale = 0.5;
 
 ground1 = createSprite(width/2,height-80,width,2);
 ground1.addImage  (groung);
 
 sueloinvisible = createSprite(width/2,height-10,width,125);
 sueloinvisible.visible = false;

gameover = createSprite(width/2,height/2);
gameover.addImage(gameoverimg)
restart = createSprite(width/2,height/2-50);
restart.addImage(restartimg);
gameover.scale=0.4;
restart.scale=0.4;

 obstaclesgroup = new Group();
 cloudsgroup = new Group();

}

function draw(){
  background("white")

text("marcador"+score,500,50);



  if(gameState ==PLAY){
    ground1.velocityX = -(3 +3* score/100);
    score=score +Math.round(frameCount/60);
    if(score >0 && score%100==0){
      checkpointSound.play()
  }
 cactusz();
 nubes();
 terofly();
 gameover.visible=false;
 restart.visible=false;

    if (touches.length >0 || keyDown("space")&&trex.y >=height-120) {
      trex.velocityY=-10;
      touches =[];
      jumpSound.play()
     } 
     trex.velocityY = trex.velocityY+0.4;
     if(obstaclesgroup.isTouching(trex)){
      gameState = END;
      dieSound.play();
  }
}
  else if(gameState ==END){
    ground1.velocityX = 0;
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    gameover.visible = true;
    restart.visible = true;
    trex.changeAnimation("collided",trex_collided)
    cloudsgroup.setLifetimeEach (-1);
    obstaclesgroup.setLifetimeEach (-1);
    if(touches.length >0 || keyDown("space")){
      restart2();
      touches = [];
    }
    trex.velocityY = 0;
  }
 
 if(ground1.x < 0){
  ground1.x = ground1.width/2;
 }
 trex.collide(sueloinvisible);
 if(mousePressedOver(restart)){
  restart2();
 }

drawSprites();
}
function nubes(){
  if(frameCount %60==0){
  var nube = createSprite(width+20,height-300,40,10);
  nube.addImage(cloudimage)
 nube.scale=0.8;
nube.y = Math.round(random(10,60));
  nube.velocityX = -10;
  nube.lifetime = 200;
  nube.depth = trex.depth;
  trex.depth = trex.depth+1;
  cloudsgroup.add(nube);
}
}
function cactusz(){
if(frameCount %60==0){
var cactus = createSprite(600,height-95,20,30);
cactus.velocityX =-(5 +score/100);

var rand = Math.round(random(1,6));
switch (rand){
case 1:cactus.addImage(cactus1);
break;
case 2:cactus.addImage(cactus2);
break;
case 3:cactus.addImage(cactus3);
break;
case 4:cactus.addImage(cactus4);
break;
case 5:cactus.addImage(cactus5);
break;
case 6:cactus.addImage(cactus6);
break;
default:break;
}
cactus.scale=0.7
cactus.lifetime =190;
obstaclesgroup.add(cactus);

}  
}
function terofly(){
  if(frameCount %60==0){
    tero = createSprite(width+20,height-300,40,);
    tero.addAnimation("fly",teroimg)
    tero.y = Math.round(random(30,50));
  tero.velocityX = -10;

  }


}
function restart2(){
gameState = PLAY;
//gameover.visible = false;
//restart.visible = false;
obstaclesgroup.destroyEach();
cloudsgroup.destroyEach();
score = 0;
trex.changeAnimation("running",trex_running);
}