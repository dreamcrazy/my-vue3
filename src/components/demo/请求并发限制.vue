<template>
    <div>
        <p>requestList: {{ requestList }}</p>
        <p>resultList: 
            <ul>
                <li v-for="item in resultList" :key="item.value">
                    <p>名称: {{ item.name }} 结果: {{ item.value }} 状态: {{ item.status }}</p>
                </li>
            </ul>
        </p>
        <input type="text" v-model="limit">
        <button @click="sendRequest">发送</button>
        <button @click="addTask">添加1个任务</button>
        <Test number="10"></Test>
    </div>
</template>

<script setup>
import { computed, reactive, ref, toRefs, watch } from 'vue'
import './test'
import Test from './test.vue'
const limit = ref(3)

const requestFn = (index,time = 1) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const num = Math.random().toFixed(2)
            if (num >= 0.5) {
                resolve({
                    name:`第${index}个请求`,
                    value: num,
                    status: '成功'
                })
            } else {
                reject({
                    name:`第${index}个请求`,
                    value: num,
                    status: '失败'
                })
            }
        }, time * 1000);
    })
}
const state = reactive({
    requestList: [
        () => requestFn(1,1),
        () => requestFn(2,2),
        () => requestFn(3,3),
        () => requestFn(4,4),
        () => requestFn(5,5),
        () => requestFn(6,6),
    ],
    resultList:[]
})
const sendRequest = () => {
    const rList = []
    const wList = []
    console.time('task')
    const walk = fn => {
        fn().then(res => {
            state.resultList.push(res)
        }).catch(err => {
            state.resultList.push(err)
        }).finally(() => {
            rList.shift()
            if(wList.length && rList.length < limit.value) {
                let fn = wList.shift()
                rList.push(fn)
                walk(fn)
            }
            if(!wList.length && !rList.length) {
                console.log('全部完成');
                console.timeEnd('task')
            }
        })
    }
    state.requestList.forEach(fn => {
        if(rList.length < limit.value) {
            rList.push(fn)
            walk(fn)
        } else {
            wList.push(fn)
        }
    })

    const requestListStr = computed(() => JSON.stringify(state.requestList))

    watch(requestListStr,(newVal,oldVal) => {
        console.log(newVal);
        console.log(oldVal);
    })

}

const addTask = () => {
    state.requestList.push(() => requestFn(7,2))
}

const { resultList,requestList } = toRefs(state)
</script>

<style lang="scss" scoped></style>