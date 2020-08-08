<template>
  <div class="detail-nav-bar">
      <nav-bar >
         <div slot="left" class="back" @click="backClick">
             <img src="~assets/img/common/back.svg" alt=""></div> 
        <div slot="center" class="title">
        <div v-for="(item,index) in title" :key='index' class="item" 
        :class='{active:index==currentIndex}'
        @click="itemClick(index)"
        >{{item}}</div>    
      </div></nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/navbar/NavBar'
export default {
    components:{
        NavBar
    },
    data(){
        return{
            title:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex = index
            this.$emit('titleClick',index)
        },
        backClick(){
            this.$router.back()
        }
    }
}
</script>

<style>
.title{
    display: flex;
    font-size: 13px;
}
.item{
     flex: 1;
}
.active{
    color: pink;
}
.back img{
    margin-top: 12px;
}
</style>