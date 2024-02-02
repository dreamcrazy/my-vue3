<template>
  <div>
    <slotBtn v-if="btnShow">{{ message }}</slotBtn>
    <button @click="loadBtnCmp">加载异步组件btn</button>
    <input type="text" v-focus>

    <cBox>
      <template #[dynamic]> 123-- {{ message }} </template>
      <template #header="headerProps"> 456 -- {{ headerProps }} </template>
      <template #default>
        <p>789</p>
      </template>
    </cBox>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref,nextTick } from "vue";
// import slotBtn from './slotBtn.vue';
const slotBtn = defineAsyncComponent({
  loader: () => import(/* webpackChunkName:'123' */ "./slotBtn.vue"),
  delay: 20000,
});
import cBox from "./cBox.vue";
const message = ref("haha");

const dynamic = ref("body");

const btnShow = ref(false);
const loadBtnCmp = () => {
  btnShow.value = !btnShow.value;
};

const vFocus = {
  mounted:(el) => {
    nextTick(() => {
      console.log(11);
    })
    el.focus()
  }
}
</script>

<style lang="scss" scoped></style>
