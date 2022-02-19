
function qs(selector) {
    return document.querySelector(selector);
}

function onTouch(Selector, callback) {
    Selector.addEventListener("touchend", callback);
    Selector.addEventListener("click", callback);
}

export {
    qs,
    onTouch
}