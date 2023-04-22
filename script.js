
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const HighscoreElement = document.querySelector(".High-score");

let foodX , foodY;
let snakeX = 5 , snakeY = 15;
let snakeBody = [];
let velocityX = 0 , velocityY = 0 ;
let score = 0 ;
let highScore = localStorage.getItem("High-score") || 0 ;
HighscoreElement.innerHTML = `High score : ${highScore}`;

const changeFoodPosition = () => {
    // create a random number between 0 and 30
    foodX = Math.floor(Math.random() * 30)+1;
    foodY = Math.floor(Math.random() * 30)+1;
}
const changeDirection = (e) => {
    // console.log(e)
    if(e.key === "ArrowUp"){
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown"){
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft"){
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight"){
        velocityX = 1;
        velocityY = 0;
    }
    initGame();
}

const initGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX} "></div>`;
    // checking if snake hit the food
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY]); // push coordinate of food
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("highScore",highScore);
        scoreElement.innerHTML = `Score : ${score}`;
        HighscoreElement.innerHTML = `High Score : ${highScore}`;
    }

    for (let i = snakeBody.length-1;i>0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    snakeBody[0] = [snakeX,snakeY]

    // update snake position base on velocity
    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX < 0 || snakeX > 31 || snakeY < 0 || snakeY > 31){
        alert("Game over press ok to replay ... ");
        window.location.reload();
    }

    for(let i=0 ; i < snakeBody.length;i++){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
    }
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
setInterval(initGame,150) //125 milli seconds : init game runs each 125 !
initGame();

document.addEventListener("keydown",changeDirection);
