<template>
    <div class="container">
      <div class="sunshine" v-for="(item) in list" :key="item.tid">
        <img :data-src="item.src" :ref="setItemRef" />
        <span>{{ item.text }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
    import { onMounted, ref, nextTick } from 'vue'
    const list = ref([
      {
        src: require(`../../../assets/bg.jpg`),
        tid: 0,
        text: `item0`
      },
      {
        src: require(`../../../assets/dog.jpg`),
        tid: 1,
        text: `item1`
      },
      {
        src: require(`../../../assets/user.png`),
        tid: 2,
        text: `item2`
      }
    ]) // 列表
  
    const observeImgs = () => {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(item => {
          console.log(item.isIntersecting);
          if (item.isIntersecting) {
            // 可见
            item.target.src = item.target.dataset.src //赋值data-src 给src
            delete item.target.dataset.src //删除data-src
            io.unobserve(item.target) // 取消观察
          }
        })
      })
      //循环观察dom
      imgsRef.value.forEach(item => {
        io.observe(item)
      });
    }
    const imgsRef = ref([])
    const setItemRef = el => {
      if (el) {
        imgsRef.value.push(el)
      }
    }
  
    onMounted(async () => {
      nextTick(() => {
        observeImgs()
      })
    })
  </script>
  
  <style lang="scss" scoped>
  .container {
    background: #ccc;
    height: 100vh;
    overflow: auto;
  }
  .sunshine {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 400px;
    }
  }
  </style>