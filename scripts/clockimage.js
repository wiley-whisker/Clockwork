var canvas = document.getElementById('clockView');
canvasWidth = canvas.width;// = window.innerWidth-4;
canvasHeight = canvas.height;// = window.innerHeight-4;

// Define context and reference other outside elements.
var c = canvas.getContext('2d');
var img = document.getElementById('clockimage');
var label = document.getElementById('label');

// var colorArray = [
//     'rgba(255, 0, 0, 0.5)',
//     'rgba(0, 255, 0, 0.5)',
//     'rgba(0, 0, 255, 0.5)'
// ];

// MOUSE DEFINITIONS
// Mouse struct.
var mouse = {
    x: undefined,
    y: undefined
}

// Mouse information collection.
window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

function showMouseInfo() {
    console.log(mouse.x + "," + mouse.y);
}


// COLOR DEFINITIONS
// function RgbaColor(r,g,b,a) {
    //comment
// }

// function draw() {
//     drawClockImg();
//     updateTime();
// }


// LOCATION DEFINITIONS
var centerWidth = canvasWidth / 2;
var centerHeight = canvasHeight / 2;

var x = centerWidth;// x represents the centerpoint of the canvas
var y = centerHeight;// y represents the centerpoint of the canvas
var circleRadius = (canvasWidth / 2) * 0.98;
var outerRadius = circleRadius + circleRadius * 0.1;
var innerRadius = circleRadius * 0.9;


// TIME DEFINITIONS
var nine = Math.PI;
var twelve = -Math.PI/2;
var oneHour = Math.PI/6;
var halfHour = Math.PI/12;
var min15 = Math.PI/24;

changeTime = oneHour;


// OBJECTS
// Slice object.
function Slice(sTime, duration, color) {
    this.sTime = sTime;
    this.duration = duration;
    this.color = color;

    this.draw = function() {
        c.beginPath();
        c.moveTo(x, y);
        c.arc(x,y, circleRadius-1, this.sTime, this.sTime + duration, false);
        c.fillStyle = this.color;
        c.fill();
    };

    this.updateStart = function(newStart){
        this.sTime = newStart;
    };

    this.check = function() {
        if(c.isPointInPath(mouse.x, mouse.y)) {
            console.log("The mouse is in the arc");
            return true;
        } else {
            console.log("The mouse is NOT in the arc");
            return false;
        }
    };
}

// TESTING DEFINITION
var startTime = nine;
var slice = new Slice(startTime, oneHour*2, 'rgba(0, 255, 0, 0.5)');


function updateTimes() {
    //will become iterable.
    slice.updateStart(startTime);
}

function drawAll() {
    c.clearRect(0, 0, canvasWidth, canvasHeight);
    drawClockImg();
    drawSlices();
    drawLast();
}

function drawClockImg() {
    c.drawImage(img, 0, 0, canvasWidth, canvasHeight);
}

flag = false;
function drawSlices() {
    slice.draw();
    if(slice.check()) {
        //label.innerHTML = "mouse is in arc";
        slice.color = 'rgba(0, 255, 0, 0.7)';
        canvas.style.cursor = 'pointer';
        if(!flag){
            console.log("Made it this far"); flag = true;}
    } else {
        //label.innerHTML = "mouse NOT in arc";
        slice.color = 'rgba(0, 255, 0, 0.5)'
        canvas.style.cursor = 'default';
        flag = false;
    }

}

function drawLast() {
    //arc to cover inner circle
    c.beginPath();
    c.arc(x, y, circleRadius*0.2, 0, Math.PI*2, false);
    c.fillStyle='whitesmoke';
    c.fill();

    //Dot at center
    c.beginPath();
    c.arc(x, y, circleRadius * 0.025, 0, Math.PI*2, false);
    c.fillStyle='black';
    c.fill();
}


// CONTROL BUTTONS
function increment() {
    startTime += changeTime;
    console.log("incremented");
}

function deIncrement() {
    startTime -= changeTime;
    console.log("de-incremented");
}

function slctChange(selectid) {
    var slct = document.getElementById(selectid);
    var selected = slct[slct.selectedIndex].value;

    // var incText = document.getElementById('incrementBtn');
    // var decText = document.getElementById('deIncrementBtn');

    if (selected == "1hr") {
        changeTime = oneHour;
    } else if (selected == "30min"){
        changeTime = halfHour;
    } else {
        changeTime = min15;
    }
}

// ANIMATION FUNCTION.
function animate() {
    requestAnimationFrame(animate);
    updateTimes();
    drawAll();
    showMouseInfo();
}

function start() {
    animate();
}
label.innerHTML = x + "," + y;
animate();