import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
    // mmutations目的修改state状态  其中每个方法完成的事件尽可能单一
    addCounter(state,payload){
      payload.count++
    },
    addToCart(state,payload){
      payload.checked = true
      state.cartList.push(payload)
    },
    // addCart(state,payload){
    //   // 1.查找数组中是否有该商品
    //   let oldProduct = state.cartList.find(item => item.iid===payload.iid)
    //   // 2.判断product
    //   if(oldProduct){
    //     oldProduct.count += 1
    //   }else{
    //     payload.count = 1
    //     state.cartList.push(payload)
    //   }
    // }
  },
  actions: {
    addCart(context,payload){
      return new Promise((resolve,reject) => {
        let oldProduct = context.state.cartList.find(item => item.iid===payload.iid)
        if(oldProduct){
            context.commit('addCounter',oldProduct)
            resolve('当前商品数量加1')
          }else{
            payload.count = 1
            context.commit('addToCart',payload)
            resolve('商品加入购物车')
          }
      })
    }
  },
  getters:{
    cartLength(state){
      return state.cartList.length
    },
    cartList(state){
      return state.cartList
    }

  },
  modules: {
  }
})
