var dolphin, dolphinImg, piranhaImg, backgroundImg, bg, health, obstacle, gameState, restartButtonImg, restartButton, gameOverButtonImg, gameOverButton, healthBarImg; 
var obstacleGroup;

function preload() {
  backgroundImg = loadImage("seaImage2.jpg");
  dolphinImg = loadImage("dolphin image for game.png");
  piranhaImg = loadImage("piranha-cartoon-vector-6917170.png");
  restartButtonImg = loadImage("RESTARTBUTTON.png");
  gameOverButtonImg = loadImage("GAMEOVERBUTTON.png");
  healthBarImg = loadImage("healthbar.png");
 
}

function setup() {
  createCanvas(displayWidth, displayHeight - 120);
  bg = createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight);
  bg.addImage("play", backgroundImg);
  
  dolphin = createSprite(displayWidth/5, displayHeight/2, 150, 50);
  dolphin.addImage(dolphinImg);
  dolphin.scale = 0.8;

  health = 100;

  gameState = "play";

  obstacleGroup = new Group();

  restartButton = createSprite(displayWidth/2, displayHeight/2);
  restartButton.addImage(restartButtonImg);
  restartButton.visible = false;
  restartButton.scale = 0.5;

  gameOverButton = createSprite(displayWidth/2, displayHeight/2 - 160);
  gameOverButton.addImage(gameOverButtonImg);
  gameOverButton.visible = false;

 

}

function draw() {
  background("white");  

  

  if(gameState === "play"){
    
    dolphin.visible = true;

    bg.changeAnimation("play");

    bg.scale = 6;
    bg.velocityX = -3;
    bg.x = bg.width/2;

    if(bg.x < 100){
      bg.x = bg.width/2;
    }
  
    if(keyDown("up")){
      dolphin.velocityY = -4;
    }
  
    if(keyDown("down")){
      dolphin.velocityY = 4;
    }

    spawnObstacles(); 

    for (var i = 0; i < obstacleGroup.length; i++) {
      if (obstacleGroup.get(i).isTouching(dolphin)) {
          obstacleGroup.get(i).destroy();
          health = health - 25;
      }
  }

    if(health === 0){
      gameState = "end";
    }
  
  }else if(gameState === "end"){
      dolphin.setVelocity(0,0);
      obstacleGroup.setVelocityEach(0,0);
      bg.velocityX = 0;
      restartButton.visible = true;
      gameOverButton.visible = true;

      if(mousePressedOver(restartButton)){
        restartButton.visible = false;
        gameOverButton.visible = false;
        dolphin.y = displayHeight/2;
        health = 100;
        obstacleGroup.destroyEach();
        gameState = "play";
        }
  }
  


  drawSprites();

  fill(0)
  textSize(20)
  text(health, 180, 50);

  image(healthBarImg, 50, 30, 125, 60);

  //text("X :"+mouseX +" Y :"+ mouseY,mouseX,mouseY);


}

function spawnObstacles() {
  if(frameCount % 100 === 0){
    obstacle = createSprite(displayWidth, displayHeight/2, 120, 120);
    obstacle.addImage(piranhaImg);
    obstacle.scale = 0.5;
    obstacle.y = Math.round(random(0,displayHeight - 120));
    obstacle.velocityX = Math.round(random(-3, -7));
    obstacleGroup.add(obstacle);
  }
} 
