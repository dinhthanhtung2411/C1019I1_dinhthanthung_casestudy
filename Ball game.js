let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
let x = canvas.width/2;
let y = canvas.height - 10;
let speedX = 2;
let speedY = -2;
let ballRadius = 10;
let paddleWidth = 75;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth)/2;
let paddleY = canvas.height - paddleHeight;
let speedPaddle = 5;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 5;
let brickColumnCount = 1;
let brickWidth = 70;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 50;
let score = 0;
let lives = 1;

let brick = []; //gach
for (let i = 0; i < brickColumnCount; i++){
    brick[i] = [];
    for (let j = 0; j < brickRowCount; j++){
        brick[i][j] = {x:0,y:0,status:1};
    }
}

document.addEventListener('keydown',keyDownHandler);
document.addEventListener('keyup',keyUpHandler);

function keyDownHandler(evt) {
    switch (evt.which) {
        case 39:
            rightPressed = true;
            break;
        case 37:
            leftPressed = true;
    }
}
function keyUpHandler(evt) {
    switch (evt.which) {
        case 39:
            rightPressed = false;
            break;
        case 37:
            leftPressed = false;
    }
}

function collisionDetection() {
    for (let i = 0; i < brickColumnCount; i++){
        for (let j = 0; j < brickRowCount; j++){
            let b = brick[i][j];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    speedY = -speedY;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount*brickColumnCount){
                        alert('You win !!');
                        clearInterval(run);
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    context.font = '16px Arial';
    context.fillStyle = 'black';
    context.fillText('Score: ' + score,8,20);
}

function drawBall() {
    context.beginPath();
    context.arc(x,y,ballRadius,0,2*Math.PI);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX,paddleY,paddleWidth,paddleHeight);
    context.fillStyle = '#d35d82';
    context.fill();
    context.closePath();
}
function drawLives() {
    context.font = '16px Arial';
    context.fillStyle = 'black';
    context.fillText('Lives: ' + lives,canvas.width-65,20);
}

function drawBrick() {
    for (let i = 0; i < brickColumnCount; i++){
        for (let j = 0; j < brickRowCount; j++){
            if (brick[i][j].status == 1){
                let brickX = (j * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (i * (brickHeight + brickPadding)) + brickOffsetTop;
                brick[i][j].x = brickX;
                brick[i][j].y = brickY;
                context.beginPath();
                context.rect(brickX,brickY,brickWidth,brickHeight);
                context.fillStyle = '#78b43d';
                context.fill();
                context.closePath();
                console.log('bx ' + brickX);
                console.log('by ' + brickY);
            }
        }
    }
}

function draw() {
    context.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();
    drawBrick();
    drawScore();
    drawLives();
    collisionDetection();
    if (x + speedX > canvas.width - ballRadius || x + speedX < ballRadius){
        speedX = -speedX;
    }

    if ( y + speedY < ballRadius){
        speedY = -speedY;
    }else if (y + speedY > canvas.height - ballRadius ){
        if (x > paddleX && x < paddleX + paddleWidth){
            speedY = -speedY;
        }else {
            lives--;
            if (lives == 0){
                clearInterval(run);
                alert('Game over !!');
                document.location.reload();
            } else {
                x = canvas.width/2;
                y = canvas.height - 30;
                paddleX = (canvas.width - paddleWidth)/2;
            }
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth){
        paddleX += speedPaddle;
    } else if (leftPressed && paddleX > 0){
        paddleX -= speedPaddle;
    }
    x += speedX;
    y += speedY;
}

let run = setInterval(draw,10);

