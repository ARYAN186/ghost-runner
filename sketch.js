var PLAY = 1;
var END = 0;

var gameState = PLAY;

var tower,building;

var ghost,evil;
var ghost2,ghost_evil;

var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;

var sound;
function preload(){
  building = loadImage("tower.png");
  
  evil=loadAnimation("ghost-standing.png");
  ghost_evil=loadAnimation("ghost-jumping.png");
  
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png")
  
  doorGroup = new Group();
  climberGroup = new Group();
  
  sound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  sound.loop();
  
  tower = createSprite(300,300,600,600);
  tower.addImage("building",building);
  tower.velocityY = 5;
  
  ghost = createSprite(300,200,70,70);
  ghost.addAnimation("ghost",evil);
  ghost.addAnimation("ghost2",ghost_evil);
  ghost.scale = 0.3;
  
  
}
function draw(){
  background("black");
 
  if(gameState === PLAY){
    
  if(tower.y > 600){
    tower.y = 1
  }
  
  if(keyWentDown("space")){
    ghost.velocityY = -7;
    ghost.changeAnimation("ghost2",ghost_evil);
    }
  if(keyWentUp("space")){
     ghost.changeAnimation("ghost",evil);
  }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-7;
  }
   if(keyDown("right_arrow")){
    ghost.x = ghost.x+7;
  }
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  ghost.velocityY = ghost.velocityY+1;
  
    if(ghost.y > 600){
      ghost.destroy();
      gameState = END;
    }
  spawnDoor();
  
  drawSprites();
  }
  if(gameState === END){
    textSize(30);
    fill("yellow");
    text("GAMEOVER",200,300);
    
  }
}
function spawnDoor(){
 if(frameCount % 70===0){
  door = createSprite(200,70,90,90);
  climber = createSprite(200,125,90,90);
  door.addImage("door",doorImg);
  climber.addImage("climber",climberImg);
  door.velocityY = 7;
  climber.velocityY = 7;
  door.x = Math.round(random(100,500));
  climber.x = door.x;
  door.lifetime = 99;
  climber.lifetime = 99;
   
  ghost.depth=door.depth;
  ghost.depth+=1
  ghost.depth=climber.depth;
  ghost.depth+=1
   
  doorGroup.add(door);
  climberGroup.add(climber);
 }
  
  
}













































