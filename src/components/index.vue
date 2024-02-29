<template>
  <div>
    <div>
      <button @click="getInfo">发送请求1</button>
      <button @click="getVisit">发送请求2</button>
    </div>
    <p>-----------------------------------------------------</p>
    index
    <cus-btn>123</cus-btn>
    <router-link to="/about">about</router-link>
    <div class="box">
      <div>kkk</div>
    </div>
    <div class="test">
      <div>align-self: flex-start;</div>
      <div>2</div>
      <div>3</div>
      <div>特殊的</div>
    </div>
    <p class="text">
      我是文本第一个我是文本第一个我是文本第一个我是文本第一个我是文本第一个
      <img src="@/assets/logo.png" alt="" />
      第二次便是10.1版本，被动移速被下调至全等级3%，后期直接少了几十点移速，对铁男这种“笨比”英雄来说无疑是致命打击，并且设计师还略带嘲讽地说了一句：我们削弱了铁男的被动，好让你更容易风筝他。这波改动过后，铁男的胜率直接下降了近2%，登场率也是一路下滑再也没有回升过。
    </p>
    <input type="text" @input="toInput">
  </div>
</template>
<script lang="js" type="text/javascript">
// import './test/class'
import './test/class-extends'
import { getVteInfo,getVisitCount } from '../request/api'
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    function debounce(fn, delay = 500) {
      //记录上一次的延时器
      var timer = null;
      return function (...args) {
        //清除上一次的演示器
        clearTimeout(timer);
        //重新设置新的延时器
        timer = setTimeout(() => {
          //修正this指向问题
          fn.apply(this,args);
        }, delay);
      };
    }

    const toInput = debounce(function(e){
      console.log(e);
      console.log(this);
    }) 


    const getInfo = () => {
      getVteInfo({"patient_id":"000001371000","visit_id":"2"}).then(res => {
        console.log(res);
      },err =>{
        console.log(err);
      })
    }

    const getVisit = () => {
      getVisitCount({"patient_id":"000001371000","visit_id":"2","pageSource":"20-2"}).then(res => {
        console.log(res);
      },err =>{
        console.log(err);
      })
    }
    // getInfo()
    // getVisit()

    return {
      toInput,
      getInfo,
      getVisit
    };
  }
})
</script>

<style lang="scss" scoped>
.text {
  width: 340px;
  img {
    float: left;
    margin-top: 20px;
    margin-left: 20px;
  }
}
.box {
  display: flex;
  border: 1px solid #ddd;
  width: 200px;
  height: 200px;
  div {
    margin: auto;
    width: 100px;
    height: 100px;
    line-height: 100px;
    border: 1px solid #ccc;
  }
}
.test {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  height: 200px;
  div {
    border: 1px solid #ccc;
    height: 20px;
    width: 100px;
    & + div {
      margin-left: 10px;
    }
  }
  div:nth-child(1) {
    color: red;
    align-self: flex-start;
  }
  div:nth-child(4) {
    color: red;
    flex: 0 1 60px;
  }
}
</style>
