<template>
  <div class="test">
    move
    <button class="btn" @click="changeInfo">change</button>
    <zoom :img-list="imgList"></zoom>
  </div>
  <div class="box-m" ref="box"></div>
  <div class="fix">
    <p v-for="(value,key,index) in cInfo.state" :key="key">
      {{  key  }} -- {{ value }} -- {{ index }}
    </p>
  </div>
</template>

<script setup>
// import './sf/maopao.js'
// import './sf/charupaixu.js'
// import './sf/guibingpaixu'
import './sf/quickSort'
import './sf/myNew.js'
import zoom from './test/zoom.vue';
import { onMounted, reactive, ref, watch } from 'vue';

const box = ref(null)
const cInfo = reactive({
  state: {}
})
onMounted(() => {
  if(box.value) {
    let arr = ['x','y','top','left','right','bottom']
    window.onscroll = function() {
      var info = box.value.getBoundingClientRect()
      // cInfo.state = info
      arr.forEach(key => {
        cInfo.state[key] = info[key]
      });
      console.log(cInfo.state);
    }
    
  }
})

const changeInfo = () => {
  cInfo.state = {
    name: '123',
    age: 18
  }
}

const imgList = ref([
  {
    b:require("@/assets/logo.png"),
    s:require("@/assets/logo.png")
  },
  {
    b:require("@/assets/logo.png"),
    s:require("@/assets/logo.png")
  },
  {
    b:require("@/assets/logo.png"),
    s:require("@/assets/logo.png")
  },
  {
    b:require("@/assets/logo.png"),
    s:require("@/assets/logo.png")
  },
])

const infoState = reactive({
  name:'张三',
  info: {
    age: 18,
    gerder: 'hhh',
    hh:{
      kk:'mm'
    }
  }
})

watch(() => infoState.info,(newVal) => {
  console.log('infoState',newVal);
},{
  deep:true
})

setTimeout(() => {
  infoState.info.age = 19
}, 1000);

</script>

<style lang="scss" scoped>
.btn {
  position: relative;
  z-index: 111;
}
.test {
  background-color: aquamarine;
  height: 1200px;
}
.fix {
  position: fixed;
  right: 0;
  top: 0;
  margin: 0 auto;
  left: 0;
  height: 100px;
  background-color: cadetblue;
  color: #fff;
  text-align: center;
}
.box-m {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border: 1px solid #ccc;
}
.drag-item {
  width: 100px;
  height: 100px;
  background-color: aquamarine;
  border-radius: 50%;
  position: absolute;
}
.box {
    margin-left: 300px;
    width: 40vw;
    height: 40vh;
    border: 1px solid;
}
</style>
