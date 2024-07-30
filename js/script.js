const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const scale = 20;
const rows = canvas.height/scale; //25
const columns = canvas.width/scale; //25

let snake = [];
snake[0] = {
  x: (Math.floor(Math.random() * columns)) * scale,
  y: (Math.floor(Math.random() * rows)) * scale
}

let food = {
  x: (Math.floor(Math.random() * columns)) * scale,
  y: (Math.floor(Math.random() * rows)) * scale
}

let d = "right";


document.onkeydown = direction;
function direction(event){
  let key = event.keyCode;
  if(key == 37 && d != "right"){
    d = "left"
  }
  else if(key == 38 && d != "down"){
    d = "up"
  }
  else if(key == 39 && d != "left"){
    d = "right"
  }
  else if(key == 40 && d != "up"){
    d = "down"
  }
}

let play = setInterval(drow,100);

function drow() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for (let i=0; i<snake.length; i++) {
    ctx.fillStyle = "orange";
    ctx.strokeStyle = "red";
    ctx.fillRect(snake[i].x,snake[i].y,scale,scale);
    ctx.strokeRect(snake[i].x,snake[i].y,scale,scale);
  }
  

  //drow food
  ctx.fillStyle = "red";
  ctx.strokeStyle = "red";
  ctx.fillRect(food.x, food.y, scale, scale);
  ctx.strokeRect(food.x, food.y, scale, scale);

  let snakex = snake[0].x;
  let snakey = snake[0].y;
  if(d == "left") snakex -= scale;
  if(d == "up") snakey -= scale;
  if(d == "right") snakex += scale;
  if(d == "down") snakey += scale;

  if(snakex > canvas.width){
    snakex = 0;
  }
  if(snakey > canvas.height){
    snakey = 0;
  }
  if(snakex < 0){
    snakex = canvas.width;
  }
  if(snakey < 0){
    snakey = canvas.height;
  }

  if(snakex == food.x && snakey == food.y){
    food = {
      x: (Math.floor(Math.random() * columns)) * scale,
      y: (Math.floor(Math.random() * rows)) * scale
    }
  }
  else{
    snake.pop();
  }

  let newHead = {
    x : snakex,
    y : snakey
  }

  if(eatSelf(newHead,snake)) {
    clearInterval(play);
    alert("The moment before disaster");
  }

  snake.unshift(newHead);

}




// game over
function eatSelf(head,array){
  for(let i=0; i<array.length;i++){
    if(head.x == array[i].x && head.y == array[i].y){
      return true;
      
    }
  }
  return false;
}