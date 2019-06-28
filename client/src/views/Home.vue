<template>
  <div class="home">
    <canvas id="game_window" width="600" height="600"></canvas>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import db from "@/firebase";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      playerNumber: "",
      dataPlayers: {},
      name: "",
      playerId: "",
      ballX: 300,
      ballY: 570
    };
  },
  created() {
    this.name = localStorage.getItem("name");
    this.playerId = localStorage.getItem("playerId");
    db.collection("rooms")
      .doc(this.$route.params.id)
      .onSnapshot(doc => {
        let data = doc.data();
        if(data)
        // this.ballX = data.ballX;
        // this.ballY = data.ballY;
        if (data.players.player1.playerId === this.playerId) {
          this.playerNumber = "player1";
        } else if (data.players.player2.playerId === this.playerId) {
          this.playerNumber = "player2";
        } else if (data.players.player3.playerId === this.playerId) {
          this.playerNumber = "player3";
        } else if (data.players.player4.playerId === this.playerId) {
          this.playerNumber = "player4";
        }
        // console.log(this.playerNumber)
        console.log(doc, "doc");
        console.log(doc.data(), "doc");
        this.dataPlayers = doc.data().players;
        // let data = doc.data();
        // this.tempData = data;
        // this.rivals = Object.values(data.players);
        // this.rivals = this.rivals.filter(
        //   item => item.id != localStorage.playerId
        // );
        // this.sandbox = data.sandbox;
        // if (data.status == "ready") {
        //   this.$router.push("/");
        // }
      });
  },
  mounted() {
    let canvas = document.getElementById("game_window");
    let ctx = canvas.getContext("2d");

    var ballRadius = 10;
    var dx = 2;
    var dy = -2;

    // First paddle
    var paddleHeightH = 10;
    var paddleWidthH = 75;

    var paddleX1 = (canvas.width - paddleWidthH) / 2;
    var rightPressed = false;
    var leftPressed = false;

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
      if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
      } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
      } else if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
      } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
      } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
      } else if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
      } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
      }
    }

    const drawPaddle = () => {
      ctx.beginPath();
      ctx.rect(
        this.dataPlayers.player1.x,
        this.dataPlayers.player1.y,
        paddleWidthH,
        paddleHeightH
      );
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    };

    // Second Paddle
    var paddleX2 = (canvas.width - paddleWidthH) / 2;

    const drawPaddle2 = () => {
      ctx.beginPath();
      ctx.rect(
        this.dataPlayers.player2.x,
        this.dataPlayers.player2.y,
        paddleWidthH,
        paddleHeightH
      );
      ctx.fillStyle = "#00ff00";
      ctx.fill();
      ctx.closePath();
    };

    ///////////////////////////////////////////////
    // Paddle 3 & 4
    var paddleHeightV = 75;
    var paddleWidthV = 10;

    // Third paddle
    var paddleY3 = (canvas.height - paddleHeightV) / 2;
    var upPressed = false;
    var downPressed = false;

    const drawPaddle3 = () => {
      ctx.beginPath();
      ctx.rect(
        this.dataPlayers.player3.x,
        this.dataPlayers.player3.y,
        paddleWidthV,
        paddleHeightV
      );
      ctx.fillStyle = "#ff0000";
      ctx.fill();
      ctx.closePath();
    };

    // Fourth paddle
    var paddleY4 = (canvas.height - paddleHeightV) / 2;

    const drawPaddle4 = () => {
      ctx.beginPath();
      ctx.rect(
        this.dataPlayers.player4.x,
        this.dataPlayers.player4.y,
        paddleWidthV,
        paddleHeightV
      );
      ctx.fillStyle = "#ffff00";
      ctx.fill();
      ctx.closePath();
    };
    const speed_adjust = (c, paddle_c) => {
      if (c <= paddle_c + 4) {
        return -3;
      }
      if (c > paddle_c + 4 && c <= paddle_c + 16) {
        return -2;
      }
      if (c > paddle_c + 16 && c <= paddle_c + 32) {
        return -1;
      }
      if (c > paddle_c + 32 && c <= paddle_c + 48) {
        return 0;
      }
      if (c > paddle_c + 48 && c <= paddle_c + 64) {
        return 1;
      }
      if (c > paddle_c + 64 && c <= paddle_c + 76) {
        return 2;
      }
      if (c > paddle_c + 76) {
        return 3;
      }
    };
    /////////////////////////////////////////////////////////

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(this.ballX, this.ballY, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      if (this.dataPlayers.player1.alive) {
        drawPaddle();
      }
      if (this.dataPlayers.player2.alive) {
        drawPaddle2();
      }
      if (this.dataPlayers.player3.alive) {
        drawPaddle3();
      }
      if (this.dataPlayers.player4.alive) {
        drawPaddle4();
      }

      if (this.ballX + dx < ballRadius) {
        if (
          !this.dataPlayers.player3.alive ||
          (this.ballY > this.dataPlayers.player3.y &&
            this.ballY < this.dataPlayers.player3.y + paddleHeightV)
        ) {
          dx = -dx;
          if (this.dataPlayers.player3.alive) {
            let ddy = speed_adjust(this.ballY, this.dataPlayers.player3.y);
            dy += ddy;
          }
        } else {
          console.log("GAME OVER for Paddle 3");
          this.dataPlayers.player3.alive = false;
          if (this.playerNumber === "player3") {
            db.collection("rooms")
              .doc(this.$route.params.id)
              .update({
                ["players." + this.playerNumber]: this.dataPlayers[
                  this.playerNumber
                ]
              });
          }
          // paddleY3_status = false;
        }
      }
      if (this.ballX + dx > canvas.width - ballRadius) {
        if (
          !this.dataPlayers.player4.alive ||
          (this.ballY > this.dataPlayers.player4.y &&
            this.ballY < this.dataPlayers.player4.y + paddleHeightV)
        ) {
          dx = -dx;
          if (this.dataPlayers.player4.alive) {
            let ddy = speed_adjust(this.ballY, this.dataPlayers.player4.y);
            dy += ddy;
          }
        } else {
          console.log("GAME OVER for Paddle 4");
          this.dataPlayers.player4.alive = false;
          if (this.playerNumber === "player4") {
            db.collection("rooms")
              .doc(this.$route.params.id)
              .update({
                ["players." + this.playerNumber]: this.dataPlayers[
                  this.playerNumber
                ]
              });
          }
          // paddleY4_status = false;
        }
      }
      if (this.ballY + dy < ballRadius) {
        if (
          !this.dataPlayers.player2.alive ||
          (this.ballX > this.dataPlayers.player2.x &&
            this.ballX < this.dataPlayers.player2.x + paddleWidthH)
        ) {
          dy = -dy;
          if (this.dataPlayers.player2.alive) {
            let ddx = speed_adjust(this.ballX, this.dataPlayers.player2.x);
            dx += ddx;
          }
        } else {
          console.log("GAME OVER for Paddle 2");
          this.dataPlayers.player2.alive = false;
          if (this.playerNumber === "player2") {
            db.collection("rooms")
              .doc(this.$route.params.id)
              .update({
                ["players." + this.playerNumber]: this.dataPlayers[
                  this.playerNumber
                ]
              });
          }
          // paddleX2_status = false;
        }
      } else if (this.ballY + dy > canvas.height - ballRadius) {
        if (
          !this.dataPlayers.player1.alive ||
          (this.ballX > this.dataPlayers.player1.x &&
            this.ballX < this.dataPlayers.player1.x + paddleWidthH)
        ) {
          dy = -dy;
          if (this.dataPlayers.player1.alive) {
            let ddx = speed_adjust(this.ballX, this.dataPlayers.player1.x);
            dx += ddx;
          }
        } else {
          console.log("GAME OVER for Paddle 1");
          this.dataPlayers.player1.alive = false;
          if (this.playerNumber === "player1") {
            db.collection("rooms")
              .doc(this.$route.params.id)
              .update({
                ["players." + this.playerNumber]: this.dataPlayers[
                  this.playerNumber
                ]
              });
          }
          // paddleX1_status = false;
        }
      }

      if (
        rightPressed &&
        paddleX1 < canvas.width - paddleWidthH &&
        this.playerNumber === "player1"
      ) {
        this.dataPlayers[this.playerNumber].x += 7;
        db.collection("rooms")
          .doc(this.$route.params.id)
          .update({
            ["players." + this.playerNumber]: this.dataPlayers[
              this.playerNumber
            ]
          });
      } else if (
        leftPressed &&
        paddleX1 > 0 &&
        this.playerNumber === "player1"
      ) {
        this.dataPlayers[this.playerNumber].x -= 7;
        db.collection("rooms")
          .doc(this.$route.params.id)
          .update({
            ["players." + this.playerNumber]: this.dataPlayers[
              this.playerNumber
            ]
          });
      }

      if (
        rightPressed &&
        paddleX2 < canvas.width - paddleWidthH &&
        this.playerNumber === "player2"
      ) {
        this.dataPlayers[this.playerNumber].x += 7;
        db.collection("rooms")
          .doc(this.$route.params.id)
          .update({
            ["players." + this.playerNumber]: this.dataPlayers[
              this.playerNumber
            ]
          });
      } else if (
        leftPressed &&
        paddleX2 > 0 &&
        this.playerNumber === "player2"
      ) {
        this.dataPlayers[this.playerNumber].x -= 7;
        db.collection("rooms")
          .doc(this.$route.params.id)
          .update({
            ["players." + this.playerNumber]: this.dataPlayers[
              this.playerNumber
            ]
          });
      }

      if (
        upPressed &&
        paddleY3 < canvas.height - paddleHeightV &&
        this.playerNumber === "player3"
      ) {
        this.dataPlayers[this.playerNumber].y -= 7;
        db.collection("rooms")
          .doc(this.$route.params.id)
          .update({
            ["players." + this.playerNumber]: this.dataPlayers[
              this.playerNumber
            ]
          });
      } else if (
        downPressed &&
        paddleY3 > 0 &&
        this.playerNumber === "player3"
      ) {
        this.dataPlayers[this.playerNumber].y += 7;
        db.collection("rooms")
          .doc(this.$route.params.id)
          .update({
            ["players." + this.playerNumber]: this.dataPlayers[
              this.playerNumber
            ]
          });
      }
      if (
        upPressed &&
        paddleY4 < canvas.height - paddleHeightV &&
        this.playerNumber === "player4"
      ) {
        this.dataPlayers[this.playerNumber].y -= 7;
        db.collection("rooms")
          .doc(this.$route.params.id)
          .update({
            ["players." + this.playerNumber]: this.dataPlayers[
              this.playerNumber
            ]
          });
      } else if (
        downPressed &&
        paddleY4 > 0 &&
        this.playerNumber === "player4"
      ) {
        this.dataPlayers[this.playerNumber].y += 7;
        db.collection("rooms")
          .doc(this.$route.params.id)
          .update({
            ["players." + this.playerNumber]: this.dataPlayers[
              this.playerNumber
            ]
          });
      }

        this.ballX += dx;
        this.ballY += dy;
        // db.collection("rooms")
        //   .doc(this.$route.params.id)
        //   .update({
        //     ballX: this.ballX
        //   });
        // db.collection("rooms")
        //   .doc(this.$route.params.id)
        //   .update({
        //     ballY: this.ballY
        //   });
      
    };

    var interval = setInterval(draw, 10);
  }
};
</script>
