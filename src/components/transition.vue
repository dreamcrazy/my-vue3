<template>
    <div>
        <button @click="toggle">toggle</button>
        <transition>
            <p v-if="txtShow">123123123</p>
        </transition>

        <button @click="bounce">bounce</button>
        <transition name="bounce" :duration="1000">
            <p style="width:300px;margin: 0 auto;" v-show="bounceShow">
                bouncebouncebouncebouncebounce
                <span class="inner">77777777777777</span>
            </p>
        </transition>
        <div ref="dragItem" @mousedown="mouseDownFn" 
        @mousemove="mouseMoveFn" @mouseup="mouseUpFn" class="drag-item"></div>
        <div class="test"></div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { gsap } from 'gsap'

const txtShow = ref(false)
const toggle = () => {
    txtShow.value = !txtShow.value
}

const bounceShow = ref(false)
const bounce = () => {
    bounceShow.value = !bounceShow.value
}

const drawer = () => {
    let t1 = gsap.timeline()
    t1.fromTo(".test",{
        x: 0,
        y:0,
        duration: 0.5,
        backgroundColor: 'red',
        display:'block'
    }, {
        x: 100,
        y: 100,
        duration: 0.5,
        borderRadius: '50%'
    })
    t1.to(".test",{
        y: 150,
        duration: 0.5,
        width: '200px',
        height: '200px',
        display:'none'
    })
}

setTimeout(() => {
    drawer()
}, 1000);




  function fun() {
    this.name = 'fun',
    this.arr = [1,2,3]
  }

  fun.prototype.myLog = function() {
    console.log(this.arr);
  }

  function cFun () {
    fun.call(this)
    this.type = 'child'
  }

//   cFun.prototype = fun.prototype
var a = Object.create(fun.prototype)
  cFun.prototype = a
  cFun.prototype.constructor = cFun

  var c1 = new cFun()
  var f1 = new fun()
  console.log(c1);
  c1.myLog()
  console.log(c1 instanceof cFun);
  console.log(f1 instanceof cFun);
  console.log(a);


  class Teacher {
    constructor(name) {
        this.name = name
        this.age = 30
    }
    sayHi() {
        console.log(`hello everyone，我叫${this.name}`);
    }
  }

  class Student extends Teacher {
    constructor(name) {
        super(name)
        this.name = name
    }
    sayHello() {
        console.log(`大家好，我叫${this.name}`);
    }
  }

  const stu1 = new Student('张三')
  console.log(stu1);
  stu1.sayHello()
  stu1.sayHi()

  let isMoving = ref(false)
  let diffX = ref(0);
  let diffY = ref(0);
  const dragItem = ref(null)
  const mouseDownFn = (e) => {
    const { clientX,clientY,offsetX,offsetY } = e
    isMoving.value = true
    diffX.value = clientX - offsetX
    diffY.value = clientY - offsetY
    console.log(diffX.value);
    console.log(diffY.value);
  }

  const mouseMoveFn = (e) => {
    if(isMoving.value) {
        const { clientX,clientY } = e
        let moveX = clientX - diffX.value;
        let moveY = clientY - diffY.value;
        if(dragItem.value) {

            dragItem.value.style.left = `${moveX}px`
            dragItem.value.style.top = `${moveY}px`
        }
    }
  }

  const mouseUpFn = () => {
    debugger
    isMoving.value = false
    diffX.value = 0
    diffY.value = 0
  }

</script>

<style lang="scss" scoped>
.drag-item {
    width: 100px;
    height: 100px;
    background-color: aquamarine;
    border-radius: 50%;
    position: absolute;
}
.test {
    width: 100px;
    height: 100px;
    background-color: aquamarine;
}
.v-enter-from {
    opacity: 0;
    transform: translateX(20px);
}
.v-enter-active {
    transition: all .5s linear;
}
.v-leave-from {
    transform: scale(1.5);
}
.v-leave-active {
    transition: all .5s linear;
}
.v-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.bounce-enter-active {
    animation: bounce-in .5s;
}
.bounce-leave-active {
    animation: bounce-in .5s reverse;
    animation-delay: .5s;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}

.bounce-enter-active .inner,
.bounce-leave-active .inner {
  transition: all 0.5s ease-in-out;
}

.bounce-enter-from .inner,
.bounce-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}
.bounce-enter-active .inner {
  transition-delay: 0.5s;
}
</style>