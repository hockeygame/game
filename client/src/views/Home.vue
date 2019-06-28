<template>
  <div class="home">
  <canvas id="game_window" width="600" height="600"></canvas>
  <div class="sprites">
            <img src="../assets/test_ball.png" width="24" id="ball" >
            <img src="../assets/test_paddle.png" width="80"  id="paddle">
            <img src="../assets/test_paddle.png" width="80"  id="paddle2">

    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}


</script>
