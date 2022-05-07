var rand;
var enemy;
var player;
var bullet;
var boundary1, boundary2;
var hq1, hq2, hq3 , hq4, hq5;


var backgroundMusic;


var score = 0;
var lives = 5;


var enemies = [];
var bullets = [];


var minimumSpeed = 16;
var maximumSpeed = 24;


var END = 3;
var PLAY = 2;
var START = 1;
var gameState = START;


function preload() 
{
  soundFormats("mp3");
  backgroundMusic = loadSound("Assets/Background(M).mp3");

}

function setup() 
{
  player = createSprite(windowWidth/1.995, windowHeight/1.35, 70, 70);


  hq1 = createSprite(windowWidth/1.99, windowHeight/1.09, 80, 80);
  hq2 = createSprite(windowWidth/3.28, windowHeight/1.09, 80, 80);
  hq3 = createSprite(windowWidth/1.43, windowHeight/1.09, 80, 80);
  hq4 = createSprite(windowWidth/9.10, windowHeight/1.09, 80, 80);
  hq5 = createSprite(windowWidth/1.12, windowHeight/1.09, 80, 80);


  boundary1 = createSprite(windowWidth, windowHeight / 2, 80, 1000);
  boundary1.visible = false;
  boundary2 = createSprite(windowWidth / 970.7, windowHeight / 2, 80, 1000);
  boundary2.visible = false;

  PlayBackgroundMusic()
}


function PlayBackgroundMusic()
{
  backgroundMusic.play();
  backgroundMusic.loop();
  backgroundMusic.setVolume(0.4);
  userStartAudio
}


function draw() 
{
  createCanvas(windowWidth, windowHeight);
  background(0);

  if (gameState === START) 
  {
    player.visible = false;
    hq1.visible = false;
    hq2.visible = false;
    hq3.visible = false;
    hq4.visible = false;
    hq5.visible = false;

    textFont("Iceland");
    fill("white");
    textSize(60);
    text("Click to proceed", width / 2.65, height / 1.7);
    textSize(140);
    text("Space Adventurer", width / 5.25, height / 5.5);
  }


  //Changing gameState to PLAY
  if (mouseIsPressed === true)
  {
    if (mouseButton === LEFT)
    {
      gameState = PLAY;
    }
  }


  if (gameState === PLAY) 
  {
    player.visible = true;
    hq1.visible = true;
    hq2.visible = true;
    hq3.visible = true;
    hq4.visible = true;
    hq5.visible = true;


    player.collide(boundary1);
    player.collide(boundary2);


    spawnEnemies();


    if (keyWentDown("left")) 
    {
      player.x = player.x - 300.5;
    }
    if (keyWentDown("right")) 
    {
      player.x = player.x + 300.5;
    }


    if(player.x > windowWidth)
    {
      player.x = windowWidth/1.995;
    }
    if(player.x < windowWidth/970)
    {
      player.x = windowWidth/1.995;
    }


    if (keyWentDown("space")) 
    {
      spawnbullet();
    }


    //Destroying the enemies
    for (var i = 0; i < bullets.length; i++) 
    {
      for (var a = 0; a < enemies.length; a++) 
      {
        if (bullets[i].isTouching(enemies[a])) 
        {
          enemies[a].destroy();
          bullets[i].destroy();
          enemies.splice(a, 1);
          bullets.splice(i, 1);
          score = score + 1;
        }
      }
    }


    if(hq1.isTouching(enemies))
    {
      lives = lives - 1;
      hq1.destroy()
    }
    if(hq2.isTouching(enemies))
    {
      lives = lives - 1;
      hq2.destroy()
    }
    if(hq3.isTouching(enemies))
    {
      lives = lives - 1;
      hq3.destroy()
    }
    if(hq4.isTouching(enemies))
    {
      lives = lives - 1;
      hq4.destroy()
    }
    if(hq5.isTouching(enemies))
    {
      lives = lives - 1;
      hq5.destroy()
    }


    textFont("Iceland");
    fill("white");
    textSize(60);
    text("Score: " + score, width / 2.3, height / 8);
    text("Lives: " + lives, width / 2.28, height / 15);

    if(lives <= 0)
    {
      gameState = END;
    }
  }

  if(gameState === END)
  {
    player.destroy();
    hq1.destroy();
    hq2.destroy();
    hq3.destroy();
    hq4.destroy();
    hq5.destroy();

    for(var a; a < enemies.length; a++)
    {
      enemies[a].destroy();
    }

    textFont("Iceland");
    fill("white");
    textSize(60);
    text("Score: " + score, width / 2.3, height / 8);
    text("Lives: " + lives, width / 2.28, height / 15);
  }

  //console.log(gameState);

  drawSprites();
}


function spawnbullet() 
{
  bullet = createSprite(player.x, player.y - 55, 15, 20);
  bullet.setCollider("rectangle", 0, 0, 15, 10);
  bullet.velocityY = -20;
  bullets.push(bullet);
}


function spawnEnemies() 
{
  if (World.frameCount % 20 === 0) {

    enemy = createSprite(rand, -200, 70, 70);
    enemy.velocityY = random(minimumSpeed, maximumSpeed);
    enemy.setCollider("rectangle", 0, 0, 70, 40);
    enemies.push(enemy);
    //enemy.debug = true;

    rand = Math.round(random(1,4));
    switch(rand) {
        
      case 1: enemy.x = windowWidth/1.99;
              break;
      case 2: enemy.x = windowWidth/3.28;
              break;
      case 3: enemy.x = windowWidth/1.43;
              break;
      case 4: enemy.x = windowWidth/9.10;
              break;
      case 5: enemy.x = windowWidth/1.12;
              break;
      default: break;

    }

  }
}
