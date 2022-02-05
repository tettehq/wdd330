//Errors and wornings
/*function three(){ unicorn(); }
function two(){ three(); }
function one(){ two(); }
one();
/* index.html:13 Uncaught ReferenceError: unicorn is not defined
    at three (index.html:13)
    at two (index.html:17)
    at one (index.html:21)
    at index.html:24`
*/

//warning example
pi = 3.142;
//JavaScript Warning: assignment to undeclared variable

//in strict mode, an undeclared variable returns an error, instead of a warning like in "sloppy mode"
e = 2.718;
//ReferenceError: e is not defined

//using strict mode in a self invoking function is recommended
(function() {
    'use strict';

    // All your code would go inside this function
    console.log(Math.floor(6 * Math.random + 1) instanceof Number)
}());

//feature detection allows for checking if a method, function or object exists and gracefully fails that piece of code if it is non-existent
if (window.holoDeck) {
    virtualReality.activate();
    alert('It exists');
} 
else {
    console.log('"virtualReality" is undefined')
}

//the alert method is useful in debugging because it stops the code from running when it pops up until 'okay' is clicked
function amIOldEnough(age){
    if (age < 12) {
        alert(age);
        console.log('No, sorry.');
    } else if (age < 18) {
        return 'Only if you are accompanied by an adult.';
    }
    else {
        console.log('Yep, come on in!');
    }
}
amIOldEnough(11);
amIOldEnough(13);

//The Locked Box Exercise
const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  },
};

function withBoxUnlocked(body) {
  let locked = box.locked;
  if (!locked) {
    return body();
  }

  box.unlock();
  try {
    return body();
  } finally {
    box.lock();
  }
}

withBoxUnlocked(function () {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function () {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}

console.log(box.locked);