var canvas = document.querySelector('canvas');
canvasWidth = canvas.width = window.innerWidth-4;
canvasHeight = canvas.height = window.innerHeight-4;
var c = canvas.getContext('2d');

var centerWidth = canvasWidth / 2;
var centerHeight = canvasHeight / 2;

var x = centerWidth;// x represents the centerpoint of the canvas
var y = centerHeight;// y represents the centerpoint of the canvas

//Mouse info
var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

var red = 0;
var green = 0;
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvasWidth, canvasHeight);

    c.beginPath();
    c.moveTo(x, y);
    c.arc(x-400,y, 200, 0, Math.PI, false);
    c.fillStyle = "rgba(255, 0, 0, 0.5)";
    c.fill();
    //console.log(mouse.x + "," + mouse.y);

    if(c.isPointInPath(mouse.x, mouse.y)) {
        console.log("The mouse is in the red circle");
        red = 255;
    } else {
        console.log("The mouse is not in the red circle")
        red = 0;
    }

    c.beginPath();
    c.moveTo(x, y);
    c.arc(x+400,y, 200, 0, Math.PI, false);
    c.fillStyle = "rgba(0, 255, 0, 0.5)";
    c.fill();
    //console.log(mouse.x + "," + mouse.y);

    if(c.isPointInPath(mouse.x, mouse.y)) {
        console.log("The mouse is in the green circle");
        green = 255;
    } else {
        console.log("The mouse is not in the green circle")
        green = 0;
    }

    c.beginPath();
    c.moveTo(x, y);
    c.arc(x,y-100, 200, Math.PI, 0, false);
    c.fillStyle = "rgba(" + red + ", " + green + ", 0, 0.5)";
    c.fill();
    //console.log(mouse.x + "," + mouse.y);
    
}
animate();