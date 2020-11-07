//Create variables here
var dog, happyDog;
 var database, foodS, foodStock;
 var fedTime, lastFed, feed, addFoods, foodObj;
function preload()
{
  //load images here
  dog = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg1.png");

}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(200,300,20,10);
  dog.scale = 0.3;

  dog.addImage(dogImg);
  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  foodStock = database.ref('food');
  foodStock.on("value",readStock);

}


function draw() {  
background(46, 139, 87);
foodObj.display();
fedTime = database.ref("Feed Time");
fedTime.on('value', function(data){
  lastFed = data.val();
  
})

  drawSprites();

  //add styles here
  Fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed:"+lastFed%12+"PM",350,30);
}else if(lastFed===0){
text("Last Feed: 12AM",350,30);

}else {
text("Last Feed:"+lastFed+"AM",350,30);


}
text("Remaining Food",foodS,130,200);
textSize(15);
text("Press up arrow key to feed drago milk",60,50);

}

function readStock(data){
foodS = data.val();

}
function writeStock(X){
  if(x<=0){
    x=0;

  }else{
    x = x+1;
  }
  database.ref('/').update({
food:x
  })
}

function feedDog(){
  dog.addImage(happyDog)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(), 
    fedTime:hour()
  })
}
function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}