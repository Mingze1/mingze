import Vue from 'vue'
import Vuex from 'vuex'
// 引入modules 模块化
import cart from './modules/cart'


// 引入actions
import actions from './actions'
// 引入mutations 
import mutations from './mutations'

// 引入
Vue.use(Vuex)

// 存放着组件中信息的状态
const state = {
    goodsList:[],
    productInfo:{}
}
export default new Vuex.Store({
    state,
    actions,
    mutations,    
    modules: {
        cart
      }
})