var canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var ballColor="#0095DD";


var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall():void {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        ballColor='#'+Math.floor(Math.random()*16777215).toString(16);

    }
    if(y + dy < ballRadius) {
        dy = -dy;
        ballColor='#'+Math.floor(Math.random()*16777215).toString(16);
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            dy*=1.4;
            dx*=1.4;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 4;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 4;
    }
    if(rightPressed) {
        paddleX += 4;
    }
    else if(leftPressed) {
        paddleX -= 4;
    }
    x += dx;
    y += dy;
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}



var interval = setInterval(draw, 10);