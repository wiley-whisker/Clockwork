var canvas = document.getElementById('clockView');
canvasWidth = canvas.width;// = window.innerWidth-4;
canvasHeight = canvas.height;// = window.innerHeight-4;

// Define context and reference other outside elements.
var c = canvas.getContext('2d');
var img = document.getElementById('clockimage');
var label = document.getElementById('label');

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


// COLOR DEFINITIONS
function rgbaColor(r,g,b,a) {
        return('rgba(' + r + ',' + g + ',' + b + ',' + a + ')');
}

function Color(r,g,b,a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.asString = function() {
        return(rgbaColor(this.r, this.g, this.b, this.a));
    }
}

function Colors() {
    this.makeRed = function() {
        return(new Color(255,0,0,0));
    }
    this.makeGreen = function() {
        return(new Color(0,255,0,0));
    }
    this.makeBlue = function() {
        return(new Color(0,0,255,0));
    }
}
Colors = new Colors();


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


// PRIMARY FUNCTIONALITY
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

var inSlice = false;
var mouseInSlice = -1;
function drawSlices() {
    for(i=0;i<sliceArray.length;i++) {
        sliceArray[i].draw();
        if(sliceArray[i].check()) {
            sliceArray[i].color.a = 0.7;
            canvas.style.cursor = 'pointer';
            mouseInSlice = i;
            inSlice = i;
        } else {
            sliceArray[i].color.a = 0.5;
            if(mouseInSlice == i) {
                canvas.style.cursor = 'default';
            }
        }
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

var newCol = Colors.makeRed();
function newSlctChange(selectid) {
    var slct = document.getElementById(selectid);
    var selected = slct[slct.selectedIndex].value;

    // var incText = document.getElementById('incrementBtn');
    // var decText = document.getElementById('deIncrementBtn');

    if (selected == "red") {
        newCol = Colors.makeRed();
    } else if (selected == "green"){
        newCol = Colors.makeGreen();
    } else {
        newCol = Colors.makeBlue();
    }
}

function newBtn() {
    var addSlice = newSlice(startTime, oneHour, newCol);
}


// OBJECTS
// Slice object.
function Slice(sTime, duration, color) {
    this.sTime = sTime;
    this.duration = duration;
    this.color = color;
    this.id = "honeybadger";//sliceArray.length;
    this.selected = false;

    this.draw = function() {
        c.beginPath();
        c.moveTo(x, y);
        c.arc(x,y, circleRadius-1, this.sTime, this.sTime + duration, false);
        c.fillStyle = this.color.asString();
        // if(this.selected){c.fillStyle = this.color;}
        // else {c.fillStyle = this.color;}
        c.fill();
    };

    this.updateStart = function(newStart){
        this.sTime = newStart;
    };

    this.check = function() {
        if(c.isPointInPath(Math.floor(mouse.x - (window.innerWidth/2) + (canvas.width/2)), mouse.y)) {
            console.log("The mouse is in the arc");
            return true;
        } else {
            console.log("The mouse is NOT in the arc");
            return false;
        }
    };
}

function newSlice(sTime, duration, color) {
    var newSlice = new Slice(sTime, duration, color);
    sliceArray.push(newSlice);
    return newSlice;
}

// SLICE ARRAY
var sliceArray = [];

// TESTING DEFINITION
var startTime = nine;
var slice = newSlice(startTime, oneHour*2, Colors.makeBlue());


// ANIMATION FUNCTION.
function animate() {
    requestAnimationFrame(animate);
    updateTimes();
    drawAll();
    // showMouseInfo();
    label.innerHTML = "Relative:" + Math.floor(mouse.x - (window.innerWidth/2) + (canvas.width/2)) + "," + mouse.y +
    " Absolute:" + mouse.x + "," + mouse.y + " Id selected: " + mouseInSlice;
}

function start() {
    animate();
}
animate();