import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// reset.css 重置样式
import "@/assets/css/reset.css";
// iconfont.css
import "@/assets/fonts/iconfont.css";
Vue.config.productionTip = false

new Vue({
  router,// 注入vue实例渲染
  store,// 注入vue实例对象渲染
  render: h => h(App)
}).$mount('#app')
