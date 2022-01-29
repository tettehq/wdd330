let boxList = document.querySelectorAll(".box")
boxList = Array.from(boxList)

let declaration = document.createElement('h1');
document.body.appendChild(declaration);

let currentPlayer = 'x'

for (let i = 0; i < boxList.length; i++) {
    boxList[i].addEventListener('click', displayMove);
}

function displayMove(event) {
    event.target.textContent = currentPlayer;
    switchCurrentPlayer();
    event.target.removeEventListener('click', displayMove);
}

function switchCurrentPlayer() {
    if (currentPlayer == 'x') {
        currentPlayer = 'o';
    } else if (currentPlayer = 'o') {
        currentPlayer = 'x'
    }
}

let resetButton = document.getElementById("reset-button")
resetButton.addEventListener('click', reset)

function reset() {
    for (let i = 0; i < boxList.length; i++) {
        boxList[i].textContent=''
        currentPlayer = 'x'
    }
}

declareResult()

function declareResult() {
    switch (declaration.textContent) {
        case boxList[0].textContent === boxList[1].textContent && boxList[1].textContent === boxList[2].textContent: `${boxList[0].textContent} is the winner!`
            break;
        case boxList[3].textContent === boxList[4].textContent === boxList[5].textContent: `${boxList[3].textContent} is the winner!`
            break;
        case boxList[6].textContent === boxList[7].textContent === boxList[8].textContent: `${boxList[6].textContent} is the winner!`
            break;
        case boxList[0].textContent === boxList[3].textContent === boxList[6].textContent: `${boxList[0].textContent} is the winner!`
            break;
        case boxList[1].textContent === boxList[4].textContent === boxList[7].textContent: `${boxList[1].textContent} is the winner!`
            break;
        case boxList[8].textContent === boxList[5].textContent === boxList[8].textContent: `${boxList[8].textContent} is the winner!`
            break;
        case boxList[0].textContent === boxList[4].textContent === boxList[8].textContent: `${boxList[0].textContent} is the winner!`
            break;
        case boxList[2].textContent === boxList[4].textContent === boxList[6].textContent: `${boxList[2].textContent} is the winner!`
            break;
        default: "It is a tie!"
            break;
    }
}