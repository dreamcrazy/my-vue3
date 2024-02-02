<template>
  <div class="box">
    <ul class="container" ref="listRef" :style="`transform: translateX(-${index * 800}px)`"
      :class="{'active': hasActive}" @mouseenter="mouseenter" @mouseleave="mouseleave">
      <li v-for="item in list" :key="item">
        <img :src="require(`@/assets/tu${item}.jpg`)" alt="">
      </li>
    </ul>
    <button @click="turn('left')">left</button>
    <button @click="turn('right')">right</button>
    <p>{{index}}</p>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue"

  const listRef = ref(null)
  const hasActive = ref(true)
  const list = [3, 1, 2, 3, 1]
  const index = ref(1)
  let interval = ''
  const start = () => {
    interval = setInterval(() => {
      hasActive.value = true
      index.value += 1
      if (index.value > list.length - 1) {
        index.value = 1
      } else if (index.value == 0) {
        index.value = list.length - 2
      }
    }, 1500);
  }
  onMounted(() => {
    start()
    listRef.value.addEventListener("transitionend", () => {
      if (index.value == list.length - 1) {
        index.value = 1
        hasActive.value = false
      } else if (index.value == 0) {
        index.value = list.length - 2
        hasActive.value = false
      }
    })
  })

  const turn = type => {
    clearInterval(interval)
    if (type == 'left') {
      index.value = index.value - 1
    } else {
      index.value++
    }
    if (index.value > list.length - 1) {
      index.value = 1
    }
    hasActive.value = true
    start()
  }

  const mouseenter = () => {
    clearInterval(interval)
  }
  const mouseleave = () => {
    start()
  }

</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.box {
  position: relative;
  width: 800px;
  height: 500px;
  overflow: hidden;
  .container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
    list-style: none;
    li {
      flex: 0 0 100%;
      img {
        width: 100%;
      }
    }
  }
  .active {
    transition: transform linear 0.25s;
  }
  button {
    position: absolute;
    bottom: 0;
    left: 0;
    & + button {
      left: 40px;
    }
  }
  p {
    position: absolute;
    left: 100px;
    bottom: 0;
  }
}
</style>