const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const player = {
    x: 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: "#fff",
    dy: 0
};

const computer = {
    x: canvas.width - 20,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: "#fff",
    dy: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    dx: 5,
    dy: 5,
    color: "#fff"
};

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawNet() {
    for (let i = 0; i < canvas.height; i += 15) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, "#fff");
    }
}

function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = "45px Arial";
    context.fillText(text, x, y);
}

function movePaddle(paddle, dy) {
    paddle.y += dy;
    if (paddle.y < 0) paddle.y = 0;
    if (paddle.y + paddle.height > canvas.height) paddle.y = canvas.height - paddle.height;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
    ball.speed = 5;
}

function update() {
    movePaddle(player, player.dy);
    movePaddle(computer, ball.dy);

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    let playerCollision = ball.x - ball.radius < player.x + player.width && ball.y + ball.radius > player.y && ball.y - ball.radius < player.y + player.height;
    let computerCollision = ball.x + ball.radius > computer.x && ball.y + ball.radius > computer.y && ball.y - ball.radius < computer.y + computer.height;

    if (playerCollision || computerCollision) {
        ball.dx = -ball.dx;
        ball.speed += 0.5;
    }

    if (ball.x - ball.radius < 0) {
        // Puntuación para el computador
        resetBall();
    }

    if (ball.x + ball.radius > canvas.width) {
        // Puntuación para el jugador
        resetBall();
    }
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawNet();
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") player.dy = -8;
    else if (event.key === "ArrowDown") player.dy = 8;
});

document.addEventListener("keyup", () => {
    player.dy = 0;
});

gameLoop();