<template>
    <ul>
        <li v-for="(item,index) in sList" :key="index">
            {{ item }}
        </li>
    </ul>
</template>

<script setup>
import { inject } from "vue";

   let sList =  inject('list',[1,2,3])
   sList = [1]
</script>

<style lang="scss" scoped>

</style>