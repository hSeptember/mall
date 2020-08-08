<template>
     <scroll class="content" ref="scroll">
      <cart-list-item v-for='(item,index) in cartList' :key="index" :item-info=item></cart-list-item>
     </scroll>
</template>

<script>
import Scroll from 'components/scroll/Scroll'
import CartListItem from './CartListItem'
import { mapGetters } from 'vuex'
export default {
    components:{
        Scroll,
        CartListItem 
    },
    computed:{
        ...mapGetters(['cartList'])
    },
    actived(){
        this.$refs.scroll.refresh()
    }
}
</script>

<style  scoped>
  .content{
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 89px;
  }
</style>