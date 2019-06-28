<template>
    <div>
        <b-card v-if="Object.keys(room.players).includes(playerThis)" :title='room.title' :sub-title="room.status" style="background-color:#ADFF2F">
            {{playerNumbers}}
            <b-card-text v-for='(player,index) in players' :key="index">
                player{{index+1}}: {{room.players[player].name}}, <b v-if="player === room.creator">(admin)</b>
            </b-card-text>
            <b-button v-if="room.creator === playerId && room.status === 'ready'" class='mx-1' @click="start">Start</b-button>
            <b-button v-if='available' class='mx-1' @click="join">Join</b-button>
            <b-button class='mx-1'  @click="leave">Leave</b-button>
        </b-card>
        <b-card v-else :title='room.title' :sub-title="room.status">
            {{playerNumbers}}
            <b-card-text v-for='(player,index) in players' :key="index">
                player{{index+1}}:  {{room.players[player].name}} <b v-if="player === room.creator">(admin)</b>
            </b-card-text>
            <b-button v-if="room.creator === playerId && room.status === 'ready'" class='mx-1' @click="start">Start</b-button>
            <b-button v-if='available' class='mx-1' @click="join">Join</b-button>
            <b-button class='mx-1' @click="leave">Leave</b-button>
        </b-card>
    </div>
</template>

<script>


import firebase from 'firebase/app'
import 'firebase/firestore'
import db from '@/firebase.js'
export default{
    name:'roomCard',
    props:['room', 'available'],
    data(){
        return{
            playerId:'',
            playerName:'',
            isAdmin : false,
            playerThis: '',
        }
    },
    methods:{
        start(){
            console.log(this.room.status)
            if(this.room.status === 'ready'){
                db
                    .collection("rooms")
                    .doc(this.room.id)
                    .update({
                        status:'playing'
                    })
            }
        },
        join(){
            console.log(this.available)
            if(Object.keys(this.room.players).length <4){
                let players = this.room.players
                
                let count = Object.keys(this.room.players).length
                this.playerThis = 'player' + String(count+1);
                const  getX= ()=> {
                    if (this.playerThis === 'player2') {
                        return 262.5
                    } else if (this.playerThis === 'player3') {
                        return 0
                    } else if (this.playerThis === 'player4') {
                        return 590
                    }
                }
                const  getY= ()=>  {
                    if (this.playerThis === 'player2') {
                        return 0
                    } else if (this.playerThis === 'player3') {
                        return 262.5
                    } else if (this.playerThis === 'player4') {
                        return 262.5
                    }
                }
                localStorage.setItem('playerThis', this.playerThis)
                players['player' + String(count+1) ] = {
                    playerId: this.playerId,
                    name: this.playerName,
                    alive: true,
                    x: getX(),
                    y: getY(),
                }
                db
                    .collection("rooms")
                    .doc(this.room.id)
                    .update({
                        players
                    })
                if(Object.keys(this.room.players).length === 4){
                    db
                        .collection("rooms")
                        .doc(this.room.id)
                        .update({
                            status:'ready'
                        })
                    console.log('status ready')
                }    
            }
        },
        leave(){
            console.log(this.room.id)
            if(this.room.creator === this.playerId){
                db
                    .collection("rooms")
                    .doc(this.room.id)
                    .delete()
                    .then(()=>{
                        console.log(`successfully deleted room ${this.room.title}`)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            }else{
                db
                    .collection("rooms")
                    .doc(this.room.id)
                    .update({
                        ['players.' + this.playerThis]: firebase.firestore.FieldValue.delete(),
                        status:'pending'
                    })
            }
        }
    },
    computed:{
        players(){
            return Object.keys(this.room.players)
        },
        playerNumbers(){
            let numberOfPlayers = Object.keys(this.room.players).length + '/4'
            return numberOfPlayers
        }
    },
    watch:{

        
    },
    created(){
        console.log(this.available)
        this.playerId = localStorage.getItem('playerId')
        this.playerName = localStorage.getItem('name')
        console.log(this.playerId)
        if(this.playerId === this.room.creator){
            this.isAdmin=true 
        }
    }
}
</script>
