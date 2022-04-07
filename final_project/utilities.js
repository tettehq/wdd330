function qs(selector) {
    return document.querySelector(selector);
}

function onTouch(Selector, callback) {
    Selector.addEventListener("touchend", callback);
    Selector.addEventListener("click", callback);
}

function qsAll(selector) {
    return document.querySelectorAll(selector);
}

export {
    qs,
    qsAll,
    onTouch
}