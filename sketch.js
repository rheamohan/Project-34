//Create variables here
var Dog,DogSprite;
var happyDog,HappyDogSprite;
var database;
var foodS, foodStock;
var score=20;

function preload()
{
  Dog = loadImage("images/dog.png");
  happyDog = loadImage("images/doghappy.png");
}

function setup() {
  createCanvas(500,500);

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
  DogSprite = createSprite(250,250,5,5);
  DogSprite.addImage(Dog);
  DogSprite.scale = 0.2;
  
}


function draw() { 
  background(46, 139, 87); 

  drawSprites();

  textSize(22);
  textFont("COPPER BLACK");
  fill("pink");
  strokeWeight(5);
  stroke("black")
  text("PRESS UP_ARROW TO FEED MY DOG JUSTIN", 10,30);

  text("REMAINING FOOD  -  " +score,50,150);

  if(keyWentDown(DOWN_ARROW)){
    writeStock(foodS);
    DogSprite.addImage(Dog);
  }

  if(keyWentUp(UP_ARROW)){
    DogSprite.addImage(happyDog);
    score--
  }

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}