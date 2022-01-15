//exercise 1- quiz ninja
const question = "What is the fastest animal on land?"
const answer = prompt(question);
alert(`You answered ${answer}`);

//excercise 2- looping through a triangle
for (let line = "*"; line.length < 8; line += "*") {
    console.log(line);
}

//exercise 3 -recursion
function isOdd(n) {
    if (n == 0) return false;
    else if (n == 1) return true;
    else if (n < 0) return isOdd(-n);
    else return isOdd(n - 2);
}
console.log(isOdd(79));
console.log(isOdd(58));
console.log(isOdd(-35));

//exercise 4- sum of a range
function range(min, max, interval = min < max ? 1 : -1) {
    let array = [];
  
    if (interval > 0) {
      for (let i = min; i <= max; i += interval) array.push(i);
    } else {
      for (let i = min; i >= max; i += interval) array.push(i);
    }
    return array;
}

function sum(array) {
    let total = 0;
    array.forEach(value => {
        total += value;
    });
    return total;
}

console.log(range(1, 58));
console.log(range(15, 2, -2));
console.log(sum(range(2, 166)));