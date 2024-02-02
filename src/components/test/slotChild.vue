<template>
    <slot name="header" :list="list"></slot>
    <button>
        <slot>默认内容</slot>
    </button>
</template>

<script setup>
import { reactive } from "vue";

    const list = reactive([
        {
            name:'111'
        },
        {
            name:'222'
        },
    ])
</script>

<style lang="scss" scoped>

</style>