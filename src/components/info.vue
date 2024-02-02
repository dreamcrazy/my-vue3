<template>
  <div>
    state数据：{{ state.count }}
    <p class="default" :class="['test', {'active1': isActive} ]">total: {{  total  }}</p>
    <p><input type="number" v-model.number="total"></p>
    <button @click="add">add</button>
    <button @click="changeState">修改state对象</button>
    <div>
      <p>
        <ruby>百<rt>bai</rt></ruby>
        <ruby>川<rt>chuan</rt></ruby>
        <ruby>东<rt>dong</rt></ruby>
        <ruby>到<rt>dao</rt></ruby>
        <ruby>海<rt>hai</rt></ruby>
      </p>
      <ruby>百川东到海 <rt>baichuandongdaohai</rt></ruby>
      <p>测试v-for和v-if优先级(不执行 抛警告 v-if优先级高 item未定义)</p>
      <ul>
        <li v-for="item in list" :key="item" >
          {{  item  }}
        </li>
      </ul>
      <div @click.ctrl="doConsole">Do console</div>
      <infoChild class="info-child" @testAttr="testAttr" :infoObj="infoObj" :age="22" :infoArr="[1,2,3,4]" 
      @addCount="addCount" :infoCount="infoCount"
      v-model="modelCount"></infoChild>
      <p>{{  modelCount  }}</p>
    </div>
  </div>
</template>

<script setup>
  import { computed, reactive, ref, watch } from "vue-demi";
  import infoChild from "./infoChild.vue";

  let state = reactive({
    count: 0,
    count1: 10
  })

  const add = () => {
    state.count++
  }

  const changeState = () => {
    state = reactive({
      count: state.count,
      count1: 10
    })
    console.log(state);
  }
  const total = computed({
    get() {
      return state.count + state.count1
    },
    set(val) {
      state.count = val - state.count1
    }
  })
  watch(() => state.count1, newVal => {
    console.log(newVal);
    console.log(typeof newVal);
  })
  const isActive = ref(true)
  const list = ref([1,2,3,4])

  const doConsole = () => {
    console.log('doConsole');
  }

  const infoObj = reactive({
    name:'张三',
    age: 18,
    info: {
      language: 'CN'
    }
  })
  const infoCount = ref(0)
  const addCount = (num,...args) => {
    console.log(args);
    infoCount.value += num
  }

  const modelCount = ref(0)
  const testAttr = () => {}

</script>

<style lang="scss" scoped>
</style>