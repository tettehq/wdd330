import Controller from "./controller.js";
import * as utilities from "./utilities.js"

const newGame = new Controller("circle", "box");
window.addEventListener("load", ()=> {
    newGame.startGame();
    newGame.moveSnake();
})