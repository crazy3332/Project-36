var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastFed;

//create feed and lastFed variable here


function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

  feedTheFood=createButton("Feed Food");
  feedTheFood.position(800,95);
  feedTheFood.mousePressed(feedDog);
}

function draw() {
  background(0,255,0);
  foodObj.display();

  //write code to read fedtime value from the database 
  var fedTime = database.ref('feedTime');
  fedTime.on("value", (readFeedTime) => {
    lastFed = readFeedTime.val();
  });
    
  //write code to display text lastFed time here
  if (lastFed >= 12){
    text("Last fed: " + (lastFed - 12) + "PM", 500, 150);
  } else if (lastFed == 0) {
    text ("Last fed: 0 AM", 500, 150);
  } else {
    text ("Last fed: " + lastFed + "AM", 500, 150);
  }
     
  drawSprites();
}




//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  //console.log("I am in readStock function" + foodS);
}


function feedDog(){

  //write code here to update food stock and last fed time

  foodS--;
  database.ref('/').update({
    Food:foodS
  });

  lastFed = Math.round(hour());

  database.ref('/').update({
    feedTime:lastFed
  });

  dog.addImage(happyDog);

  
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}