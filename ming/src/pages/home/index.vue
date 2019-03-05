<template>
    <div>
      <my-scroll
       class="wrapper"
      :data="productData"
      :listenScroll="isScroll"
      @scroll="_scroll"
      :pullup="pullup"
      @pullup="_pullup"
      ref="scroll"
      :style="{'height':Maxheight}"
      >
          <div class="content">
    <!-- 产品详细页路由出口 -->
    <router-view></router-view>

        <nav-bar>
            <i class="iconfont icon-scan" slot="left"></i>
            <div class="search-box-wrapper" slot="center">
            <i class="iconfont icon-search"></i>
            <input class="search-box" type="text" title="搜索框" placeholder="开学季5折优惠">
            <i class="iconfont icon-close"></i>
            </div>
            <i class="iconfont icon-msg" slot="right"></i>
        </nav-bar>
        <!-- 别人的组件 -->
        <swiper :options="swiperOption">
            <swiper-slide v-for="(val,key) in slides" :key="key">
                <a :href="val.imgUrl"><img :src="val.imgName" alt=""></a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!-- nav导航 -->
    <nav class="nav">
      <ul class="nav-list">
        <li class="nav-item" v-for="(val,key) in navs" :key="key">
          <a href="#" class="nav-link">
            <img :src="val.navUrl" class="nav-pic">
            <span>{{val.title}}</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- 产品列表 -->
    <product-list @loaded="getProductData" ref="productList"></product-list>
    </div>
      </my-scroll>
      <div class="g-backtop-container">
      <me-backtop :visible="isBacktopVisible" @backtop="backToTop"></me-backtop>
    </div>
    </div> 
</template>

<script>
                // @ 意思是当前的src开始找文件
import NavBar from '@/components/navbar'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import ProductList from './productList'

import MyScroll from '@/components/scroll'
import MeBacktop from '@/components/backtop'
    export default {
        name:'home',
        components:{ //挂子
            NavBar,
            swiper,
            swiperSlide,
            ProductList,
            MyScroll,
            MeBacktop
        },
        data(){
            return {
              isScroll:true,
              isBacktopVisible:false,
              productData:[],
              page:1,
              totalPage:0,
              pulldown:true,
              pullup:true,
              Maxheight:document.documentElement.clientHeight - 100+'px',
                slides:[
                    {
                        imgUrl:'http://www.baidu.com',
                        imgName:require('./images/1.jpg')
                    },
                     {
                        imgUrl:'http://www.baidu.com',
                        imgName:require('./images/2.jpg')
                    },
                     {
                        imgUrl:'http://www.baidu.com',
                        imgName:require('./images/3.jpg')
                    },
                     {
                        imgUrl:'http://www.baidu.com',
                        imgName:require('./images/4.jpg')
                    }
                ],
                swiperOption: {
                    direction: "horizontal",
                    loop: true,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable :true,
                    },
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false
                    },
                },   
                navs:[
                    {
                       navUrl:require('./images/nav-item-1.png'),
                       title:'美团'
                    },
                    {
                       navUrl:require('./images/nav-item-2.png'),
                       title:'购物'
                    },
                    {
                       navUrl:require('./images/nav-item-3.png'),
                       title:'优惠券'
                    },
                    {
                       navUrl:require('./images/nav-item-4.png'),
                       title:'化妆'
                    },
                    {
                       navUrl:require('./images/nav-item-5.png'),
                       title:'车票'
                    },
                    {
                       navUrl:require('./images/nav-item-6.png'),
                       title:'食品'
                    },
                    {
                       navUrl:require('./images/nav-item-7.png'),
                       title:'酒水'
                    },
                    {
                       navUrl:require('./images/nav-item-8.png'),
                       title:'秒杀'
                    },
                ]
            }
        },
        methods:{
          getProductData(obj){
              this.productData = obj.productList;
              this.page = obj.page;
              this.totalPage = obj.totalPage;
          },
           _scroll(pos){
            //检测滚动条 ,滚动高度 pos.y
            this.isBacktopVisible = pos.y < 0 && -pos.y > 200;
          },
          _pullup(){
            console.log('正在上拉');
            if(this.page > this.totalPage){
              console.log('没有更多了');
              this.pullup = false;
              return false;
            }
             this.$refs.productList.update();
          },
          backToTop(){
            this.$refs.scroll && this.$refs.scroll.scrollTo(0,0)
          }
        }
    }
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 50px;
  background-color: #f60;
}

.search-box-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 7px;
  background-color: #fff;
  border-radius: 15px;
}
.g-container .iconfont {
  color: #fff;
  font-size: 30px;
}
.search-box-wrapper .iconfont {
  color: #ccc;
  font-size: 20px;
  font-weight: bold;
}
.search-box {
  flex: 1;
  background: none;
  border: none;
  margin: 0 9px;
  color: #666;
  line-height: 1.5;
}
/*轮播图*/
.swiper-container {
  width: 100%;
  height: 180px;
}
.swiper-container img {
  width: 100%;
  height: 100%;
}
/*nav 导航样式*/
.nav {
  width: 100%;
  padding-top: 0.15rem;
  background-color: #fff;
}
.nav-list {
  display: flex;
  flex-wrap: wrap;
}
.nav-item {
  width: 25%;
  margin-bottom: 0.15rem;
}
.nav-link {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.nav-pic {
  width: 60%;
  margin-bottom: 0.08rem;
}
</style>

 