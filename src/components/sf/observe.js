
function defineReactive(obj,key,val) {
    if(arguments.length == 2) {
        val = obj[key]
    }

    Object.defineProperty(obj,key,{
        get() {
            return val
        },
        set(value) {
            val = value
        }
    })
}

class Observe {
    constructor(obj) {
        this.walk(obj)
    }

    walk(obj) {
        Object.keys(key => {
            defineReactive(obj,key)
        })
    }
}

let a = {
    name: '123',
    age: 18,
    gender: {
        haha: 'heihei'
    }
}

new Observe(a)
console.log(123);
a.name = 666
console.log(a);