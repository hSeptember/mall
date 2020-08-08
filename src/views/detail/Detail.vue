<template>
  <div class="detailAll">
      <detail-nav-bar class="navbar" @titleClick='titleClick' ref='nav'></detail-nav-bar>
      <scroll class="content" ref="scroll" :probe-type='3' @scroll="contentScroll">
        <detail-swiper :top-images='topImages'></detail-swiper>
        <detail-base-info :goods='goods' />
        <detail-shop-info :shop='shop' />
        <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad' />
        <detail-param-info :param-info='itemParam' ref="params" />
        <detail-comment-info :comment-info='commentInfo'  ref="comment" />
        <good-list :goods='recommends'  ref="picture"  />
      </scroll>
      <detail-bottom-bar @addToCart='addToCart'></detail-bottom-bar>
  </div>
</template>

<script>
import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
import DetailNavBar from './childdetail/DetailNavBar'
import DetailSwiper from './childdetail/DetailSwiper'
import DetailBaseInfo from './childdetail/DetailBaseInfo'
import DetailShopInfo from './childdetail/DetailShopInfo'
import DetailGoodsInfo from './childdetail/DetailGoodsInfo'
import DetailParamInfo from './childdetail/DetailParamInfo'
import DetailCommentInfo from './childdetail/DetailCommentInfo'
import DetailBottomBar from './childdetail/DetailBottomBar'

import GoodList from 'components/goods/GoodList'
import Scroll from 'components/scroll/Scroll'
 import {debounce} from 'common/utils'
export default {
    name:'Detail',
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            itemParam:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[0],
            getTheme:null,
            currentIndex:0 
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,

        GoodList,
        Scroll,
    },
    mounted(){
         // 监听item图片加载完成
         const refresh = debounce(this.$refs.scroll.refresh,50)
          this.$bus.$on('detailItemImgLoad',() => {
            refresh()
          })
      },
    created(){
        // 1.保存id
        this.iid = this.$route.params.iid
        // 2.获取网络请求数据
        getDetail(this.iid).then(res => {
            // 1.根据iid请求详情数据
            let data = res.result
            this.topImages = data.itemInfo.topImages

            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

            // 3.创建店铺信息的对象
            this.shop = new Shop(data.shopInfo)

            // 4.保存商品的详情数据
            this.detailInfo = data.detailInfo;

            // 5.获取参数的信息
            this.itemParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        
            // 6.取出评论信息
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0]
            }  
            
            this.getTheme = debounce(() => {
                  // 等待页面完全渲染完成执行 (图片加载完成)
                // this.$nextTick(() => {
                    this.themeTopYs = [0]
                    this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
                    this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
                    this.themeTopYs.push(this.$refs.picture.$el.offsetTop-44)
                    this.themeTopYs.push(Number.MAX_VALUE)
                //})
            },100)
          
       })

        // 3. 请求推荐数据
            getRecommend().then(res => {
               this.recommends = res.data.list
            })
    },
    methods:{
        imageLoad(){
            this.$refs.scroll.refresh()
            this.getTheme()
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
        },
        contentScroll(position){
	    	// 监听滚动到某个主题
            this._listenScrollTheme(-position.y)
        },
        _listenScrollTheme(position) {
            let length = this.themeTopYs.length;
            for (let i = 0; i < length-1; i++) {
		      /**
		       * 判断的方案:
		       *  方案一:
		       *    条件: (i < (length-1) && position >= this.themeTopYs[i]; && position < this.themeTops[i+1]) || (i === (length-1) && position >= this.themeTopYs[i];),
		       *  方案二:
		       *    条件: 给themeTopYs最后添加一个很大的值, 用于和最后一个主题的top进行比较.
		       * 疑惑: 在第一个判断中, 为什么不能直接判断(position >=this.themeTopYs[i];)即可?
		       * 解答: 比如在某一个position大于第0个时, 就会break, 不会判断后面的i了.
		       */
		      if ( position >= this.themeTopYs[i] &&  position < this.themeTopYs[i+1]) {
			      if (this.currentIndex !== i) {
                      this.currentIndex = i;
                      this.$refs.nav.currentIndex = this.currentIndex
			      }
			      break;
		      }
	      }
            
        },

        // 获取购物车需要展示的信息
        addToCart(){
           const products = {}
           products.image = this.topImages[0]
           products.title = this.goods.title
           products.desc = this.goods.desc
           products.price = this.goods.realPrice
           products.iid = this.iid
            // 将商品添加到购物车
            //this.$store.commit('addCart',products)
            this.$store.dispatch('addCart',products).then(res => {
                this.$toast.show(res)
            })
        },
    }
}
</script>

<style scoped>
.detailAll{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
}
.content{
    height: calc(100% - 44px - 58px);
}
.navbar{
    position: relative;
    z-index: 9;
    background-color: #fff;
}
</style>