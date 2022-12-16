var bg,boy,coin1,coin2,trophy,obstacle1, obstacle2;
var bgImg,boyImg,coin1Img,coin2Img,trophyImg,obstacle1Img,obstacle2Img;
var coinGroup, obstaclesGroup;
var gameOver,gameOverImg;
var restart,restartImg;

var score = 0 ;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload () {

  bgImg = loadImage ("sprites/bg.jpg");
  boyImg = loadImage ("sprites/boy.png");
  coin1Img = loadImage ("sprites/coin1.png");
  coin2Img = loadImage ("sprites/coin2.png");
  trophyImg = loadImage ("sprites/trophy.png");
  obstacle1Img = loadImage ("sprites/obstacle1.png");
  obstacle2Img = loadImage ("sprites/obstacle2.png");

}


function setup() {
  createCanvas(1500,700);
  boy = createSprite(90, 550, 50, 50);
  boy.addImage("boy",boyImg);
  boy.scale = 0.6;
  
  invisibleGround = createSprite(650,650,1500,10);
  invisibleGround.visible = false;

  gameOver = createSprite(650,650)

coinGroup = createGroup()
obstaclesGroup = createGroup()

}

function draw() {
  background(bgImg);  
  //fontSize = 150 ;
  text("Score: "+ score, 1200,70);
  
  if(gameState===PLAY){

    if(keyDown("space") && boy.y >= 150 ) {
      boy.velocityY = -10;
    }
    
    boy.velocityY = boy.velocityY + 0.8

   

spawnCoins ();
spawnObstacle ();

 if (coinGroup.isTouching(boy)){
      score = score + 10;
    }

    if(obstaclesGroup.isTouching(boy)){
      gameState = END;
    }
   

  }

   else if(gameState=== END ){

  
    boy.velocityY = 0;
    coinGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);

    obstaclesGroup.setlifetimeEach(-1);
    coinGroup.setlifetimeEach(-1);



    }
boy.collide(invisibleGround)
  drawSprites();
}

function spawnCoins (){

  if (frameCount % 100 === 0) {
    var coin = createSprite (1400,250,50,50);
    coin.y = Math.round(random(250,500))
    coin.addImage(coin1Img);
    coin.scale = 0.4;
    coin.velocityX = -5;
 
    var rand =  Math.round(random(1,2));
    switch (rand){
      case 1: coin.addImage(coin1Img);
              break;
      case 2: coin.addImage(coin2Img);
              break;
              default : break;
    }

    coin.depth = boy.depth;
    boy.depth = boy.depth + 1;

    coinGroup.add(coin);
    coin.lifeTime = 50;
  }

}

function spawnObstacle (){

  if (frameCount % 120 === 0) {
    var obstacle = createSprite (1000, 550, 50, 50);
    obstacle.addImage(obstacle1Img);
    obstacle.scale = 0.5;
    obstacle.velocityX = -5;

    var rand =  Math.round(random(1,2));
    switch (rand){
      case 1: obstacle.addImage(obstacle1Img);
              break;
      case 2: obstacle.addImage(obstacle2Img);
              break;
              default : break;
    }

    obstacle.depth = boy.depth;
    boy.depth = boy.depth + 1;

     obstaclesGroup.add(obstacle);
     obstacle.lifeTime =  100;
  }

}

function reset (){

  gameState = PLAY ;

  score = 0 ;
}