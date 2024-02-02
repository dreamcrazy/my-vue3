<template>
  <div>
    123
    <el-button @click="toggleImport">toggle引用</el-button>
    <Btn v-if="isShow"></Btn>
  </div>
</template>

<script setup>
  import { defineAsyncComponent, ref } from 'vue'
    import LoadingCmp from './loading.vue'
  const Btn = defineAsyncComponent({
    loader: () => {
        return import('./asyncCmp.vue')
    },
    delay: 20000,
    timeout: 30000,
    loadingComponent: LoadingCmp
  })
  const isShow = ref(false)
  const toggleImport = () => {
    isShow.value = !isShow.value
  }

</script>

<style lang="scss" scoped>
</style>