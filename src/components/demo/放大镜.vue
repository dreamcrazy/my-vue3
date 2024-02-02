<template>
  <div class="box">
    <div class="box-l" ref="box" @mouseenter="mouseenter" @mousemove="mousemove" @mouseleave="mouseleave">
      <img src="@/assets/狗头.jpg" alt="">
      <div class="mask" ref="mask" v-show="maskShow" :style="`top:${maskPos.y}px;left:${maskPos.x}px;`"></div>
    </div>
    <div class="box-r" v-show="maskShow">
      <img src="@/assets/狗头.jpg" :style="`top:${bigPos.y}px;left:${bigPos.x}px;`" alt="">
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue';



  const box = ref(null)
  const mask = ref(null)
  const maskShow = ref(false)
  const maskPos = reactive({
    x: 0,
    y: 0
  })
  const bigPos = reactive({
    x: 0,
    y: 0
  })

  const mouseenter = e => {
    console.log('mouseenter', e);
    maskShow.value = true
  }
  const mousemove = e => {
    let { pageX, pageY } = e
    let { width: maskWidth, height: maskHeight } = mask.value.getBoundingClientRect()
    let boxPos = box.value.getBoundingClientRect()
    console.log(boxPos);
    let x = pageX - boxPos.left - maskWidth / 2
    let y = pageY - boxPos.top - maskHeight / 2
    if (x < 0) {
      x = 0
    } else if (x > (boxPos.width - maskWidth)) {
      x = boxPos.width - maskWidth
    }

    if (y < 0) {
      y = 0
    } else if (y > (boxPos.height - maskHeight)) {
      y = boxPos.height - maskHeight
    }
    maskPos.x = x
    maskPos.y = y
    bigPos.x = -x * 2
    bigPos.y = -y * 2 // mask的宽高 * 2 = 右侧放大的宽高 这样mask的内容和放大的内容才一致 要成比例
  }

  const mouseleave = e => {
    console.log('mouseleave', e);
    maskShow.value = false
  }
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  .box-l {
    width: 300px;
    height: 300px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .mask {
      width: 200px;
      height: 200px;
      opacity: 0.6;
      background: #000;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
  }
  .box-r {
    width: 400px;
    height: 400px;
    position: relative;
    overflow: hidden;
    img {
      width: 600px;
      height: 600px;
      position: absolute;
    }
  }
}
</style>