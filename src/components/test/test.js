const obj = {
    name: 'zhangsan',
    info: {
        age: 18,
        sex: 'man'
    }
}

const deepClone = obj => {
    let cloneObj = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] == 'object') {
                cloneObj[key] = deepClone(obj[key])
            } else {
                cloneObj[key] = obj[key]
            }
        }
    }
    return cloneObj
}

const obj1 = deepClone(obj)
obj1.info.age = 19
// console.log(obj);
// console.log(obj1);

const bubbleSort = arr => {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
        // for(let j = 0;j<arr.length - 1 - i;j++){
        //     if(arr[j] > arr[j+1]){
        //         [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
        //     }
        // }
    }
    return arr
}
console.log(bubbleSort([5, 2, 4, 3, 1]));

class EventBus {
    constructor(){
        this.cache = {}
    }

    on(name,fn){
        if(this.cache[name]){
            this.cache[name].push(fn)
        } else {
            this.cache[name] = [fn]
        }
    }

    emit(name){
        if(this.cache[name]){
            let tasks = this.cache[name].slice()
            tasks.forEach(fn => fn())
        }
    }
}

let eventBus = new EventBus()

eventBus.on('click',() => {
    console.log('订阅1');
})

setTimeout(() => {
    eventBus.emit("click")
}, 1000);