<template>
  <div class="tab-control">
      <div v-for="(item,index) in titles" :key='index' class="item" :class="{active:index===currentIndex}" @click="itemClick(index)"> 
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
       return{
            currentIndex:0
       }
    },
    methods:{
        itemClick(index){
            this.currentIndex = index
            this.$emit('tabClick',index)
        }
    }
}
</script>

<style>
.tab-control{
    height: 40px;
    line-height: 40px;
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
}
.item{
   flex:1;
}
.active span{
  border-bottom: 2px solid pink;
  padding: 5px;
}
.active{
    color: pink;
}
</style>