var PLAY = 1;
var END = 0;
var gameState = 1;

var border,borderImage;
var bow , trishul,  background, trishulGroup;
var bowImage, trishulImage, ghost2Image, ghost1Image, ghost3Image ,ghost4Image, backgroundImage;
var shivmani,shivmaniImage;
var gameState;
var diesound, playsound;

function preload(){
          
  backgroundImage = loadImage("night2.png");
  
  trishulImage = loadImage("trishul1.png");
  bowImage = loadImage("bow1.png");
  ghost1Image = loadImage("ghost4.png");
  ghost2Image = loadImage("ghost2.png");
  ghost3Image = loadImage("ghost3.png");
  ghost4Image = loadImage("ghost4.png");
  borderImage = loadImage("border.png");
  shivmaniImage = loadImage("diamond1.png");
  diesound = loadSound("die.wav");
  playsound = loadSound("play.wav");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart1.webp");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //creating background
  background = createSprite(width/2,height,width,height);
  background.addImage(backgroundImage);
  background.scale = 1.5
  
  // creating bow to shoot arrow
  bow = createSprite(width-300,height/2);
  bow.addImage(bowImage); 
  bow.scale = 0.16;
  
  border =createSprite(width-150,height/2);
  border.addImage(borderImage);
  border.scale = 0.20
  
  shivmani = createSprite(width-50,height/2);
  shivmani.addImage(shivmaniImage);
  shivmani.scale = 0.2;
  

   score = 0  
 // making a groups 
 ghostGroup = new Group();
  trishulGroup = new Group();
  
 
}

function draw() {

  
  if(gameState === PLAY){
    
     bow.addImage(bowImage); 
    bow.scale = 0.16;
   bow.x = width-220;
    bow.y = mouseY;
     // moving ground
     background.velocityX = -3;
    
if (background.x < 0){
      background.x = background.width/2;
    playsound.play;
    }
    
    //moving bow
  bow.y = World.mouseY
    
    ghosts();
    
    
   // release arrow when space key is pressed
  if (touches.length > 0 || keyDown("space")) {
    createTrishul();
    touches = [];
  }
 
    if(ghostGroup.isTouching(trishulGroup)){
       ghostGroup.destroyEach();
      trishulGroup.destroyEach();
      diesound.play();
      score = score + 5;
       }
      
      if(ghostGroup.isTouching(border)){
         gameState = END;
      }
  }
   else if(gameState === END){
     background.velocityX = 0;
     
      ghostGroup.destroyEach();
        ghostGroup.setVelocityXEach(0);
      
        bow.addImage(gameOverImage);
        bow.x= width/2;
        bow.y = height/2; 
     bow.scale = 1;
    
    
     if(mousePressedOver(bow) || touches.length > 0 ){
        gameState = PLAY;
        touches = [];
       score = 0;
        }
     
       }
     
  drawSprites();
  textSize(25);
  fill("white");
    text("Score: "+ score, width/2,50);
}


function ghosts(){
  
  if(World.frameCount % 80 === 0){
     ghost = createSprite(0,200,20,20);
     ghost.scale = 0.6;
    
    r = Math.round(random(1,4));
    
    if(r == 1){
       ghost.addImage(ghost1Image);
       } 
    else if(r == 2){
       ghost.addImage(ghost2Image);
       } 
    else if(r == 3){
       ghost.addImage(ghost3Image);
       } 
    else {
       ghost.addImage(ghost1Image);
       } 
    
    ghost.y = Math.round(random(50,340));
    
   ghost.velocityX = 7;
    ghost.setLifetime = 100;
    ghostGroup.add(ghost);
  
     }
  
}


// Creating  arrows for bow
 function createTrishul() {
  var trishul= createSprite(width-250,height/2);
  trishul.addImage(trishulImage);
  trishul.x = width-250;
  trishul.y=bow.y;
  trishul.velocityX = -6;
  trishul.lifetime = 80;
  trishul.scale = 0.2;
  trishulGroup.add(trishul);
  
 
}