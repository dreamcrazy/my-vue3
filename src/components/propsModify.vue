<template>
    <div>
        父组件的state: {{ state  }}
        <button @click="change">自身修改修改</button>
        <propsChild :state="state"></propsChild>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import propsChild from './propsChild.vue';

const state = reactive({
    name:'张三',
    age: 18
})

const change = () => {
    state.name='王五'
}

</script>

<style lang="scss" scoped>

</style>