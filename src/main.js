import Vue from 'vue'
import App from './App.vue'
import vueEsign from 'vue-esign'

Vue.use(vueEsign)
Vue.config.productionTip = false
// 全局过滤
Vue.filter('addText',function (val){
  return "现在时间:"+val
})

new Vue({
  render: h => h(App),
}).$mount('#app')
