<template>
    <div class="layout">   
        <nav-bar>
           <i class="iconfont icon-back" slot="left" @click="goBack"></i>
            <div class="cen" slot="center">购物车({{totalQuantity}})</div>
      <div slot="right" class="right"></div>
        </nav-bar>
        <div class="matter">
            <div class="kong" :class="hasProduct?'hidden':''">
                <div class="oops">
                    <img src="@/assets/icon/pay_pop_img_loading_fail.png" alt="">
                </div>
                <p class="kong-title">您的购物车中没有商品，请先去挑选心爱的商品吧！</p>
                <div class="shop" @click="goToShop">去逛逛</div>
            </div>
        
            <div class="content" :class="hasProduct?'':'hidden'">
                <div class="title">
                    <div class="xuan" @click="chooseAlll()">
                        <img :src="chooseAll?checkIcon:checkNotIcon" alt="">
                    </div>
                    <div class="wuzi">
                        <i class="iconfont icon-shop"></i>
                    </div>
                    <div class="matter-title"> 
                        <a href="#">
                            <p>兰乔家居 <i class="iconfont icon-more"></i></p>  
                        </a>
                    </div>
                    <div class="title-right">
                        <a href="#">编辑</a>   
                    </div>   
                </div>
                <div class="item-list" v-for="(item,index) in cartLists" :key="index">
                    <div class="list-left">
                        <div class="xuan" @click="chooseOne(index)">
                            <img :src="item.isCheck?checkIcon:checkNotIcon" alt="">
                        </div>
                    </div>
                    
                    <div class="list-center">
                        <a href="#"><img :src="`http:${item.img}`" alt=""></a>
                    </div>
                    
                    <div class="item-info">
                        <div class="title">
                            <p>{{item.title}}</p>
                            <span @click="del(item)">X</span>
                        </div>
                        <div class="price">
                            <div class="price-num">
                            <span>￥{{item.price}}</span>
                            </div>
                            <div class="minus">
                                <a href="#" @click="reduceNum(item)">-</a>
                                <b>{{item.quantity}}</b>
                                <a href="#" @click="addNum(item)">+</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <!-- 结算 -->
        <div class="wind">  
            <div class="xuan" @click="chooseAlll()">
                <img :src="chooseAll?checkIcon:checkNotIcon" alt="">
            </div>
            <h3>全选</h3>
            <div class="wind-price">
                <span>合计</span>
                <span>￥{{totalPrice.toFixed(2)}}</span>
            </div>
            <div class="close">
                <a href="#" @click="sumbitBtn()">结算{{totalQuantity}}</a>
            </div>
        </div>

    </div>
</template>
<script>
import NavBar from '@/components/navbar';
import { MessageBox } from "mint-ui";
const storage = window.localStorage
export default {
    name:'cart',
    data(){
        return {
            checkNotIcon: require("@/assets/icon/order_not_checked.png"),
            checkIcon: require("@/assets/icon/order_checked.png"),
            hasProduct: false, 
            chooseAll: false,
            num:0,
            totalPrice: 0,
            totalQuantity: 0,
            cartLists: []
        }
    },
    created(){
        this.carts()
        console.log(this.cartLists);
    },
    computed: {
    quantityArray() {
      let added = this.cartLists;
      let array = [];
      for (let item of added) {
        array.push(item.quantity);
      }
      // console.log(array)
      return array;
    }
  },

    methods:{
        // 如果有数据 就显示数据页面 没有数据就显示没数据页面 用hasProduct 真假来判断
        carts(){
            this.cartLists = this.$store.state.cart.added;
            if( this.cartLists.length != 0){
                this.hasProduct = true;
            }
        },
        // 跳转
        goToShop(){
            this.$router.replace('./home')
        },
        goBack(){
            this.$router.go(-1)
        },
        del(item){
            let { id, type, quantity } = item;
            let newProduct = {
            id: id,
            type: type,
            quantity: quantity=0
            };
            this.$store.dispatch("updateThisCart", newProduct);
            console.log(item.id);
            
            if(this.cartLists == 0){
                this.hasProduct = false;
            }
        },
        // 单选并且计算价格
        chooseOne(id){
            console.log(this.cartLists[id].isCheck)
            this.cartLists[id].isCheck = !this.cartLists[id].isCheck
            if(this.cartLists[id].isCheck == true){
                this.num++
            this.totalQuantity += this.cartLists[id].quantity
             this.totalPrice += this.cartLists[id].quantity * this.cartLists[id].price
            }else{
                this.num--
                let item = this.cartLists[id]
                this.totalQuantity -= item.quantity
                this.totalPrice -= Math.round(item.quantity * item.price * 100)/100
            }   
            if(this.num == this.$store.state.cart.added.length){
                this.chooseAll = true
            }else{
                this.chooseAll = false
            }
            console.log(this.cartLists);  
        },
        // 改变购买数量减减
        reduceNum(item){
           let { id, type, quantity } = item;
            quantity--;
            if (quantity <= 1) {
            quantity = 1;
            }
            let newProduct = {
            id: id,
            type: type,
            quantity: quantity
            };
            this.$store.dispatch("updateThisCart", newProduct);
        },
        // 改变购买数量加加
         addNum(item) {
            let { id, type, quantity } = item;
            quantity++;
            let newProduct = {
                id: id,
                type: type,
                quantity: quantity
            };
            this.$store.dispatch("updateThisCart", newProduct);
            },
        // 计算价格方法
       getAllCart() {
           if(this.cartLists){
            for (let item of this.cartLists) {
            // 累加的总数量
            if (item.isCheck) {
            this.totalQuantity += item.quantity;
            // 累加的总价钱
            this.totalPrice += item.price * item.quantity;
            }
          }
      }
    },

        // 全选  并且计算价格
        chooseAlll(){
            console.log(this.chooseAll);
            this.chooseAll = !this.chooseAll
            if(this.chooseAll){
                for(let item of this.cartLists){
                        item.isCheck = true
                }
                let len = this.$store.state.cart.added.length
                 this.num = len
                 this.totalQuantity = 0;
                 this.totalPrice = 0;
                 this.getAllCart();
            }else{
                 for(let item of this.cartLists){
                    item.isCheck = false
                }
                 this.num = 0
                  this.totalQuantity = 0;
                 this.totalPrice = 0;
            }
        },

        sumbitBtn(){
             if (this.totalQuantity) {
                MessageBox.alert("恭喜你结算成功,请等待收货！");
                this.$store.state.cart.added = [];
                storage.setItem("cart", []);
                }
                console.log(this.cartLists[0].isCheck)
             if(this.cartLists != 0){
                this.hasProduct = false;
            }
        },
        updateList(id, type, quantity, isCheck) {
            let newProduct = {
                id: id,
                type: type,
                quantity: quantity,
                isCheck: isCheck
            };
            this.$store.dispatch("updateThisCart", newProduct);
            this.cartLists = storage.getItem("cart")
                ? JSON.parse(storage.getItem("cart"))
                : [];
        }
        
    },
    watch:{
       
        quantityArray() {
            if(this.quantityArray){
        // 监听数据的变化 从而改变价格
                this.totalQuantity = 0;
                this.totalPrice = 0;
                this.getAllCart();
            }
        }
    },
    components:{
        NavBar
    }
}
</script>
<style scoped>
input[type="checkbox"] {
  display: none;
}
.layout{
    width:100%;
    height:100%;
    background: #eee
}
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 2px 1px #ddd;
}
.navbar-center {
  flex: 1;
  margin: 0 0.1rem;
  text-align: center !important;
  font: 18px 微软雅黑;
}
.navbar-center .cen{
    width:100%;
    text-align: center;
}
.right{
    width:20px;
}
.matter {
    width:100%;
    height:200px;
    margin-top:20px;
    display:flex;
    flex-direction: column;
}
.matter .kong{
    width:100%;
    height:100%;
}
.matter .kong .oops{
    width:100%;
}
.matter .kong .kong-title{
    width:100%;
    text-align: center;
}
.matter .kong .shop{
    color:#fff;
    width:100px;
    height:40px;
    line-height:40px;
    background:#f80;
    text-align: center;
    margin:10px auto;
    border-radius:18px;
}
.hidden{
    display:none;
}



