<template>
    <div>
        接收到的state: {{  state  }}
        <button @click="change">修改</button>
    </div>
</template>

<script setup>
import { toRefs } from "vue"

const props = defineProps(['state'])
const { state } = toRefs(props)

console.log(props);
console.log(state);

const change = () => {
    // eslint-disable-next-line vue/no-mutating-props
    props.state = 123
    console.log(state);
}

</script>

<style lang="scss" scoped>

</style>