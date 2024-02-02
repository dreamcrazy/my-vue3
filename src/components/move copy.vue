<template>
  <div style="overflow: hidden;">
    <div class="drag-item" data-type="divType" :draggable="true" @dragstart="dragStart" @drag="drag" @dragend="dragend"></div>
    <div id="drag" class="drag-item" style="top: 300px"></div>
    <div class="box" @dragover.prevent @dragenter="dragenter"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import "./move.js";
import * as Test1 from './test.js'

console.log(Test1);

const isDraging = ref(false)

const dragStart = (e) => {
    isDraging.value = true
    // e.dataTransfer.effectAllowd = 'all'
    console.log('开始');
    console.log(e);
}

const drag = () => {
    console.log('拖拽中...');
}

const dragend = () => {
    isDraging.value = false
    console.log('拖拽结束');
}

const dragenter = (e) => {
    e.dataTransfer.dropEffect = 'copy'
}

const p1 = new Promise((resolve) => {
  resolve('p1')
})

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('p2')
  }, 1000);
})
console.log(p1);
console.log(p2);

const getP3 = () => {
  return new Promise(resolve => {
    resolve(1)
    // setTimeout(() => {

    //   new Promise(_reslove => {
    //     setTimeout(() => {
    //       _reslove(1)
    //       resolve(1)
    //     }, 1000);
    //   })
    // }, 1000);
  })
}
const p3 = getP3().then(res => {
  console.log(res);
})
console.log(p3);
const getP4 = () => {
  return new Promise(() => {
    throw new Error('123')
  })
}
getP4().then(null,err => {
  console.log(err);
}).catch(() => {
  debugger
})

const p5 = Promise.resolve(1)
const p6 = Promise.reject(2)
console.log(p5);
console.log(p6);
</script>

<style lang="scss" scoped>
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
