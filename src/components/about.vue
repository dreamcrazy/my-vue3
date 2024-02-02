<template>
    <div>
        <img src="@/assets/paris.jpg" alt="">
        <div>
            <img src="@/assets/paris.jpg"  alt="">
        </div>
        about
        <router-link to="/">index</router-link>
        <qiepianshangchuan></qiepianshangchuan>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import qiepianshangchuan from './qiepianshangchuan.vue'
import delay from './test/delay'
// import './test/curry'
import './test/test'
export default defineComponent({
    components:{
        qiepianshangchuan
    },
    setup () {
        (async () => {
            const result = await delay(1000,{ value:'我是文本' })
            console.log('打印这句',result)
        })()

        return {}
    }
})
</script>

<style lang="scss" scoped>
.box1 {
    width: 50px;
    height: 50px;
    background: red;
    margin-bottom: 10px;
}
.box2 {
    width: 50px;
    height: 50px;
    background: red;
    div {
        margin-top: 10px;

    }
}
</style>