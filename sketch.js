var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost,ghostImg;
var IB,IBgroup;
var gameState="play";
var sound

function preload(){
  towerImg=loadImage ("tower.png");
  doorImg=loadImage ("door.png");
  climberImg=loadImage ("climber.png");
  ghostImg=loadImage ("ghost-standing.png");
  sound=loadSound("spooky.wav");
}

function setup(){
  createCanvas (600,600);
  tower=createSprite (300,300);
  tower.addImage(towerImg);
  tower.velocityY=1;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  IBgroup=new Group();
  
  ghost=createSprite (200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;

  sound.loop();
}

function draw(){
  background (0);
  
  if (gameState==="play"){
    
  
  
  if (tower.y>400){
    tower.y=300;
  }
  
  if (keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  
  if (keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  
  if (keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  
  if (climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if (IBgroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState=("end");
  }
  
  spawnDoors();
  
  drawSprites();
  }
  
  if (gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER",230,250);
  }
}

function spawnDoors(){
  if (frameCount%240===0){
    door=createSprite (200,50);
    door.addImage (doorImg);
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=600;
    doorsGroup.add(door);
    
    climber=createSprite (200,120);
    climber.addImage (climberImg);
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=600;
    climbersGroup.add(climber);
    
    IB=createSprite (200,125);
    IB.width=climber.width;
    IB.height=1;
    IB.x=door.x;
    IB.velocityY=1;
    IBgroup.add(IB);
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
  }
}