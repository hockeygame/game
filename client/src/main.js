import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


let canvas = document.getElementById("game_window");
let ctx = canvas.getContext("2d");

var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

// First paddle
var paddleHeightH = 10;
var paddleWidthH = 75;

var paddleX1 = (canvas.width-paddleWidthH)/2;
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// function keyDownHandler(e) {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = true;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = true;
//     }
// }

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    } else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    } else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

// function keyUpHandler(e) {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = false;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = false;
//     } 
// }

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    } else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    } else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}


function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX1, canvas.height-paddleHeightH, paddleWidthH, paddleHeightH);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


// Second Paddle
var paddleX2 = (canvas.width-paddleWidthH)/2;
// var rightPressed = false;
// var leftPressed = false;

// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);

// function keyDownHandler(e) {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = true;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = true;
//     }
// }

// function keyUpHandler(e) {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = false;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = false;
//     }
// }

function drawPaddle2() {
    ctx.beginPath();
    ctx.rect(paddleX2, 0, paddleWidthH, paddleHeightH);
    ctx.fillStyle = "#00ff00";
    ctx.fill();
    ctx.closePath();
}

///////////////////////////////////////////////
// Paddle 3 & 4
var paddleHeightV = 75;
var paddleWidthV = 10;

// Third paddle
var paddleY3 = (canvas.height-paddleHeightV)/2;
var upPressed = false;
var downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// function keyDownHandler(e) {
//     if(e.key == "Up" || e.key == "ArrowUp") {
//         upPressed = true;
//     }
//     else if(e.key == "Down" || e.key == "ArrowDown") {
//         downPressed = true;
//     }
// }

// function keyUpHandler(e) {
//     if(e.key == "Up" || e.key == "ArrowUp") {
//         upPressed = false;
//     }
//     else if(e.key == "Down" || e.key == "ArrowDown") {
//         downPressed = false;
//     }
// }

function drawPaddle3() {
    ctx.beginPath();
    ctx.rect(0, paddleY3, paddleWidthV, paddleHeightV);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
}

// Fourth paddle
var paddleY4 = (canvas.height-paddleHeightV)/2;
// var rightPressed = false;
// var leftPressed = false;

// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);

// function keyDownHandler(e) {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = true;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = true;
//     }
// }

// function keyUpHandler(e) {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = false;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = false;
//     }
// }

function drawPaddle4() {
    ctx.beginPath();
    ctx.rect(canvas.width-paddleWidthV, paddleY4, paddleWidthV, paddleHeightV);
    ctx.fillStyle = "#ffff00";
    ctx.fill();
    ctx.closePath();
}

/////////////////////////////////////////////////////////

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawPaddle2();
    drawPaddle3();
    drawPaddle4();

    if(x + dx < ballRadius) {
        if(y > paddleY3 && y < paddleY3 + paddleHeightV) {
            dx = -dx;
        }
        else {
            alert("GAME OVER from Paddle 3");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }
    if(x + dx > canvas.width-ballRadius) {
        if(y > paddleY4 && y < paddleY4 + paddleHeightV) {
            dx = -dx;
        }
        else {
            alert("GAME OVER from Paddle 4");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }
    if(y + dy < ballRadius) {
        if(x > paddleX2 && x < paddleX2 + paddleWidthH) {
            dy = -dy;
        }
        else {
            alert("GAME OVER from Paddle 2");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX1 && x < paddleX1 + paddleWidthH) {
            dy = -dy;
        }
        else {
            alert("GAME OVER from Paddle 1");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }
    
    if(rightPressed && paddleX1 < canvas.width-paddleWidthH) {
        paddleX1 += 7;
    } else if(leftPressed && paddleX1 > 0) {
        paddleX1 -= 7;
    }

    if(rightPressed && paddleX2 < canvas.width-paddleWidthH) {
        paddleX2 += 7;
    } else if(leftPressed && paddleX2 > 0) {
        paddleX2 -= 7;
    }

    if(upPressed && paddleY3 < canvas.height-paddleHeightV) {
        paddleY3 -= 7;
    } else if(downPressed && paddleY3 > 0) {
        paddleY3 += 7;
    }
    
    if(upPressed && paddleY4 < canvas.height-paddleHeightV) {
        paddleY4 -= 7;
    } else if(downPressed && paddleY4 > 0) {
        paddleY4 += 7;
    }

    x += dx;
    y += dy;
}

var interval = setInterval(draw, 10);

// let paddle_sprite = document.getElementById("paddle");
// let ball_sprite = document.getElementById("ball");

// let x = canvas.width/2;
// let y = canvas.height-48;
// let dx = 0;
// let dy = 0;
// let ball_rad = 12;

// let paddle_width = 80;
// let paddle_height = 19;
// let paddle_x = (canvas.width-paddle_width) / 2;
// let rightPressed = false;
// let leftPressed = false;
// function draw_ball() {
//     ctx.drawImage(ball_sprite, x - ball_rad, y - ball_rad);
// }
// function draw_paddle() {
//     ctx.drawImage(paddle_sprite, paddle_x, canvas.height-paddle_height);
// }
// function win_screen() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     dx = 0;
//     dy = 0;
//     draw_ball();
//     draw_paddle();
//     ctx.font = '36px Roboto Mono, monospace';
//     ctx.fillStyle = "#FFFFFF";
//     ctx.fillText("You Win!", 218, canvas.height / 2 - 10);
// }
// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);

// function keyDownHandler(e) {
//     if(e.key == "Left" || e.key == "ArrowLeft") leftPressed = true;
//     else if(e.key == "Right" || e.key == "ArrowRight") rightPressed = true;
// }

// function keyUpHandler(e) {
//     if(e.key == "Left" || e.key == "ArrowLeft") leftPressed = false;
//     else if(e.key == "Right" || e.key == "ArrowRight") rightPressed = false;
// }
// function dx_adjust() {
//     if(x <= paddle_x + 4){
//         return -3
//     }
//     if(x > paddle_x + 4 && x <= paddle_x + 16){
//         return -2
//     }
//     if(x > paddle_x + 16 && x <= paddle_x + 32){
//         return -1
//     }
//     if(x > paddle_x + 32 && x <= paddle_x + 48){
//         return 0
//     }
//     if(x > paddle_x + 48 && x <= paddle_x + 64){
//         return 1
//     }
//     if(x > paddle_x + 64 && x <= paddle_x + 76){
//         return 2
//     }
//     if(x > paddle_x + 76){
//         return 3
//     }
// }
// function render() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   // if(score === brick_row_count * brick_col_count * 2){
//   //     win_screen();
//   // }

//   // draw_bricks();
//   // detect_collision();
//   draw_ball();
//   x += dx;
//   y += dy;
//   if(x + dx > canvas.width - ball_rad || x + dx < ball_rad) {
//       dx = -dx;
//   }
//   if(y + dy < ball_rad) {
//       dy = -dy;
//   }
//   if(y + dy > canvas.height - ball_rad - paddle_height + 6 && x > paddle_x - 3 && x < paddle_x + paddle_width + 3) {
//       dy = -dy;
//       let ddx = dx_adjust()           
//       dx += ddx;
//   }
//   // else if(y + dy > canvas.height - ball_rad + 6){
//   //     gameover_screen();
//   //     clearInterval(run_game);
//   // }

//   draw_paddle();
//   if(leftPressed && paddle_x > -4) {
//       paddle_x -= 6;
//   }
//   else if(rightPressed && paddle_x < (canvas.width - paddle_width + 4)) {
//       paddle_x += 6;
//   }
//   var run_game = setInterval(render, 10);

// }

render()