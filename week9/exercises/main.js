x = 6;  // global variable created

window.x // same variable can be accessed as a property of the window object
console.log(window.x);

// both variables are exactly the same
console.log(window.x === x);

//parseInt and isNaN are methods of the global object. They are also methods of the Number Object
console.log(window.parseInt(6.9));
console.log(window.isNaN(4.2));

//in general, global methods and variables should customarily be referred to without using the window object.

//checking browser using window object
console.log(window.navigator.userAgent);
//Don’t rely on this information though, as it can be modified by a user to masquerade as a different browser. It can also be difficult to make any sense of the string returned, because all browsers pretend to be others to some degree. For example, every browser will include the string “Mozilla” in its userAgent property, for reasons of legacy Netscape compatibility. The userAgent property has been deprecated from the official specification, but it remains well supported in all major browsers.

//getting the url of the current page
console.log(window.location.url);
console.log(window.location.protocol);
console.log(window.location.host);
console.log(window.location.hostname);

//browser history
console.log(window.history.length)

///controlling windows
const popup = window.open('https://sitepoint.com','SitePoint','width=400,height=400,resizable=yes');
//browser blocked pop-up

//screen info
console.log(window.screen.height);
console.log(window.screen.width);
console.log(window.screen.availHeight);
console.log(window.screen.availWidth);

//using the this keyword
const person = {
    name: 'Superman',
    introduce() { 
        console.log(`Hi, I'm ${this.name}`);
    }
};
                
setTimeout(person.introduce, 5000);

//animation using setTImeout and setInterval
const squareElement = document.getElementById('square');
let angle = 0;

setInterval( () => {
    angle = (angle + 2) % 360;
    squareElement.style.transform = `rotate(${angle}deg)`
}, 1000/60);

const circleElement = document.getElementById('circle');
let size = 0;

function move() {
    size = (size + 2) % 200;
    circleElement.style.transform = `translate(0, ${size}px)`;
    window.requestAnimationFrame(move);
}
const circleID = requestAnimationFrame(move);

//using requestAnimationFrame
const rectElement = document.getElementById('rectangle');
let angle2 = 0;

function rotate() {
    angle2 = (angle2 + 20)%360;
    rectElement.style.transform = `rotate(${angle2}deg)`    
}

//anmate shape on every second click
const id = requestAnimationFrame(rotate);
let count = 1
rectElement.addEventListener("click", () => {
    count += 1;
    if (count%2 == 0) {
        window.requestAnimationFrame(rotate);
    }

    else {
        cancelAnimationFrame(id);
    }
})