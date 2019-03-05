<template>
    <div>
        <my-scroll  class="wrapper"
      ref="scroll">
       <div class="content">
            <div class="bg-top">
                <div class="top-user">
                          <div class="top-left">
                                <img src="./images/tou.jpeg" alt="">
                          </div>
                          <div class="top-content">
                              <span>明泽呦</span>
                              <img src="./images/qin.png" alt="">
                          </div>
                          <div class="top-right">
                              
                          </div>
                </div>

            </div>

       </div>

        </my-scroll>
    </div>
</template>

<script>
import MyScroll from '@/components/scroll'
    export default {
        home:'home',
        components:{
            MyScroll,
        }
    }
</script>

<style scoped>
.wrapper{
    width:100%;
    height:1000px;
}
.content{
    width:100%;
    height:auto;
}
.bg-top{
    width:100%;
    height:210px;
   background-image: linear-gradient(to right, #FD9126, #FF5000);
}
.bg-top .top-user{
    width:100%;
    height:80px;
    padding-top:30px;
    display:flex;
}
.bg-top .top-user .top-left {
    display: flex;
    width:20%;
    height:60px;
    padding:0px 0 0 20px; 
    justify-content: center;
}
.bg-top .top-user .top-left img{
    width:60px;
    border:2px solid #fff;
    border-radius: 50%;
}
.bg-top .top-user .top-content{
    width:60%;
    height:60px;
    padding-left:10px;
    display: flex;
    flex-direction: column
}
.bg-top .top-user .top-content span{
    font-size: 23px;
    color:#fff;
    font-weight: bold;
    width:100px;
}
.bg-top .top-user .top-content img{
    margin-top:10px;
    width:160px;
    height:23px;
    }
</style>