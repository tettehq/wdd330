import * as utilities from "./utilities.js"
import * as ls from "./ls.js"

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame
|| function(f){return setTimeout(f, 100/60)}

window.cancelAnimationFrame = window.cancelAnimationFrame
|| window.mozCancelAnimationFrame
|| function(requestID){clearTimeout(requestID)} //fall back


export default class Controller {
    constructor(className, parentID) {
        this._body = utilities.qs(`.${className}`);
        this._box = utilities.qs(`#${parentID}`);
    }

    moveSnake() {
        const box = this._box;
        console.log(snake)
        console.log(box);
        window.addEventListener("keyup", change);
        window.addEventListener("keyup", move);
    }

    addListener() {
    }

    createFood() {
        const box = this._box;
        foodID = setInterval(() => {
            if (utilities.qs(".food") !== null) {
                utilities.qs(".food").remove();
            }
            foodController(box);
            window.requestAnimationFrame(eatFood);
            console.log("food");
        }, 5000);
    }

    displayScore() {
        let highScore = document.createElement("p");
        let scoreBoard = document.createElement("div");
        let prompt = document.createElement("h2");
        let score = document.createElement("p");
        scoreBoard.classList.add("scoreboard");

        prompt.textContent = "TIME'S UP!";
        score.textContent = `Your score: ${count} points!`;
        if (getHighScore() !== undefined && getHighScore() < count) {
            saveScore(count);
            highScore.textContent = `Your New High Score: ${count} points`;
        }
        else {
            highScore.textContent = `Your High Score: ${getHighScore()} points`;
        }
        
        scoreBoard.appendChild(prompt);
        scoreBoard.appendChild(score);
        scoreBoard.appendChild(highScore);
        document.body.appendChild(scoreBoard);
    }

    startGame() {
        const that = this;
        const box = this._box;
        utilities.onTouch(utilities.qs("#start"), (e) => {
            count = 0;
            let scoreBoard = utilities.qs(".scoreboard");
            if (scoreBoard !== null) {
                document.body.removeChild(scoreBoard);
                that._body.style.width = "10px";
                that._body.style.height = "10px";
            }

            box.classList.toggle("hidden");
            e.target.classList.toggle("hidden");
            this.createFood();
            setTimeout(() => {
                e.target.classList.toggle("hidden");
                box.classList.toggle("hidden");
                that.displayScore();
                clearInterval(foodID);
            }, 60000);
        })
    }

}


function foodController(box) {
    let food = createFoodElement();
    box.appendChild(food);
    let posX = randomInt(0, 295);
    let posY = randomInt(0, 295);
    food.style.transform = `translate(${posX}px, ${posY}px)`;
}

function createFoodElement() {
    let food = document.createElement("div");
    food.classList.add("food");
    return food;
}

function eatFood() {
    try {
        let food = utilities.qs(".food")
        let dominator = utilities.qs(".circle");
        let foodPosition = food.getBoundingClientRect();
        let dominatorPosition = dominator.getBoundingClientRect();
        let increment = 2;
        if (food !== undefined) {
            if ((dominatorPosition.right >= foodPosition.left && dominatorPosition.right <= foodPosition.right)
            && (dominatorPosition.top >= foodPosition.top && dominatorPosition.top <= foodPosition.bottom)
            || (dominatorPosition.left >= foodPosition.left && dominatorPosition.leftt <= foodPosition.right)
            && (dominatorPosition.top >= foodPosition.top && dominatorPosition.top <= foodPosition.bottom)) {
                dominator.style.width = `${dominatorPosition.width + increment}px`;
                dominator.style.height = `${dominatorPosition.height + increment}px`;
                food.remove();
                count += 1;
                console.log(foodPosition.x, foodPosition.y)  
            }
            else if ((dominatorPosition.right >= foodPosition.x - 5 && dominatorPosition.right <= foodPosition.x)
            && (dominatorPosition.top <= foodPosition.y + 5 && dominatorPosition.top >= foodPosition.y)
            || (dominatorPosition.left <= foodPosition.x + 5 && dominatorPosition.left >= foodPosition.x)
            && (dominatorPosition.bottom >= foodPosition.y - 5 && dominatorPosition.bottom <= foodPosition.y)) {
                dominator.style.width = `${dominatorPosition.width + increment}px`;
                dominator.style.height = `${dominatorPosition.height + increment}px`;
                food.remove();
                count += 1;
            }
        }
    } catch (error) {}
    window.requestAnimationFrame(eatFood);
}


let currentX = 0;
let currentY = 0;
var upID;
var downID;
var leftID;
var rightID;
var foodID;
const animations = []
let count = 0

function saveScore(value) {
    ls.writeToLS("highScore", value);
}

function getHighScore() {
    return ls.readFromLS("highScore");
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function change(event) {
    if (event.key == "w" || event.key == "s" || event.key == "a" || event.key == "d") {
        window.cancelAnimationFrame(upID);
        window.cancelAnimationFrame(downID);
        window.cancelAnimationFrame(leftID);
        window.cancelAnimationFrame(rightID);
    }    
    else {
        animations.pop();
        animations.forEach(anim => {
            window.cancelAnimationFrame(anim);
            console.log(event.key)
        })
    }
}

const snake = Array.from(utilities.qsAll(".circle"));

function move(event, dots = snake) {
    dots.forEach(dot => {
        function up() {
            if (currentY > 0) {currentY = (currentY -2)}
            else {currentY = 300 - 2}
            currentX = currentX;
            dot.style.transform = `translate(${currentX}px, ${currentY}px)`;
            upID = window.requestAnimationFrame(up); 
        }
    
        function down() {
            currentY = (currentY + 2) % 300;
            currentX = currentX;
            dot.style.transform = `translate(${currentX}px, ${currentY}px)`;
            downID = window.requestAnimationFrame(down); 
        }
    
        function left() {
            if (currentX > 0) {currentX = (currentX -2)}
            else {currentX = 300 - 2}
            currentY = currentY;
            dot.style.transform = `translate(${currentX}px, ${currentY}px)`;
            leftID = window.requestAnimationFrame(left); 
        }
    
        function right() {
            currentX = (currentX + 2) % 300;
            currentY = currentY;
            dot.style.transform = `translate(${currentX}px, ${currentY}px)`;
            rightID = window.requestAnimationFrame(right); 
        }

        if (event.key == "w") {
            upID = window.requestAnimationFrame(up);
            animations.push(upID);
        }
        else if (event.key == "s") {
            downID = window.requestAnimationFrame(down);
            animations.push(downID);
        }
        else if (event.key == "a") {
            leftID = window.requestAnimationFrame(left);
            animations.push(leftID);
        }
        else if (event.key == "d") {
            rightID = window.requestAnimationFrame(right);
            animations.push(rightID);
        }
    })
}
