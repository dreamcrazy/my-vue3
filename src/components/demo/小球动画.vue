<template>
  <div>
    <div class="q q1" :class="[ paused ? 'paused' : 'play' ]" @mouseenter="mouseEnter" @mouseout="mouseOut"></div>
    <div class="q q2" :class="[ paused ? 'paused' : 'play' ]" @mouseenter="mouseEnter" @mouseout="mouseOut"></div>
    <button @click="sleep">睡眠3s</button>
    <button @click="sleep1">睡眠3s</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        paused: false
      }
    },
    methods: {
      mouseEnter() {
        this.paused = true
      },
      mouseOut() {
        this.paused = false
      },
      sleep(){
        let start = new Date().getTime()
        while (start + 3000 > new Date().getTime()) {
            //
        }
      },
      pFn(time){
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, time);
        })
      },
      async sleep1(){
        await this.pFn(3000)
        console.log('醒了');
      },
    },
  }
</script>

<style lang="scss" scoped>
.q {
  width: 100px;
  height: 100px;
  background-color: aquamarine;
  border-radius: 50%;
  margin: 20px;
  position: relative;
}
.q1 {
  animation: slide 1s alternate infinite ease-in-out;
}

.q2 {
  animation: slide2 1s alternate infinite ease-in-out;
}

.play {
  animation-play-state: running;
}
.paused {
  animation-play-state: paused;
}

@keyframes slide {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(100px);
  }
}

@keyframes slide2 {
  from {
    left: 0;
  }

  to {
    left: 100px;
  }
}
</style>