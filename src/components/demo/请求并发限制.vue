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
    </div>
</template>

<script setup>
import { reactive, ref, toRefs } from 'vue'
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
    console.time('aaa')
    let rList = state.requestList

    let currentCount = 0

    const run = () => {
        let fn = rList.shift()
        fn && runner(fn)
    }

    const runner = async fn => {
        try {
            currentCount++
            const result = await fn()
            state.resultList.push(result)
        } catch (err) {
            state.resultList.push(err)
        } finally {
            currentCount--
            console.log('执行完毕', currentCount);
            picker()
        }
    }

    const picker = () => {
        console.log(rList.length, currentCount);
        if (rList.length == 0 && currentCount == 0) {
            console.log('全部执行结束');
            console.timeEnd('aaa')
        } else if (currentCount < limit.value && rList.length) {
            run()
        }
    }
    let i = 0
    while (i < limit.value) {
        i++
        run()
    }

}

const addTask = () => {
    state.requestList.push(() => requestFn(7,2))
}

const { resultList,requestList } = toRefs(state)
</script>

<style lang="scss" scoped></style>