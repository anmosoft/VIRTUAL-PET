//Create variables here
var dog,dogimage;
var happydog;
var database;
var foodS;
var foodStock;
function preload()
{
  //load images here
  dogimage=loadImage("images/dogimg.png");
  happydog=loadImage("images/happydog.png");
}

function setup() {
  database=firebase.database()
  createCanvas(500, 500);
  dog=createSprite(250,250,10,10);
  dog.addImage(dogimage);
  dog.scale=0.2;
  
  foodStock=database.ref("food");
  foodStock.on("value",readStock);

  
}


function draw() {  
background(46,139,87);


if(keyWentDown(UP_ARROW)){
  writeStocks(foodS);
  dog.addImage(happydog);
}
  drawSprites();
  //add styles here
  fill ("white");
  textSize(25);
 text("FOOD REMAINING "+foodS,150,400);
 textSize(20);
 text("PRESS 'UP ARROW KEY' TO FEED DRAGO MILK",20,100);

}

function readStock(data){
foodS=data.val();
}

function writeStocks(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
database.ref('/').update({
  food:x
})
}



