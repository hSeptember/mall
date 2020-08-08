<template>
  <div class="all">
      <swiper>
          <swiper-item v-for="(item,index) in topImages" :key="index">
                <img :src="item" alt="">
          </swiper-item>
      </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/swiper/index'
export default {
    props:{
       topImages:{
           type:Array,
            default(){
            return []
            }
       }
    },
    components:{
        Swiper,
        SwiperItem
    }
}
</script>

<style>
.all{
    height: 300px;
    overflow: hidden;
}
</style>