<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
      <back-top @click.native='backClick' v-show='isShowBack' />
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import BackTop from 'components/backtop/BackTop'
export default {
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }

    },
    components:{
        BackTop,
    },
    data(){
        return{
            scroll:null,
            isShowBack:false
        }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{
            probeType:this.probeType,
            click:true,
            pullUpLoad:this.pullUpLoad,
        })
        this.scroll.on('scroll',position => {
            this.$emit('scroll',position)
            this.isShowBack = (-position.y) > 1000
        }),
        this.scroll.on('pullingUp',() => {
            this.$emit('pullingUp')
        })
    },
    methods:{
        backClick(){
          this.scroll.scrollTo(0,0,300)
        },

        scrollTo(x,y,time=300){
            this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        refresh(){
            this.scroll && this.scroll.refresh()
        }
    }
}
</script>

<style>

</style>