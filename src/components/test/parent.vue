<template>
  <div>
    parent - <span @click="handleClick">{{ name }} - {{ age }}</span>
    <p>{{ hobbies }}</p>
    <p>dbCount : {{ dbCount }}</p>
    <button @click="reset">重置</button>
    <button @click="changeInfo">修改</button>
    <div class="box">
      <ul class="list" ref="listRef" :style="listStyle">
        <li v-for="(item,index) in scrollList" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, reactive, ref } from "vue";
  import { onReady } from '@/store/wait.js'
  import { useIndexStore } from "../../store/indexStore";
  import { storeToRefs } from "pinia";

  const indexStore = useIndexStore()

  const dbCount = indexStore.dbCount

  const { name, age, hobbies } = storeToRefs(indexStore)

  const handleClick = () => {
    indexStore.changeName('张三')
    indexStore.changeAge(19)
  }

  const reset = () => {
    indexStore.$reset()
  }

  const changeInfo = () => {
    indexStore.hobbies.push('游泳')
    // indexStore.$patch({
    //     name: '李四',
    //     age: 20,
    //     hobbies: indexStore.hobbies
    // })
  }

  const str = '{{{[]}]}'

  const checkIsVaild = str => {
    if (str.length % 2 != 0) return false

    let keys = ["{", "["]
    let stack = []
    for (let i = 0; i < str.length; i++) {
      let value = str[i]
      if (keys.includes(value)) {
        stack.push(value)
      } else {
        if ((stack[stack.length - 1] == "{" && value == "}") || (stack[stack.length - 1] == "[" && value == "]")) {
          stack.pop()
        } else {
          break;
        }
      }
      console.log(i);
    }
    return stack.length == 0

  }
  console.log("字符串是否有效：", checkIsVaild(str));
  onMounted(() => {
    onReady(() => {
      console.log('回到');
    })
  })

  const listStyle = reactive({
    transform: 'translateY(0)',
    transition: 'all linear 0.25s'
  })

  const scrollList = ref(new Array(5).fill('我是1号我是1号我是1号我是1号我是1号'))
  let y = 0
  const listRef = ref(null)
  onMounted(() => {
    scrollList.value = scrollList.value.map((item, index) => {
      item = '我是' + index + '号'
      return item
    })
    scrollList.value = scrollList.value.concat(scrollList.value.slice(0,3))
    if (listRef.value) {
      listRef.value.addEventListener("transitionend", () => {
        console.log(y);
        if (y == scrollList.value.length * 30 - 30 * 3) {
          listStyle.transition = 'none'
          listStyle.transform = `translateY(0)`
        }
      })
      startAnimation()

    }
  })
  const startAnimation = () => {
    setTimeout(() => {
      y += 30
      if (y > scrollList.value.length * 30 - 30 * 3) {
        y = 30
      }
      listStyle.transition = 'all linear 0.25s'
      listStyle.transform = `translateY(${-y}px)`
      startAnimation()
    }, 2000)
  }

</script>

<style lang="scss" scoped>
.box {
  position: relative;
  height: 90px;
  overflow: hidden;
  border: 1px solid;
  .list {
    display: flex;
    flex-direction: column;
    list-style: none;
    font-size: 14px;
    margin: 0;
    position: absolute;
    left: 0;
    right: 0;
    li {
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>