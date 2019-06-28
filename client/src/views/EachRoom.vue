<template>
    <div class='row justify-content-center'>
        <roomCard></roomCard>
    </div>
</template>

<script>
import roomCard from '@/components/RoomCard.vue'
export default{
    name:'EachRoom',
    components:{
        roomCard
    }
}
</script>