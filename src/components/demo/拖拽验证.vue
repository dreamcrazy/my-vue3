<template>
  <div class="box">
    <p class="title" :class="{'green': txtStatus.includes('成功'),'red': txtStatus.includes('失败')}">
        {{ txtStatus }}
        <button @click="randomItem">换一张</button>
    </p>
    <div class="yz-box" ref="yzBox">
      <img :src="curImg" alt="">
      <div class="t-box" ref="tBox"
        :style="{'top':aBoxPos.top,'background':`url(${curImg})`,'backgroundPosition': `-${aBoxPos.left} -${aBoxPos.top}`,'transform':`translateX(${tStyle.x}px)`}"
        :class="{'back': isBacking}">
      </div>
      <div ref="aBox" class="a-box" :style="aBoxPos"></div>
    </div>
    <div class="slider" ref="slider">
      <span class="btn" @mousedown="mousedown" :class="{'back': isBacking}"
        :style="{'transform': `translateX(${tStyle.x}px)`}"></span>
      <span class="text" v-show="!flag">滑动滑块进行验证</span>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, reactive, ref } from "vue";
import tu1 from '@/assets/tu1.png'
import tu2 from '@/assets/tu2.png'
import tu3 from '@/assets/tu3.png'

  const txtStatus = ref("等待验证")
  const yzBox = ref(null)
  const tBox = ref(null)
  const aBox = ref(null)
  const aBoxPos = reactive({
    left: 0,
    top: 0
  })
  const imgArr = [tu1,tu2,tu3]

  const randomImg = () => {
    const getRandom = () => Math.floor(Math.random() * 3)
    let index = getRandom()
    while (curImg.value == imgArr[index]) {
        index = getRandom()
    }
    console.log(index);
    return imgArr[index]
  }
  let curImg = ref(null)
  curImg.value = randomImg()


  const isBacking = ref(false)

  const randomAboxPos = () => {
    const { width: yzBoxWidth, height: yzBoxHeight } = yzBox.value.getBoundingClientRect();
    const { width: aBoxWidth, height: aBoxHeight } = aBox.value.getBoundingClientRect();
    const leftMin = yzBoxWidth / 2
    const leftMax = yzBoxWidth - aBoxWidth
    const left = leftMin + Math.floor(Math.random() * (leftMax - leftMin))
    const top = 10 + Math.floor(Math.random() * (yzBoxHeight - aBoxHeight - 30))
    aBoxPos.left = left + 'px'
    aBoxPos.top = top + 'px'
    console.log(top, left);
  }

  const slider = ref(null)
  const flag = ref(false)
  const tStyle = reactive({
    x: 0
  })

  let mousedown = (e) => {
    flag.value = true
    isBacking.value = false
    console.log('mousedown');
    slider.value.onmousemove = (ev) => {
      if (flag.value) {
        txtStatus.value = '验证中...'
        console.log('mousemove');
        console.log(e.clientX);
        let x = ev.clientX - slider.value.offsetLeft - e.offsetX;
        if (x < 0) {
          x = 0
        } else if (x > yzBox.value.offsetWidth - tBox.value.offsetWidth) {
          x = yzBox.value.offsetWidth - tBox.value.offsetWidth
        }
        console.log(x);
        tStyle.x = x

      }
    }
  }
  let mouseup = () => {
    flag.value = false
    let tBoxPos = tBox.value.getBoundingClientRect();
    let aBoxPos = aBox.value.getBoundingClientRect();
    if (Math.abs(tBoxPos.left - aBoxPos.left) <= 5) {
      txtStatus.value = '验证成功！'
      console.log('成功');
      mousedown = mouseup = () => { }
    } else {
      txtStatus.value = '验证失败！'
      console.log('失败');
      isBacking.value = true
    }
  }
  document.onmouseup = mouseup
  const transitionend = () => {
    console.log(111);
    isBacking.value = false
    tStyle.x = 0
  }

  const randomItem = () => {
    curImg.value = randomImg()
    randomAboxPos()
  }
  onMounted(() => {
    randomAboxPos()
    slider.value.addEventListener("transitionend", transitionend, {
      once: true
    })
    tBox.value.addEventListener("transitionend", transitionend)
  })

</script>

<style lang="scss" scoped>
.box {
  width: 400px;
  height: 600px;
  border: 1px solid;
  .title {
    text-align: center;
    font-size: 14px;
  }
  .green {
    color: #08e757;
  }
  .red {
    color: red;
  }
  .yz-box {
    position: relative;
    width: 400px;
    height: 252px;
    img {
      width: 100%;
    }
    .t-box {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 20px;
      left: 0;
      background: url(~@/assets/tu3.png) no-repeat;
      box-shadow: 1px 1px 12px #000;
      z-index: 2;
      border: 1px solid #08e757;
    }
    .a-box {
      width: 40px;
      height: 40px;
      background: #fff;
      position: absolute;
      left: 240px;
      top: 20px;
      z-index: 1;
    }
  }
  .slider {
    width: 400px;
    height: 30px;
    border-radius: 8px;
    margin: 0 auto;
    background-color: antiquewhite;
    overflow: hidden;
    display: flex;
    .btn {
      display: block;
      position: relative;
      border: 1px solid #999;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      box-sizing: border-box;
      margin-top: 2px;
      margin-left: 5px;
      cursor: pointer;
      &::before {
        content: "";
        position: absolute;
        top: 7px;
        width: 15px;
        height: 8px;
        border: 1px solid #999;
        border-left: 0;
        border-right: 0;
        left: 3px;
      }
      &:hover {
        box-shadow: 0 0 4px #000;
      }
    }
    .text {
      flex: 1;
      line-height: 30px;
      text-align: center;
    }
  }
  .back {
    transform: translateX(0) !important;
    transition: transform 0.25s ease-in-out !important;
  }
}
</style>