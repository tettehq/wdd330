
export function readFromLS(key) {
    let item = JSON.parse(window.localStorage.getItem(key));
    return item;
}

export function writeToLS(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}