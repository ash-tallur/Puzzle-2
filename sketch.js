var maze1,maze2,maze3,maze4,maze5,maze6;
var character,charup,chardown,charleft,charright;
var door,doorImg1,doorImg2;
var door_key,keyImage,door_key2;
var PLAY = 1;
var END = 0;
var edges;
var time_limit = 25;
var timeLeft = time_limit;
var timer;
var gameState;
var level = 0;
var key1flag,key2flag = 0;
var level1flag,level2flag = 0;


function preload(){

    doorImg1 = loadAnimation("images/door1.png","images/door2.png","images/door3.PNG","images/door4.PNG","images/door5.PNG","images/door6.PNG","images/door7.PNG","images/door8.PNG","images/door9.PNG","images/door10.PNG");

    keyImage = loadImage("images/key.png");

    charup  = loadAnimation("images/up0.png","images/up1.png","images/up2.png","images/up3.png");

    chardown = loadAnimation("images/front0.png","images/front1.png","images/front2.png","images/front3.png");

    charleft = loadAnimation("images/left0.png","images/left1.png","images/left2.png","images/left3.png");

    charright = loadAnimation("images/right0.png","images/right1.png","images/right2.png","images/right3.png")
}

function setup(){

    createCanvas(displayWidth,displayHeight); 

    character = createSprite(displayWidth/2-700,displayHeight/2+200,50,50);
    character.addAnimation("boy down",chardown);
    character.addAnimation("boy up",charup);
    character.addAnimation("boy left",charleft);
    character.addAnimation("boy right",charright);

    maze1 = createSprite(displayWidth/2,displayHeight/2,6,600);
    maze2 = createSprite(displayWidth/2-100,displayHeight/4,500,6);
    maze3 = createSprite(displayWidth/2+100,displayHeight/2-100,500,6);
    maze4 = createSprite(displayWidth/2,displayHeight/2+200,500,6);

    door_key = createSprite(displayWidth/2+40,displayHeight/2-60,25,25);
    door_key.addImage(keyImage);
    door_key.rotation = 180;
    door_key.scale = 0.5;
    door_key.rotateToDirection = true;

    door_key2 = createSprite(displayWidth/2+350,displayHeight/2+130,25,25);
    door_key2.addImage(keyImage);
    door_key2.rotation = 180;
    door_key2.scale = 0.5;
    door_key2.rotateToDirection = true;
    door_key2.visible = false;

    door = createSprite(displayWidth/2+600,displayHeight/10,30,30);
    door.addAnimation("door1 opening",doorImg1);
    door.scale = 0.7;
    door.visible = false;

    edges = createEdgeSprites();
}

