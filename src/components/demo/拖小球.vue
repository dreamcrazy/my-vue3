<template>
  <div>
    <p>pos：{{ pos }}</p>
    <div class="ball" ref="ball" @mousedown.self="mousedown" :style="bStyle">
      <button @click="btn">123</button>
    </div>
    <transition-group tag="ul" name="list">
      <li v-for="item in list" :key="item.id" draggable="true" @dragstart="dragstart($event,item)" @dragover="dragover"
        @dragenter="dragenter($event,item)" @drop="drop">
        {{ item.text }}
      </li>
    </transition-group>
  </div>
</template>

<script setup>

  import { onMounted, reactive, ref } from 'vue'

  const ball = ref(null)

  onMounted(() => {
    // if(ball.value) {
    //     document.body.addEventListener("")
    // }

  })
  const bStyle = reactive({
    transform: `translate3d(0,0,0)`
  })
  const pos = reactive({
    x: 0,
    y: 0
  })
  const flag = ref(false)
  const mousedown = e => {
    console.log('mousedown', e);
    flag.value = true
    if (!pos.x) {
      pos.x = e.pageX
    }
    if (!pos.y) {
      pos.y = e.pageY
    }
    document.onmousemove = mousemove
    document.onmouseup = onmouseup
  }
  const mousemove = (e) => {
    console.log('mousemove111');
    if (flag.value) {
      console.log(e);
      console.log('mousemove');
      let { pageX, pageY } = e
      let x = pageX - pos.x
      let y = pageY - pos.y
      console.log(x, y);
      bStyle.transform = `translate3d(${x}px,${y}px,0)`
    }
  }

  const onmouseup = e => {
    console.log('onmouseup');
    flag.value = false
    e
    document.onmousemove = null
    document.onmouseup = null
    // pos.x = e.pageX
    // pos.y = e.pageY
  }


  const btn = () => {
    console.log(111);
  }

  const list = ref([
    {
      id: 1,
      text: '组件1组件1组件1组件1'
    },
    {
      id: 2,
      text: '组件2组件2组件2组件2'
    },
    {
      id: 3,
      text: '组件3组件3组件3组件3'
    },
    {
      id: 4,
      text: '组件4组件4组件4组件4'
    },
    {
      id: 5,
      text: '组件5组件5组件5组件5'
    },
  ])

  const dItem = ref(null)
  const dragstart = (e, item) => {
    if (!dItem.value) {
      dItem.value = item
    }
  }

  const dragover = (event) => {
    event.preventDefault()
  }

  const dragenter = (e, item) => {
    e.preventDefault()
    e.dataTransfer.effectAllowed = 'move'
    if (dItem.value) {
      if (item.id == dItem.value.id) return
      let arr = [...list.value]
      let oIndex = list.value.findIndex(cItem => cItem.id == dItem.value.id)
      let index = list.value.findIndex(cItem => cItem.id == item.id)
      arr.splice(index, 0, ...arr.splice(oIndex, 1))
      console.log(arr);
      list.value = arr
    }
  }
  const drop = () => {
    dItem.value = null
  }
</script>

<style lang="scss" scoped>
.ball {
  position: fixed;
  right: 100px;
  bottom: 10%;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: pink;
}
ul {
  list-style: none;
  li {
    height: 30px;
    line-height: 30px;
    background-color: antiquewhite;
    border: 1px solid #999;
    width: 200px;
    cursor: pointer;
  }
}
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>