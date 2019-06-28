<template>
  <div class="home" >
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <audio autoplay> -->
      <!-- <source src="../assets/PriceTag.mp3" type="audio/mp3"> -->
      <!-- Your browser does not support the audio element. -->
    <!-- </audio> -->
    <b-container>
      <b-row class="justify-content-center">
        <register/>
      </b-row>
    </b-container>
  </div>
</template>

<style scoped>
  div .home {
    background: white;
  }
</style>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import draggable from 'vuedraggable';
import register from '@/components/register.vue';
export default {
  name: 'home',
  components: {
    // draggable,
    // HelloWorld,
    register
  },
  created() {
    if (localStorage.getItem('name') && localStorage.getItem('playerId')) {
      this.$router.push('/rooms');
    }
  },
  data () {
    return {
    }
  },
  methods: {
    
  }
}
</script>