function draw(){

    //starting the game with welcome page when gamestate is not defind
    if(gameState === undefined){
        
        welcomePage();

        //on pressing alphabet S the game starts with level 1
        if(keyDown('S') && gameState === undefined){
   
            gameState = PLAY;
            level = 1;
            level1flag = 1;
            //time_limit = 8;
        }
    }

    //conditions to check when gameState is in Play mode
    if(gameState === PLAY){

        //conditions to check in level 1
        if(level === 1 && level1flag === 1){
       
            background('white');

            if(frameCount % 30 === 0){
                timer = startTimer();
            }

            textSize(20)
            text("LEVEL 1", displayWidth/2+150,displayHeight/18);
          
            door_key.rotation = door_key.rotation + 5;

            //conditions that are common in play mode
            textSize(20)
            text("Time left to procure the key and enter the room: " + timer, displayWidth/16,displayHeight/18);

            //conditions that help in moving the character around the game area
            if(keyDown(UP_ARROW)){
                character.changeAnimation("boy up",charup);
                character. y = character.y - 8;
                    
            }
            if(keyDown(DOWN_ARROW)){
                character.changeAnimation("boy down",chardown);
                character. y = character.y + 8;
            }
            if(keyDown(LEFT_ARROW)){
              character.changeAnimation("boy left",charleft);
              character.x = character.x - 8;

            }
            if(keyDown(RIGHT_ARROW)){
              character.changeAnimation("boy right",charright);
              character.x = character.x + 8;
            }

            //condition to be taken care when timer sets to 0
            if (timer == 0){
              door_key.visible = false;
              gameState = END;
              clear();
              textSize(25);
              text("Press 'R' to restart", displayWidth/2-300,displayHeight/2);  
            }
          
            //conditions to take care when character touches the key
            if(character.isTouching(door_key)){
              door_key.visible = false;
              door.visible = true;
            }
            
            //when character touches the door the level changes 
            if(character.isTouching(door)){
                clear();
                timer = null;
                level = 2;  
                door.visible = false;
                time_limit = 50; 
                timeLeft = time_limit;
                level1flag = 0;

                character.x = displayWidth/2-700;
                character.y = displayHeight/2+200;
                
              // time_limit = 16;
            }

        }

        //condditions to check in level 2
        if(level === 2){
          
          if(level2flag === 0){

            //new changes in the maze design
            level2Page();

            door_key.visible = true;
            
            door_key2.visible = true;
            
            level2flag = 1;
          }

          if(level2flag == 1){

            background('lavender');

            textSize(20)
            text("LEVEL 2", displayWidth/2+150,displayHeight/18);

            //conditions that are common in play mode
            textSize(20)
            text("Time left to procure the key and enter the room: " + timer, displayWidth/16,displayHeight/18);

            if(frameCount % 30 === 0){
              timer = startTimer();
            }
            
            door_key.rotation = door_key.rotation + 7;
            
            door_key2.rotation = door_key2.rotation + 9;

            maze5.bounceOff(edges);
            
            //conditions that help in moving the character around the game area
            if(keyDown(UP_ARROW)){
              character.changeAnimation("boy up",charup);
              character. y = character.y - 10;
                 
            }
            if(keyDown(DOWN_ARROW)){
              character.changeAnimation("boy down",chardown);
              character. y = character.y + 10;
            }
            if(keyDown(LEFT_ARROW)){
              character.changeAnimation("boy left",charleft);
              character.x = character.x - 10;

            }
            if(keyDown(RIGHT_ARROW)){
              character.changeAnimation("boy right",charright);
              character.x = character.x + 10;
            }

            //condition to be taken care when timer sets to 0
            if (timer == 0){
              door_key.visible = false;
              door_key2.visible = false;
              gameState = END;
              clear();
              textSize(25);
              text("Press 'R' to restart", displayWidth/2,displayHeight/2);  
            }
      
            //conditions to take care when character touches the key
            if(character.isTouching(door_key)) {
                 door_key.visible = false;
                 key1flag = 1;                  
            }

            if(character.isTouching(door_key2)){
                 door_key2.visible = false;
                 key2flag = 1;
            }

            if(key1flag ===1 && key2flag ===1){
                  door.visible = true; 
            }           

            //when character touches the door the level changes 
            if(character.isTouching(door)){

               clear();
               timer = null;
               //gameState = END;
               door.visible = false;
               character.visible = false;
               finalPage();

              // character.x = displayWidth/2-700;
               //character.y = displayHeight/2+200;

            }

          }
        }
        
        //conditions to check if character is touching maze
        if(character.isTouching(maze1)||character.isTouching(maze2)||character.isTouching(maze3)||character.isTouching(maze4)){
             
          timer = null;
          door_key.visible = false;
          door_key2.visible = false;
          door.visible = false;
          gameState = END;

          character.x = displayWidth/2-700;
          character.y = displayHeight/2+200;

          clear();
          textSize(25);
          text("Press 'R' to restart", displayWidth/2-300,displayHeight/2);  
        }

        character.collide(edges);
        

      drawSprites();
    }

    //option of restarting the game when 
    if(gameState === END){

      if(keyDown('R') && level1flag ===1){
         
        clear();
        gameState = undefined;
        timer = null;
        timeLeft = time_limit;
        door_key.visible = true;
        
        character.x = displayWidth/2-700;
        character.y = displayHeight/2+200;
     
        level1flag = 0;

      }

      if(keyDown('R') && level2flag === 1){
        
        clear();
        gameState = PLAY;
        timer = null;
        timeLeft = time_limit;
        door_key.visible = true;
        door_key2.visible = true;
        character.x = displayWidth/2-700;
        character.y = displayHeight/2+200;
        level2flag = 0;

      }

    }
}

function welcomePage(){

      background('lightblue');
      textSize(30)
      fill('black')
      text ('Welcome to the Maze Game',displayWidth/2-150,displayHeight/2-50);
      textSize(20)
      text('Press S to start the Game',displayWidth/2-80,displayHeight/2+50);
}

function level2Page(){

     maze1.x = displayWidth/2;
     maze1.y = displayHeight/2 + 200;
     maze2.x = displayWidth/2-190;
     maze2.y = displayHeight/3+100;
     maze3.x = displayWidth/2-220;
     maze3.y = displayHeight/2+250;
     maze4.x = displayWidth/2+300;
     maze4.y = displayHeight/2+100
     maze4.width = 450;

     maze5 = createSprite(displayWidth/2+400,displayHeight/2+150,6,600);
     maze5.velocityY = -5;
     maze6 = createSprite(displayWidth/2+200,displayHeight/2+340,600,6);

     door_key.x = displayWidth/2-50;
     door_key.y = displayHeight/2+60;

     //door.x = displayWidth/2 - 700;
    // door.y = displayHeight/2 + 200;
 
}

function startTimer(){

    if ( timeLeft > 0 ){

        timeLeft--;

        return timeLeft;
    }

    console.log(timeLeft);
    
}

function finalPage(){

  clear();
  background("pink");
  textSize(30);
  fill("purple");
  text("You won the game",displayWidth/2+10,displayHeight/2);
}
