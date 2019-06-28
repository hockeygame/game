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

let paddle_sprite = document.getElementById("paddle");
let paddle_sprite2 = document.getElementById("paddle2");

let ball_sprite = document.getElementById("ball");


let x = canvas.width / 2;
let y = canvas.height - 48;
let dx = 0.01;
let dy = 0.01;
let ball_rad = 12;

let paddle_width = 80;
let paddle_height = 19;

let paddle_x = (canvas.width - paddle_width) / 2;
let paddle2_x = (canvas.width - paddle_width) / 2;

let rightPressed = false;
let leftPressed = false;

let rightPressedP2 = false;
let leftPressedP2 = false;

function draw_ball() {
  ctx.drawImage(ball_sprite, x - ball_rad, y - ball_rad);
}
function draw_paddle() {
  ctx.drawImage(paddle_sprite, paddle_x, canvas.height - paddle_height);
}
function draw_paddle2() {
  ctx.drawImage(paddle_sprite2, paddle2_x, paddle_height);
}
function win_screen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dx = 0;
  dy = 0;
  draw_ball();
  draw_paddle();
  ctx.font = '36px Roboto Mono, monospace';
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("You Win!", 218, canvas.height / 2 - 10);
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "ArrowLeft") leftPressed = true;
  else if (e.key == "a") leftPressedP2 = true;
  else if (e.key == "ArrowRight") rightPressed = true;
  else if (e.key == "d") rightPressedP2 = true;
}

function keyUpHandler(e) {
  if (e.key == "ArrowLeft") leftPressed = false;
  else if (e.key == "a") leftPressedP2 = false;
  else if (e.key == "ArrowRight") rightPressed = false;
  else if (e.key == "d") rightPressedP2 = false;

}
function dx_adjust() {
  if (y <= canvas.height - paddle_height) {
    if (x <= paddle_x + 4) {
      return -0.02
    }
    if (x > paddle_x + 4 && x <= paddle_x + 16) {
      return -0.01
    }
    if (x > paddle_x + 16 && x <= paddle_x + 32) {
      return -0.005
    }
    if (x > paddle_x + 32 && x <= paddle_x + 48) {
      return 0
    }
    if (x > paddle_x + 48 && x <= paddle_x + 64) {
      return 0.005
    }
    if (x > paddle_x + 64 && x <= paddle_x + 76) {
      return 0.01
    }
    if (x > paddle_x + 76) {
      return 0.02
    }
  } else if( y >= paddle_height){
    if (x <= paddle2_x + 4) {
      return -0.02
    }
    if (x > paddle2_x + 4 && x <= paddle2_x + 16) {
      return -0.01
    }
    if (x > paddle2_x + 16 && x <= paddle2_x + 32) {
      return -0.005
    }
    if (x > paddle2_x + 32 && x <= paddle2_x + 48) {
      return 0
    }
    if (x > paddle2_x + 48 && x <= paddle2_x + 64) {
      return 0.005
    }
    if (x > paddle2_x + 64 && x <= paddle2_x + 76) {
      return 0.01
    }
    if (x > paddle2_x + 76) {
      return 0.02
    }
  }
}
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // if(score === brick_row_count * brick_col_count * 2){
  //     win_screen();
  // }

  // draw_bricks();
  // detect_collision();
  draw_ball();
  x += dx;
  y += dy;
  if (x + dx > canvas.width - ball_rad || x + dx < ball_rad) {
    dx = -dx;
  }
  if (y + dy < ball_rad) {
    dy = -dy;
  }
  if (y + dy > canvas.height - ball_rad - paddle_height + 6 && x > paddle_x - 3 && x < paddle_x + paddle_width + 3) {
    dy = -dy;
    let ddx = dx_adjust()
    dx += ddx;
  } else if( y + dy < ball_rad + paddle_height +6 && x > paddle2_x - 3 && x < paddle2_x + paddle_width + 3 ){
    dy = -dy;
    let ddx = dx_adjust()
    dx += ddx;

  }
  // else if(y + dy > canvas.height - ball_rad + 6){
  //     gameover_screen();
  //     clearInterval(run_game);
  // }
  draw_paddle2()
  draw_paddle();
  if (leftPressed && paddle_x > -4) {
    paddle_x -= 0.1;
  }
  else if (rightPressed && paddle_x < (canvas.width - paddle_width + 4)) {
    paddle_x += 0.1;
  }
  else if (leftPressedP2 && paddle2_x > -4) {
    paddle2_x -= 0.1;
  }
  else if (rightPressedP2 && paddle2_x < (canvas.width - paddle_width + 4)) {
    paddle2_x += 0.1;
  }
  var run_game = setInterval(render, 10);

}
render()