<template>
  <div>
    <p>
      <img :src="logoSrc" alt="">
    $log:{{ $log(123) }}
    <img src="" @error="handleError" alt="">
    </p>
    <div class="box">box</div>
    <div class="layout">
      <div class="left">
        left
      </div>
      <div class="right">
        right
      </div>
      <div class="content">
        content
      </div>
    </div>
    123
    <el-button @click="toggleImport">toggle引用</el-button>
    <Btn v-if="isShow"></Btn>
    <button @click="changeList">change</button>
    <div>
      {{ list }}
    </div>
    <ChildCmp></ChildCmp>
    <p>--------------------</p>
    <div>
      name:{{ obj.name }}
      years:{{ obj.years }}
    </div>
    <p>--------------------</p>
    <SlotChild>
      <template #header="{ list }">
        <p>我是header {{ list }}</p>
      </template>
      我是default
    </SlotChild>
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$log);
  },
}
</script>
<script setup>
  import { defineAsyncComponent, ref, reactive, provide, toRefs, toRef } from 'vue'
  import LoadingCmp from './loading.vue'
  import ChildCmp from './child.vue'
  import SlotChild from './slotChild.vue'
  import logoSrc from '@/assets/imgs/logo.png'


  const Btn = defineAsyncComponent({
    loader: () => {
      return import(/* webpackChunkName:"asyncCmp" */'./asyncCmp.vue')
    },
    delay: 20000,
    timeout: 30000,
    loadingComponent: LoadingCmp
  })
  const isShow = ref(false)
  const toggleImport = () => {
    isShow.value = !isShow.value
  }

  const list = reactive([
    'list1',
    'list2',
    'list3',
  ])

  provide('list', list)

  const handleError = e => {
    e.target.src=require("@/assets/imgs/compare.png")
  }

  const changeList = () => {
    list[1] = 'newList'
  }

  const obj = reactive({
    name: 'zhangsan',
    years: {
      age: 18
    }
  })

  const state = reactive({
    foo:1,
    bar:2
  })

  console.log(state);
  console.log(toRefs(state));
  console.log(toRef(state, 'foo'));
  console.log(state);

</script>

<style lang="scss" scoped>
.box{
  width: 100px;
  height: 100px;
  border: 1px solid;
  padding: 10px;
  margin: 10px;
}
.layout{
  position: relative;
  div{
    border: 1px solid ;
    height: 100px;
  }
  .left{
    float: left;
    width: 50px;
  }
  .right{
    float: right;
    width: 50px;
  }
  .content{
    overflow: hidden;
    margin: 0 60px;
  }
}
</style>