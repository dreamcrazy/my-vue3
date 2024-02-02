<template>
    <div class="child-self">
        {{  props.infoObj  }} -- {{ props.age }} -- {{ props.infoArr }}
        <button @click="change1">直接修改父组件的对象</button>
        <button @click="change">修改父组件的对象某个key</button>
        <p>
            infoCount: {{ props.infoCount  }}
            <button @click="toSubmit(1,$event)">修改count并传递$event</button>
        </p>
        <p>
            组件v-model(可以用v-model:title="title"传值)
            <input type="text" v-model="inputVal">
        </p>
    </div>
</template>

<script setup>
const { computed, useAttrs }=require("vue-demi")

 const props = defineProps(['infoObj','age','infoArr','infoCount','modelValue'])
 const emits = defineEmits(['addCount','update:modelValue'])

 const change = () => {
    // eslint-disable-next-line vue/no-mutating-props
    props.infoObj.name ='李四'
    // eslint-disable-next-line vue/no-mutating-props
    props.infoArr[0] = 10
    // eslint-disable-next-line vue/no-mutating-props
    // props.age = 19
 }
 const change1 = () => {
    // eslint-disable-next-line vue/no-mutating-props
    props.infoObj = 123
 }
 const toSubmit = (num,e) => {
    emits("addCount",num,1,2,3,4,5,6,7,8,9,e)
 }
 const inputVal = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emits("update:modelValue",val)
    }
 })
 const attrs = useAttrs()
 console.log(attrs);
</script>
<script>
export default {
    inheritAttrs:false
}
</script>

<style lang="scss" scoped>

</style>