.matter .content{
    width:100%;
}
.matter .title{
    width:100%;
    height:40px;
    display: flex;
    background:#fff;
}

.matter .title .xuan,.matter .item-list .list-left .xuan,.wind .xuan{
    width:20px;
    height:20px;
    border-radius: 50%;
    display:flex;
    align-items: center;
    justify-content: center;
    margin:10px 10px 0 10px;
}
.matter .title .xuan img{
    width:30px;
    height:30px;
}
.matter .title .wuzi{
    margin:12px 10px 0 0px;
    display: flex;
}
.matter .title .matter-title{
    width:70%;
    margin:12px 10px 0 0px;
    font-size: 14px;
}
.matter .title .title-right{
    display: flex;
    margin:12px 10px 0 0px;
    font-size: 14px;
    width: 10%;
}
.matter .item-list{
    height:140px;
    width:100%;
    display:flex;
    background: #fff;
    box-shadow: -10px 0 5px #ccc
}
.matter .item-list .list-left{
    display: flex;
    height:100px;
    width:10%;
    justify-content: center;
    align-items: center;
}
.matter .item-list .list-center{
    width:35%;
    height:120px;
    margin:10px 10px 0 0px;
}
.matter .item-list .item-info{
    display: flex;
    flex-direction: column;
    width:49%;
}
.matter .item-list .item-info .title{
    font-size:14px;
    line-height: 20px;
    height:95px;
    margin-top:10px;
}
.matter .item-list .item-info .title span{
    font-size:12px;
    position: absolute;
    right:10px;
}
.matter .item-list .item-info .price{
    display:flex;
}
.matter .item-list .item-info .price .price-num{
    width:65%;
}
.matter .item-list .item-info .price .minus{
    display:flex;
}
.matter .item-list .item-info .price .minus b{
    text-align: center;
    width:25%;
    margin:3px 10px 0 10px; 
}
.matter .item-list .item-info .price .minus a{
    width:10px;
    font-size:20px;
    font-weight: bold
}












.wind{
    width:100%;
    height:50px;
    background: #fff;
    position:fixed;
    bottom:50px;
    display: flex;
}
.wind .xuan{
    width:20px;
    height:20px;
}
.wind h3{
    height:30px;
    line-height: 40px;
    width:50px;
}
.wind .xuan input{
    margin-right:10px;
}
.wind .wind-price{
    width:55%;
    margin:15px 10px 0 0px;
    text-align: right;
}
.wind .close{
    width:25%;
    height: 50px;
    background: #f80;
    display: flex;
    justify-content: center;
    align-items: center;
}
.wind .close a{
    color:#fff;
}


</style>

    
