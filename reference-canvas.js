console.log('con test');

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//c.fillRect(x, y, width, height);
c.fillStyle = 'rgba(255, 0, 0, 0.5';
c.fillRect(100, 100, 100, 100);

c.fillStyle = 'rgba(0, 255, 0, 0.5';
c.fillRect(100, 400, 100, 100);

c.fillStyle = 'rgba(0, 0, 255, 0.5';
c.fillRect(400, 200, 100, 100);


//Line
c.beginPath();
// c.moveTo(x,y)
c.moveTo(50, 300);// invisible untill stroke is called
c.lineTo(300, 100);
c.lineTo(400, 300);// it really is like dragging a pen
c.strokeStyle = "#f45d34";
c.stroke();

//Arc / circle
//c.arc(int x, int y, int radius, float startAngle(in rad), float endAngle(also in rad),
//    bool(default=false) drawCounterClockwise);
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI*2, false);
// c.strokeStyle = 'blue';
// c.stroke();
for(var i=0; i<100; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI*2, false);
    c.strokeStyle = 'blue';
    c.stroke();
}