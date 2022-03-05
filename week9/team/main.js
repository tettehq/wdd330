
function playSound(e) {
    let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    let key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    key.classList.add("playing")
    if (!audio) { return; } // This stops the function from running if the wrong key is hit
    audio.currentTime = 0 //resets audio clip to beginning 
    audio.play()
}

function removeTransition (e) {
    if (e.propertyName !== 'transform') return; // skip if true
    this.classList.remove('playing');
}

window.addEventListener("keydown", playSound);

let keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
let keyList = Array.from(keys);
window.addEventListener("keydown", moveKeyDown);


function moveKeyDown(e) {
  let key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!key) {
    return;
  }
  count = key.getAttribute("data-count");
  if (count == null) {
    count = 10;
    key.setAttribute("data-count", count);
  } else if (count > 99) {
    count = 0;
  } else {
    count = Number(count) + 10;
  }
  key.setAttribute("data-count", count);
  key.style.transform = `translate(0, ${count}px)`;
}

document.querySelector(".test").addEventListener("click", moveKeyDown);