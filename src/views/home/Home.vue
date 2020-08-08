<template>
    <div id="home" class="wrapper" ref="wrapper">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control :titles="['流行','新款','样式']" @tabClick='tabClick' ref="tabControlOffsetTop1"  class="tabcontrol" v-show="isTopFixed"></tab-control>
      <scroll class="content" ref="scroll" :probe-type='3' @scroll="contentScroll" :pull-up-load='true' @pullingUp='loadMore'>
        <home-swiper :banner="banner" @swiperImgLoad='swiperImgLoad'/>
        <recommend-view :recommend="recommend"/>
        <feature-view />
        <tab-control :titles="['流行','新款','样式']" @tabClick='tabClick' ref="tabControlOffsetTop2" ></tab-control>
        <good-list :goods="showGoods" /> 
      </scroll>
    </div>    
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/navbar/NavBar'
  import TabControl from 'components/tabControl/TabControl'
  import GoodList from 'components/goods/GoodList'
  import Scroll from 'components/scroll/Scroll'
 
  import { getHomeMultidata,getHomeGoods } from "network/home"
  import {debounce} from 'common/utils'
  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll
    },
    data() {
      return {
        banner: [],
        recommend: [],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',
        topOffsetTop:0,
        isTopFixed:false,
        saveY:0
      }
    },
    computed:{
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
   created(){
       this.getHomeMultidata(),
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
      },
      mounted(){
        // window.addEventListener('scroll',this.scrollToTop)
         // 监听item图片加载完成
         const refresh = debounce(this.$refs.scroll.refresh,100)
          this.$bus.$on('homeItemImgLoad',() => {
            refresh()
          })
      },
      destroyed(){
        // window.removeEventListener('scroll',this.scrollToTop)
      },
      activated(){ 
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        // this.$refs.scroll.refresh()
      },
      deactivated(){
        this.saveY = this.$refs.scroll.scroll.y
      },
      methods:{
        //事件监听
        tabClick(index){
          switch(index){
            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType = 'new'
              break
            case 2:
              this.currentType = 'sell'
          }
          this.$refs.tabControlOffsetTop1.currentIndex = index
          this.$refs.tabControlOffsetTop2.currentIndex = index
        },
        contentScroll(position){
          this.isTopFixed = (-position.y) > this.topOffsetTop
        },
        loadMore(){
          this.getHomeGoods(this.currentType)
        },
        swiperImgLoad(){
           this.topOffsetTop  = this.$refs.tabControlOffsetTop2.$el.offsetTop;
          
        },

        // scrollToTop() {
        //     let scrollTop =window.pageYOffset ||document.documentElement.scrollTop ||document.body.scrollTop;
        //     if (scrollTop > window.outerHeight) { // 滚动距离大于页面高度true 小于false
        //       this.backToTop = true
        //     } else {
        //       this.backToTop = false
        //     }
        //     this.saveY = scrollTop
        //   },
        // backTop() {
        //   let back = setInterval(() => {
        //     if (document.body.scrollTop || document.documentElement.scrollTop) {
        //       document.body.scrollTop -= 100;
        //       document.documentElement.scrollTop -= 100;
        //     } else {
        //       clearInterval(back);
        //     }
        //   });
        //},



        // 网络请求
        getHomeMultidata(){
           getHomeMultidata().then(res => {
              this.banner = res.data.banner.list;
              this.recommend = res.data.recommend.list;
            })
        },
        getHomeGoods(type){
          const page = this.goods[type].page+1 // 请求数据
          getHomeGoods(type,page).then(res => {
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1 // 翻页

            this.$refs.scroll.finishPullUp() // 多次上拉加载更多
          })
        }
      }
    }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    /* vh 视口高度 */
  }

  .home-nav {
    background-color:pink;
    color: #fff;
    /* 原生JS滚动设置导航条定位
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
  }


  /* .item{
    position: sticky;
    top: 42px;
    z-index: 9;
  } */


  .content{
    /* height: calc(100% - 93px);
    calc 中间有空格 
    overflow: hidden;
    margin-top: 44px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
  .tabcontrol{
    position: relative;
    z-index: 9;
  }
</style>
