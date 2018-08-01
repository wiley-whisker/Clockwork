var canvas = document.querySelector('canvas');
canvasWidth = canvas.width = window.innerWidth-4;
canvasHeight = canvas.height = window.innerHeight-4;
var c = canvas.getContext('2d');

//Color array
var colorArray = [
    '#ff44ee',
    '#ee3399',
    '#22ff55'
];
console.log('Color array length: ' + colorArray.length);

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

//Circle object
function Circle(x, y, dx, dy, circleRadius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.circleRadius = circleRadius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.circleRadius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if (this.x + circleRadius > canvasWidth || this.x - circleRadius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + circleRadius > canvasHeight || this.y - circleRadius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //Interactivity
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                if(this.circleRadius < 20){
                    this.circleRadius += 0.5;
                }
        } else if(this.circleRadius > 2){
            this.circleRadius -= 2;
        }

        this.draw();
    }
}

var speed = 1;
var circleArray = [];
var arrayLength = 150;//Math.floor(Math.random() * 200);
console.log('There are ' + arrayLength + ' circles')

//declare circles
for(var i=0;i< arrayLength; i++) {
    var circleRadius = 2;
    var x = Math.random() * (canvasWidth - circleRadius * 2) + circleRadius;
    var y = Math.random() * (canvasHeight - circleRadius * 2) + circleRadius;
    var dx = (Math.random() - 0.5) * speed;// velocity
    var dy = (Math.random() - 0.5) * speed;
    circleArray.push(new Circle(x,y,dx,dy,circleRadius))
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvasWidth, canvasHeight);
    
    for(var i=0; i < circleArray.length; i++){
        circleArray[i].update();
    }
    
}
animate();
