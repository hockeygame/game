<template>
  <div class="mt-5" style="height:100vh;">
    
    <div v-if="available">
      <input placeholder="Room Name" v-model="roomName" class="my-4 mx-3">
      <b-button @click="createRoom" class="mb-4">create Room</b-button>
    </div>
    <div style="height:100vh; background-color:#F4FD7F">
      <div class="container">
        <div class="row">
          <Room v-for="(room,index) in rooms" :room="room" :available="available" class="col-sm-4 my-2" :key="index"></Room>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { db } from "@/main.js";
import Room from "@/components/roomCard.vue";

export default {
  name: "RoomPage",
  data() {
    return {
      rooms: [],
      playerId: "",
      playerName: "",
      available: true,
      roomName: ""
    };
  },
  components: { Room },
  methods: {
    createRoom() {
      db.collection("rooms").add({
        title: this.roomName,
        players: {
          [this.playerId]: {
            totalDuit: 0,
            playerId: this.playerId,
            name: this.playerName
          }
        },
        creator: this.playerId,
        status: "pending",
        sandbox: []
      });
      this.roomName = "";
    }
  },
  created() {
    console.log(db);
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
          if (Object.keys(data.players).includes(this.playerId)) {
            this.$router.push(`/games/${data.id}`);
            console.log(data.id);
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
