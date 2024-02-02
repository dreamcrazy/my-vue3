<template>
    <div>
        <div class="header">
            <slot name="header" title="我是title"></slot>
        </div>
        <slot></slot>
        <div class="body">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>