<template>
  <div class="goodsItem" @click='clickItem'>
      <img :src="showImage" alt="" @load="imgLoad">
      <div  class="goodsInfo">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <img src="~assets/img/common/collect.svg" alt="">
          <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        goodsItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
        showImage(){
            return (this.goodsItem.image || this.goodsItem.show.img)
        }
    },
    methods:{
        clickItem(){
           this.$router.push('./detail/' + this.goodsItem.iid)
        },
        imgLoad(){
            if(this.$route.path.indexOf('./home') !== -1){
                this.$bus.$emit('homeItemImgLoad')   // 事件总线
            }else if(this.$route.path.indexOf('./detail') !== -1){
                this.$bus.$emit('detailItemImgLoad')
            }
        }
    }
}
</script>

<style>
.goodsItem{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
}
.goodsItem img{
    width: 100%;
    border-radius: 5px;
}
.goodsInfo{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
}
.goodsInfo p{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
}
.goodsInfo .price{
    color: pink;
    margin-right: 20px;
}
.goodsInfo img{
    width: 15px;
    height: 12px;
}
</style>