window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame
|| function(f){return setTimeout(f, 100/60)}

window.cancelAnimationFrame = window.cancelAnimationFrame
|| window.mozCancelAnimationFrame
|| function(requestID){clearTimeout(requestID)} //fall back

const dot = document.querySelector(".circle");
const box = document.getElementById("box");
let limit = 0;
let currentX = 0;
let currentY = 0;
window.addEventListener("keyup", change);
window.addEventListener("keyup", move);

var upID
var downID
var leftID
var rightID

function change() {
    window.cancelAnimationFrame(upID);
    window.cancelAnimationFrame(downID);
    window.cancelAnimationFrame(leftID);
    window.cancelAnimationFrame(rightID);
}

function move(event) {
    console.log(event.key);
    function up() {
        if (currentY > 0) {currentY = (currentY -2)}
        else {currentY = 302 - 2}
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
        else {currentX = 302 - 2}
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
    
    switch (event.key) {
        case "w":
            upID = window.requestAnimationFrame(up);
            break;
        case "s":
            downID = window.requestAnimationFrame(down);
            break;
        case "a":
            leftID = window.requestAnimationFrame(left);
            break;
        case "d":
            rightID = window.requestAnimationFrame(right);
            break;
    }

    // switch (event.key) {
    //     case ("w"):
    //         dot.classList.add("moveup");
    //         dot.classList.remove("movedown", "moveleft", "moveright");
    //         break;
    //     case ("s"):
    //         dot.classList.add("movedown");
    //         dot.classList.remove("moveup", "moveleft", "moveright");
    //         break;
    //     case ("a"):            
    //         dot.classList.add("moveleft");
    //         dot.classList.remove("movedown", "moveup", "moveright");
    //         break;
    //     case ("d"):
    //         dot.classList.add("moveright");
    //         dot.classList.remove("movedown", "moveleft", "moveup");
    //         break;
    // }
}


