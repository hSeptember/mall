import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from './components/toast'
Vue.config.productionTip = false
Vue.use(toast)
Vue.prototype.$bus = new Vue()  //创建事件总线
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
