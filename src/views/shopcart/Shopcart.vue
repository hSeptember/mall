<template>
  <div class="shopcart">
      <!-- 导航条 -->
      <nav-bar class="navbar"><div slot="center">购物街({{length}})</div></nav-bar>
      <!-- 商品列表 -->
      <cart-list></cart-list>
      <!-- 底部状态栏 -->
      <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import { mapGetters } from 'vuex'
export default {
    components:{
        NavBar,
        CartList,
        CartBottomBar
    },
    computed:{
      // 将getters转化为计算属性使用 两种语法 改名使用对象不改名数组
      //...mapGetters(['cartLength'])
      ...mapGetters({
        length:'cartLength'
      })
    }
}
</script>

<style scoped>
.navbar{
    background-color:pink;
    color: #fff;
    /* 原生JS滚动设置导航条定位
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
}
</style>>