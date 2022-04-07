window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame
|| function(f){return setTimeout(f, 1000/60)}

window.cancelAnimationFrame = window.cancelAnimationFrame
|| window.mozCancelAnimationFrame
|| function(requestID){clearTimeout(requestID)} //fall back


var requestframeref
var battery = document.getElementById('battery')
var batterystatus = document.getElementById('status')
var action = 'charge'
var curcharge = 0

function updatebattery(timestamp){
if (action == 'charge'){
curcharge += 0.5
if (curcharge > 100){
action = 'discharge'
}
}
else{
curcharge -= 0.5
if (curcharge < 0){
action = 'charge'
}
}
batterystatus.style.width = curcharge + '%'
requestframeref = requestAnimationFrame(updatebattery)
}

battery.addEventListener('mouseenter', function(){
requestAnimationFrame(updatebattery)
}, false)

battery.addEventListener('mouseleave', function(){
cancelAnimationFrame(requestframeref)
}, false)


