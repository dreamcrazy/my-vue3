<template>
  <div>
123
  </div>
</template>

<script setup>
  import { onMounted, toRef } from "vue"

  const props = defineProps(['grid', 'gridFn'])
  const childGrid = toRef(props,'grid')
  onMounted(() => {
    console.log('子组件onMounted');
    console.log('子组件childGrid',childGrid);
    console.log('子组件childGrid',childGrid.value);
    console.log(props.gridFn(),props.grid);
  })
</script>

<style lang="scss" scoped>
</style>