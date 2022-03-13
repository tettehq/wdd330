import QuakesController from '../team/quakescontroller.js';


const button = document.querySelector("#okButton");
button.addEventListener("click", e => {
    let radius = document.querySelector("#radius").value;
    const myQuakesController = new QuakesController('#quakeList', radius);
    myQuakesController.init()
})
