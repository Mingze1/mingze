import * as types from './mutations-types'

export default{
      addGoods({ commit }, value) {
        commit(types.AddGoods,value)
    },
    productInfo({ commit },value){
        commit(types.ProductInfo,value)
    },


    // 添加商品到购物车
    addToCart({ commit }, product) {
        if (product.inventory > 0) {
          commit(types.ADD_TO_CART, product)
        }
      },
      updateThisCart({commit},product){
        if(true){
          commit(types.UPDATE_THIS_PRODUCT,product)
        }
      }
}