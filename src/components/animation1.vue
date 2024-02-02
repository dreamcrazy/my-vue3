<template>
  <div>
    <div class="container">
      <button class="btn-show" :class="menuShow ? 'b-hide' : 'b-show'" @click="toggle(true)">展开--{{ menuShow }}</button>
      <div class="box" :class="menuShow ? 'show' : 'hide'">
        <button class="btn" @click="toggle(false)">收起--{{ menuShow }}</button>
        <div class="box-item">
          <h2 @click="change(1)">我是title</h2>
          <ul :class="{'active': activeIndex == 1}">
            <li v-for="(item,index) in list" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="box-item">
          <h2 @click="change(2)">我是title1</h2>
          <ul :class="{'active': activeIndex == 2}">
            <li v-for="(item,index) in list" :key="index">{{ item }} - 1</li>
          </ul>
        </div>
      </div>
      <div class="content">
        <img src="@/assets/tu3.png" alt="">
        <p>我是文字</p>
      </div>
    </div>
    <div class="ball"></div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';

  const list = [1, 2, 3, 4, 5]

  const activeIndex = ref(1)
  const change = index => {
    if (activeIndex.value == index) {
      activeIndex.value = 0
      return
    }
    activeIndex.value = index
  }

  const menuShow = ref(true)
  const toggle = flag => {
    console.log(!!flag);
    menuShow.value = !!flag
  }

  const myInstance = (obj, target) => {
    let p = obj

    while (p) {
      if (p === target.prototype) {
        return true
      }
      p = p.__proto__
    }
    return false
  }

  // 写一个冒泡排序函数

  onMounted(() => {
    console.log(myInstance(Array, Array))
    var twoSum = function (nums, target) {
      const map = new Map()
      for (let i = 0; i < nums.length; i++) {
        const num = nums[i]
        if (map.has(target - num)) {
          return [map.get(target - num), i]
        }
        map.set(num, i)
      }

    };
    console.log(twoSum([2, 3, 4, 7, 8, 5, 5], 10));
    console.log('isValid', isValid('{{[{}]}}'));
    console.log(bubbleSort([2, 8, 5, 4, 7, 11, 20]));
  })


  // 用字典优化

  // 时间复杂度 O(n) n为s的字符长度
  // 空间复杂度 O(n) 
  const isValid = (s) => {

    if (s.length % 2 !== 0) {
      return false
    }

    const map = new Map()
    map.set("{", "}")
    map.set("[", "]")
    map.set("(", ")")

    const stack = []
    for (let i = 0; i < s.length; i++) {
      if (map.has(s[i])) {
        stack.push(s[i]) // stack '{{{('
      } else {
        let key = stack[stack.length - 1] // (
        if (map.get(key) === s[i]) {
          stack.pop()
        } else {
          return false
        }
      }
    }
    console.log(stack);
    return stack.length === 0
  };

  //冒泡排序
  // const bubbleSort = (arr) => {
  //   for(let i = 0;i < arr.length;i++) {
  //     for(let j = 0;j < arr.length - 1 - i;j++) {
  //       if(arr[j] > arr[j+1]) {
  //         [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
  //       }
  //     }
  //   }
  //   return arr
  // }

  const bubbleSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        }
      }
    }
    return arr
  }
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  display: flex;
  .box {
    position: relative;
    overflow: hidden;
    transition: 0.5s;
    .btn {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 50px;
    }
    ul {
      list-style: none;
      border: 1px solid;
      height: 0;
      overflow: hidden;
      transition: 0.5s;
      li {
        // min-height: 20px;
        line-height: 20px;
        border-bottom: 1px solid;
        &:last-child {
          border: 0;
        }
      }
    }
    .active {
      height: 100px;
    }
  }
  .btn-show {
    position: absolute;
    left: 0;
    top: 100px;
    transition: 0.5s;
  }
  .b-show {
    transform: translateX(0);
    transition-delay: 0.5s;
  }
  .b-hide {
    transform: translateX(-100%);
  }
  .box-item,
  h2 {
    width: 202px;
  }
  .show {
    flex: 0 0 202px;
    width: 202px;
    transition-delay: 0.5s;
  }
  .hide {
    flex: 0 0 0;
    width: 0;
  }
  .content {
    flex: 1;
    border: 1px solid;
    position: relative;
    img {
      mix-blend-mode: overlay; //混合模式
    }
    p {
      position: absolute;
      z-index: 1;
      top: 10px;
      color: #000;
      mix-blend-mode: overlay;
      font-size: 70px;
      font-weight: 600;
      left: 93px;
    }
  }
}
.ball {
  width: 40px;
  height: 40px;
  background-color: orange;
  border-radius: 50%;
  animation: jump 1s ease-in infinite alternate;
  &:hover {
    animation: jump 1s ease-in infinite alternate;
  }
}

@keyframes jump {
  from {
    transform: translateY(0) scale(1, 1);
  }
  50% {
    transform: translateY(50px) scale(1.3, 0.7);
  }
  to {
    transform: scale(0.7, 1.3);
    background: red;
  }
}
</style>