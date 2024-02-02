<template>
    <div>
        <input type="file" accept="*" @change="handleChange">
        <button @click="handleUpload">上传</button>
        {{ curNum }}
        <ul>
            <li v-for="(chunk, index) in chunkList" :key="index">
                {{ chunk.chunkName }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { reactive, ref, toRefs } from "vue"


const fileObj = reactive({
    file: '',
    chunkList: []
})
const handleChange = e => {
    const [file] = e.target.files
    if (!file) return
    fileObj.file = file
}

const createChunks = (file, size = 1 * 1024) => {
    console.log(file);
    let chunkList = []
    let cur = 0
    while (cur < file.size) {
        chunkList.push({
            file: file.slice(cur, cur + size)
        })
        cur += size
    }
    return chunkList
}

const sendChunkData = (data) => {
    return new Promise((res) => {
        setTimeout(() => {
            res(data)
        // }, 500);
        }, Math.floor(Math.random() * 6 * 1000));
    })
}
const uploadChunks = async () => {
    const requestList = fileObj.chunkList.map(({ file, fileName, chunkName, index }) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('fileName', fileName)
        formData.append('chunkName', chunkName)
        return {
            formData, index
        }
    })

    const data = await limitRequest(requestList)
    console.log(data);
}
let curNum = ref(0)

const limitRequest = (list, limit = 2) => {
    let queue = []
    let map = new Map()

    return new Promise((resolve => {
        const run = data => {
            curNum.value++
            sendChunkData(data).then(res => {
                console.log(data.index);
                map.set(data.index, res)
            }).finally(() => {
                curNum.value--
                if (queue.length) {
                    run(queue.shift())
                } else {
                    resolve(map)
                }
            })
        }

        for (let i = 0; i < list.length; i++) {
            if (curNum.value < limit) {
                run(list[i])
            } else {
                queue.push(list[i])
            }
        }
        console.log(queue);
    }))
}

const handleUpload = () => {
    if (!fileObj.file) return
    const chunks = createChunks(fileObj.file)
    console.log(chunks)
    fileObj.chunkList = chunks.map(({ file }, index) => {
        return {
            file,
            size: file.size,
            fileName: fileObj.file.name,
            chunkName: `${fileObj.file.name} - ${index}`,
            index
        }
    })
    uploadChunks()
}

const { chunkList } = toRefs(fileObj)
</script>

<style lang="scss" scoped></style>