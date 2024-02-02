<template>
    <div>
        child
    </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
    console.log('child');
})
</script>

<style lang="scss" scoped>

</style>