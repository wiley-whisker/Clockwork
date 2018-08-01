var canvas = document.getElementById('clockView');
canvasWidth = canvas.width;// = window.innerWidth-4;
canvasHeight = canvas.height;// = window.innerHeight-4;
var c = canvas.getContext('2d');

var centerWidth = canvasWidth / 2;
var centerHeight = canvasHeight / 2;

var x = centerWidth;// x represents the centerpoint of the canvas
var y = centerHeight;// y represents the centerpoint of the canvas
var circleRadius = 140;
var outerRadius = circleRadius + circleRadius * 0.1;
var innerRadius = circleRadius * 0.9;

//Mouse info
// var mouse = {
//     x: undefined,
//     y: undefined
// }

// window.addEventListener('mousemove',
//     function(event) {
//         mouse.x = event.x;
//         mouse.y = event.y;
//         console.log("x: " + mouse.x + " y: " + mouse.y);
//     });


var lj = Math.floor(Math.sqrt(3) * outerRadius / 2);// Long x/y-value offset.
var sj = outerRadius / 2;// Short x/y-value offset.

function drawClock() {
    // Draw outline
    c.beginPath();
    c.arc(x, y, circleRadius, 0, Math.PI*2, false);
    c.stroke();

    // Draw lines
    // Vertical lower
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x, y + outerRadius);
    c.stroke();

    // Vertical upper
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x, y - outerRadius);
    c.stroke();

    // Horizontal left
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x - outerRadius, y);
    c.stroke();

    // Horizontal right
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x + outerRadius, y);
    c.stroke();

    // 1
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x + sj, y - lj);
    c.stroke();

    // 2
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x + lj, y - sj);
    c.stroke();

    // 4
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x + lj, y + sj);
    c.stroke();

    // 5
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x + sj, y + lj);
    c.stroke();

    // 7
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x - sj, y + lj);
    c.stroke();

    // 8
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x - lj, y + sj);
    c.stroke();

    // 10
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x - lj, y - sj);
    c.stroke();

    // 11
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x - sj, y - lj);
    c.stroke();

    // Number 12
    c.beginPath();
    c.font = '20px Arial';
    c.textAlign = "center";
    c.fillStyle = "black";
    c.fillText("12", x, y - circleRadius-circleRadius * 0.12);

    // Number 1
    c.beginPath();
    c.font = '20px Arial';
    c.textAlign = "left";
    c.fillStyle = "black";
    c.fillText("1", x + sj, y - lj);

    // Number 2
    c.beginPath();
    c.font = '20px Arial';
    c.textAlign = "left";
    c.fillStyle = "black";
    c.fillText("2", x + lj + 5, y - sj);

    // Number 3
    c.beginPath();
    c.font = '20px Arial';
    c.textAlign = "center";
    c.fillStyle = "black";
    c.fillText("3", x + circleRadius+circleRadius * 0.2, y+5);

    // Number 4
    c.beginPath();
    c.font = '20px Arial';
    c.textAlign = "left";
    c.fillStyle = "black";
    c.fillText("4", x + lj + 5, y + sj + 5);

    // Number 5
    c.beginPath();
    c.font = '20px Arial';
    c.textAlign = "left";
    c.fillStyle = "black";
    c.fillText("5", x + sj, y + lj + 15);

    // Number 6
    c.beginPath();
    c.font = '20px Arial';
    c.textAlign = "center";
    c.fillStyle = "black";
    c.fillText("6", x, y + circleRadius+circleRadius * 0.25);

    // Number 7
    c.beginPath();
    c.font = '20px Arial';
    c.textAlign = "right";
    c.fillStyle = "black";
    c.fillText("7", x - sj, y + lj + 20);

    // Number 8
    c.beginPath();
    c.font = '20px Arial';
    c.textAlign = "right";
    c.fillStyle = "black";
    c.fillText("8", x - lj, y + sj + 15);

    // Number 9
    c.beginPath();
    c.font = '20px Arial';
    c.textAlign = "center";
    c.fillStyle = "black";
    c.fillText("9", x - circleRadius-circleRadius * 0.2, y+5);

    // Number 10
    c.beginPath();
    c.font = '20px Arial';
    c.textAlign = "right";
    c.fillStyle = "black";
    c.fillText("10", x - lj, y - sj);

    // Number 11
    c.beginPath();
    c.font = '20px Arial';
    c.textAlign = "right";
    c.fillStyle = "black";
    c.fillText("11", x - sj, y - lj);

    //arc to cover inner circle
    c.beginPath();
    c.arc(x, y, circleRadius*0.9, 0, Math.PI*2, false);
    c.fillStyle='whitesmoke';
    c.fill();
}
drawClock();

// arcs
var nine = Math.PI;
var twelve = -Math.PI/2;
var oneHour = Math.PI/6;
var halfHour = Math.PI/12;
var min15 = Math.PI/24;

changeTime = oneHour;

var startTime = nine;
function updateTime() {
    c.clearRect(0, 0, canvasWidth, canvasHeight);
    drawClock();
    //Only arc
    c.beginPath();
    c.moveTo(x, y);
    c.arc(x,y, circleRadius-1, startTime, startTime + oneHour, false);
    c.fillStyle = "red";
    c.fill();

    //arc to cover inner circle
    c.beginPath();
    c.arc(x, y, circleRadius*0.5, 0, Math.PI*2, false);
    c.fillStyle='whitesmoke';
    c.fill();

    // Dot at center
    c.beginPath();
    c.arc(x, y, circleRadius * 0.025, 0, Math.PI*2, false);
    c.fillStyle='black';
    c.fill();

}

function increment() {
    startTime += changeTime;
    console.log("incremented");
    updateTime();
}

function deIncrement() {
    startTime -= changeTime;
    console.log("de-incremented");
    updateTime();
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
updateTime();