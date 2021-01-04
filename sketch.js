var snake, snakeImg;
var bg;
var apple, appleImg;
var knifeSound;
var appleGrp;
var score=0;
var gameState=0;
var wall1, wall2, wall3, wall4;
var lives=3;
var livesImg,heart1,heart2,heart3;

function preload(){
    snakeImg=loadImage("snake.png");
    appleImg=loadImage("apple.png");
    bg=loadImage("bg.jpg");
    knifeSound=loadSound("knifeSound.mp3");
    livesImg=loadImage("heart.png");
}

function setup(){
 createCanvas(600,600);
 snake = createSprite(180,430,20,20);
 snake.addImage(snakeImg);
 snake.scale=0.75;
 appleGrp=new Group();
 snake.setCollider("rectangle",-35,-140,snake.width-150,snake.height-350);

 //walls
 wall1=createSprite(300,45,520,10);
 wall2=createSprite(300,555,520,10);
 wall3=createSprite(45,300,10,520);
 wall4=createSprite(555,300,10,520);

 wall1.visible=false;
 wall2.visible=false;
 wall3.visible=false;
 wall4.visible=false;
}

function draw(){
    background(bg);

    if(keyDown(RIGHT_ARROW)){
        snake.x=snake.x+10;
    }
    if(keyDown(UP_ARROW)){
        snake.y=snake.y-10;
    }
    if(keyDown(DOWN_ARROW)){
        snake.y=snake.y+10;
    }
    if(keyDown(LEFT_ARROW)){
        snake.x=snake.x-10;
    }
    if(keyDown(RIGHT_ARROW)||keyDown(LEFT_ARROW)||keyDown(UP_ARROW)||keyDown(DOWN_ARROW)){
        gameState=0;
    }
    if(gameState===0){
        spawnApples();
    }
    textFont('Georgia');
    fill(0);
    textSize(20);       
    text("Score: "+score,480,35);
    text("Lives: ",250,35);


    if((snake.isTouching(wall1)||snake.isTouching(wall2)
    ||snake.isTouching(wall3)||snake.isTouching(wall4))&&lives>0){
        lives=lives-1;
        console.log("Lives: "+lives)
            if(lives===3){
                heart1=createSprite(320,30);
                heart1.addImage(livesImg);
                heart1.scale=0.025;
                heart2=createSprite(350,30);
                heart2.addImage(livesImg);
                heart2.scale=0.025;
                heart3=createSprite(380,30);
                heart3.addImage(livesImg);
                heart3.scale=0.025;
        }
            if(lives===2){
                heart1=createSprite(320,30);
                heart1.addImage(livesImg);
                heart1.scale=0.025;
                heart2=createSprite(350,30);
                heart2.addImage(livesImg);
                heart2.scale=0.025;
        }
            if(lives===1){
                heart1=createSprite(320,30);
                heart1.addImage(livesImg);
                heart1.scale=0.025;
        }

    }
    snake.bounceOff(wall1);
    snake.bounceOff(wall2);
    snake.bounceOff(wall3);
    snake.bounceOff(wall4);

eatApples();
drawSprites();
}

function spawnApples(){
    if(frameCount%150===0 && gameState===0){
        apple = createSprite(350,327,20,20);
        apple.x=Math.round(random(60,540));
        apple.y=Math.round(random(65,540));
        apple.addImage(appleImg);
        apple.scale=0.075;
        appleGrp.add(apple);
        appleGrp.setLifetimeEach(150);
    }
}

function eatApples(){
    if(appleGrp.isTouching(snake)){
    appleGrp.destroyEach();
    gameState=1;
    //knifeSound.play();
    score+=1;
    
    }
}