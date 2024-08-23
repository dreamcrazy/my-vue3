<template>
    <div>
        <el-button @click="showCmp">点击加载异步组件</el-button>
        <component :is="dynamicComponent"></component>
        {{ indexStore.age }}
        <button @click="add">+</button>
    </div>
</template>

<script setup>
import { onActivated, ref, shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import { useIndexStore } from "../store/indexStore";

const dynamicComponent = shallowRef(null)
const isShow = ref(false)
const route = useRoute()
console.log(route);
const indexStore = useIndexStore()
const showCmp = () => {
    isShow.value = true
    import('./testCm-async-child.vue').then(res => {
        console.log(res);
        dynamicComponent.value = res.default
    })
}
const add = () => {
    indexStore.changeAge(++indexStore.age)
}

onActivated(() => {
    console.log('onActivated');
})
watch(() => indexStore.age,newVal => {
    console.log('age改变了',newVal);
})
</script>
<!-- <script>
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
</script> -->

<style lang="scss" scoped>

</style>