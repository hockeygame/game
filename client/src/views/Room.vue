<template>
  <div class="mt-5" style="height:100vh;">
    <div>
      <h3>Free For All! {{playerId}}</h3>
      <div>
        <img
          src="https://static.boredpanda.com/blog/wp-content/uploads/2016/09/mother-bear-cubs-animal-parenting-fb2__700-png.jpg" style="height: 20%; width: 20%"
        >
      </div>
    </div>
    <div v-if="available">
      <input placeholder="Room Name" v-model="roomName" class="my-4 mx-3">
      <b-button @click="createRoom">create Room</b-button>
    </div>
    <div style="height:100vh; background-color:#00000">
      <div class="container">
        <div class="row">
          <Room v-for="(room,index) in rooms" :room="room" :available="available" class="col-sm-4 my-2" :key="index"></Room>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../firebase.js";
import Room from "@/components/RoomCard.vue";
export default {
  name: "RoomPage",
  data() {
    return {
      rooms: [],
      playerId: "",
      playerName: "",
      available: true,
      roomName: "",
      playerThis: ''
    };
  },
  components: { Room },
  methods: {
    createRoom() {
      db.collection("rooms").add({
        title: this.roomName,
        players: {
          ['player1']: {
            playerId: this.playerId,
            name: this.playerName,
            alive: true,
            x: 262.5,
            y: 590,
          }
        },
        creator: this.playerId,
        status: "pending",
      });
      this.roomName = "";
      localStorage.setItem('playerThis', 'player1');
      this.playerThis = 'player1'
    }
  },
  created() {
    if(!localStorage.getItem('playerId')){
      this.$router.push(`/`)
    }
    db.collection("rooms").onSnapshot(querySnapshot => {
      this.rooms = [];
      querySnapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        if (Object.keys(data.players).includes(this.playerId)) {
          this.available = false;
        } else {
          this.available = true;
        }
        if (data.status === "playing") {
          if (Object.keys(data.players).includes(this.playerThis)) {
            this.$router.push(`/games/${data.id}`);
          }
        }
        console.log(data);
        this.rooms.push(data);
      });
    });
    this.playerId = localStorage.getItem("playerId");
    this.playerName = localStorage.getItem("name");
    console.log(this.rooms);
  }
};
</script>