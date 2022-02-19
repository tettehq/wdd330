//flatening
let arrays = [[1, 2, 3], [4, 5], [6]];

console.log(arrays.reduce((flat, current) => flat.concat(current), []));

//your own loop
function loop(start, test, update, body) {
    for (let value = start; test(value); value = update(value)) {
      body(value);
    }
}
  
loop(3, n => n > 0, n => n - 1, console.log);

//A javascript workbench
document.querySelector("#button").addEventListener("click", () => {
    let code = document.querySelector("#code").value;
    let outputNode = document.querySelector("#output");
    try {
      let result = Function(code)();
      outputNode.innerText = String(result);
    } catch (e) {
      outputNode.innerText = "Error: " + e;
    }
});