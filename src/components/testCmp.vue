<template>
    <div>
        <el-button @click="showCmp">点击加载异步组件</el-button>
        <component :is="dynamic"></component>
    </div>
</template>

<!-- <script setup>
import { ref, shallowRef } from "vue";
import { useRoute } from "vue-router";

const dynamicComponent = shallowRef(null)
const isShow = ref(false)
const route = useRoute()
console.log(route);
const showCmp = () => {
    isShow.value = true
    import('./testCm-async-child.vue').then(res => {
        console.log(res);
        dynamicComponent.value = res.default
    })
}
</script> -->
<script>
// const dynamicComponent = () => import('./testCm-async-child.vue')
import dynamicComponent from './testCm-async-child.vue'
export default {
    components: {
        dynamicComponent,
    },
    data() {
        return {
            isShow: false,
            dynamic: null
        }
    },
    methods: {
        showCmp() {
            this.isShow = true
            this.dynamic = Object.freeze(dynamicComponent)
            // dynamicComponent().then(res => {
            //     this.dynamic = Object.freeze(res.default)
            // })
        }
    },
}
</script>

<style lang="scss" scoped>

</style>