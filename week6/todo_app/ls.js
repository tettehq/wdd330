
export function readFromLS(key) {
    let list = JSON.parse(window.localStorage.getItem(key));
    return list;
}

export function writeToLS(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}