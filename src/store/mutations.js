// 导入方法名称
import * as types from './mutations-types'

export default {
    [types.AddGoods](state,value){
        state.goodsList = value
    },
    [types.ProductInfo](state,value){
        state.productInfo = value
    }
}