import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'lib-flexible'
// es5->es6垫片
// import 'babel-polyfill';

import './assets/css/index.css'
// swiper样式
import 'swiper/dist/css/swiper.css'
// 导入懒加载
import Vuelazyload from 'vue-lazyload'
// 使用并配置 use
Vue.use(Vuelazyload,{
        loading:require('./assets/images/loading.gif')
})

// 导入mint-ui
import mint from 'mint-ui'
Vue.use(mint)
import 'mint-ui/lib/style.css'

// 导入axios
import Axios from 'axios';
// 全局挂载Axios
Vue.prototype.$axios = Axios;


// 请求 request
  Axios.interceptors.request.use(function(req){
    //显示loading
      mint.Indicator.open();
      return req;
  })
// response响应拦截器
Axios.interceptors.response.use(function(res){
  // 隐藏loading
  mint.Indicator.close()
  return res;
})




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
