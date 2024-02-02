<template>
  <div class="box1">
    <h2>课程表</h2>
    <div class="box">
      <div class="left" @dragover="dragover" @drop="drop('o')">
        <div class="item" @dragstart="dragstart(item,$event)" draggable="true" @dragend="dragend"
          v-for="(item,index) in sourceList" :key="index">
          {{ item.name }}
        </div>
      </div>
      <div class="right" @dragover="dragover" @drop="drop('c')">
        <ul class="list">
          <li v-for="(item,index) in list" :key="index" @dragenter="dragenter($event,index)"
            :class="{'active': index == activeIndex}">
            <div class="c-item" v-if="item && item.content" draggable="true"
              @dragstart="dragstart(item.content,$event,index)" @dragend="dragend">{{ item.content.name }}</div>
          </li>
        </ul>
      </div>
      <div class="right1" ref="box">
        <button class="start" ref="start" @click="start">start</button>
        <button class="end" ref="end">end</button>
      </div>
      <div class="right1">
        <button class="a-btn" :class="{'active': toggleClass}" @click="toClick" ref="btn">click</button>
        <div class="duigou"></div>
        <div class="cha"></div>
        <div class="siheng"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        paused: false,
        list: new Array(10).fill(""),
        activeIndex: null,
        toggleClass: false,
        sourceList: [
          {
            type: 'copy',
            name: '语文'
          },
          {
            type: 'copy',
            name: '数学'
          },
          {
            type: 'copy',
            name: '英语'
          },
        ],
        source: null
      }
    },
    async created() {
      // for(let i =0;i < 5;i ++) {
      //   let res = await this.fn(i)
      //   console.log(res);
      // }
      this.testFn()
    },
    methods: {
      dragstart(item, e, index) {
        e.dataTransfer.effectAllowed = 'copy'
        this.source = item
        this.index = index
      },
      dragover(e) {
        e.preventDefault()
      },
      dragenter(e, index) {
        e.stopPropagation()
        this.activeIndex = index
      },
      dragend() {
        this.activeIndex = null
      },
      drop(type) {
        let index = this.activeIndex
        this.activeIndex = null
        if (type == 'o') {
          this.source = ""
          if (this.index) {
            console.log(this.index);
            this.list[this.index] = ""

          }
        } else {
          console.log(index);
          // let sIndex = this.list.findIndex(item => item && item.content && item.content.name == this.source.name)
          // this.list[sIndex] = ""
          this.list[index] = {
            content: {
              name: this.source.name,
              type: 'move'
            }
          }
          console.log(this.list);
        }
      },
      fn(i) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(i)
          }, 1000);
        })
      },
      toClick() {
        let btn = this.$refs.btn
        let rect = btn.getBoundingClientRect()
        console.log(rect);
        this.toggleClass = !this.toggleClass
      },
      start() {
        let start = this.$refs.start
        let end = this.$refs.end
        let box = this.$refs.box
        let pBox = box.getBoundingClientRect()
        let pSart = start.getBoundingClientRect()
        let pEnd = end.getBoundingClientRect()

        let div = document.createElement("div")
        let btn = document.createElement("button")
        div.classList.add("btn")
        btn.innerText = 'fei'
        div.style.position = 'absolute'
        div.style.left = 0
        div.style.top = 0
        btn.style.position = 'absolute'
        btn.style.left = 0
        btn.style.top = 0
        console.log(pBox);
        console.log(pSart);
        div.style.transform = `translateX(${pSart.left - pBox.left}px)`
        div.style.transition = "all  .6s linear"
        btn.style.transform = `translateY(${pSart.top - pBox.top}px)`
        div.appendChild(btn)
        btn.style.transition = "transform  .6s cubic-bezier(0.5, -0.5, 1, 1)"
        // btn.style.transition = "transform  .6s cubic-bezier(.65,.13,.22,.88)"

        document.querySelector(".right1").append(div)

        // reflow 强行渲染
        // btn.clientHeight
        // div.style.transform = `translateX(${pEnd.left - pBox.left}px)`
        // btn.style.transform = `translateY(${pEnd.top - pBox.top}px)`

        requestAnimationFrame(() => {
          div.style.transform = `translateX(${pEnd.left - pBox.left}px)`
          btn.style.transform = `translateY(${pEnd.top - pBox.top}px)`
        })
        div.addEventListener("transitionend", function () {
          this.remove()
        })

        // this.makeAnimation(btn,pSart,pEnd)
      },
      makeAnimation(btn, pBox, pEnd) {
        window.requestAnimationFrame(() => {
          btn.style.transform = `translate(20px, ${pEnd.top - pBox.top}px)`

        })
        btn.addEventListener("transitionend", function () {
          this.remove()
        })
      },
      testFn() {
        var RecentCounter = function () {
          // 初始化队列
          this.q = [];
        };

        // 输入 inputs = [[],[1],[100],[3001],[3002]] 请求间隔为 3000ms
        // 输出 outputs = [null,1,2,3,3]   

        // 时间复杂度 O(n) n为剔出老请求的长度
        // 空间复杂度 O(n) n为最近请求的次数
        RecentCounter.prototype.ping = function (t) {
          // 如果传入的时间小于等于最近请求的时间，则直接返回0
          if (!t) return null

          // 将传入的时间放入队列
          this.q.push(t);

          // 如果队头小于 t - 3000 则剔除队头
          while (this.q[0] < t - 3000) {
            this.q.shift();
          }

          // 返回最近请求的次数
          return this.q.length;
        };

        var r = new RecentCounter()
        console.log(r.ping(3000));
      }
    },
  }
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.box {
  display: flex;

  .left {
    width: 130px;
    height: 400px;
    border: 1px solid;
    padding: 10px;
    .item {
      background-color: azure;
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
      cursor: pointer;
      border: 1px solid #ccc;
    }
  }
  .right {
    width: 280px;
    height: 400px;
    border: 1px solid;
    padding: 10px;
    .list {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 49%;
        height: 60px;
        border: 1px solid;
        display: flex;
        align-items: center;
        &.active {
          background-color: cadetblue;
        }
        .c-item {
          background-color: azure;
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          border: 1px solid #ccc;
          width: 100%;
          margin: 10px;
        }
      }
    }
  }
  .right1 {
    width: 300px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    position: relative;
    .end {
      position: absolute;
      bottom: 0;
      left: 20px;
    }
    .a-btn {
      transition: all 0.5s cubic-bezier(0.5, -0.5, 1, 1);
      position: absolute;
      right: 0;
      top: 0;
    }
    .active {
      right: 200px;
      top: 100px;
    }

    .duigou {
      width: 20px;
      height: 20px;
      margin-top: 30px;
      /* background: brown; */
      border-left: 1px solid;
      transform: rotate(45deg);
      position: relative;
      &::before {
        content: "";
        width: 10px;
        height: 1px;
        background: red;
        position: absolute;
        left: -10px;
        bottom: 0;
      }
    }
    .cha {
      width: 20px;
      height: 20px;
      margin-top: 30px;
      border: 1px solid;
      position: relative;
      &::before {
        content: "";
        width: 80%;
        height: 1px;
        background: red;
        position: absolute;
        left: 10%;
        bottom: 50%;
        transform: rotate(45deg);
      }
      &::after {
        content: "";
        width: 80%;
        height: 1px;
        background: red;
        position: absolute;
        left: 10%;
        bottom: 50%;
        transform: rotate(-45deg);
      }
    }
    .siheng {
      width: 20px;
      height: 20px;
      border-top: 1px solid;
      border-bottom: 1px solid;
      position: relative;
      margin: 30px 10px;
      &::before {
        content: "";
        width: 80%;
        height: 1px;
        background: red;
        position: absolute;
        left: 10%;
        top: 30%;
      }
      &::after {
        content: "";
        width: 80%;
        height: 1px;
        background: red;
        position: absolute;
        left: 10%;
        bottom: 30%;
      }
    }
  }
}
</style>
<style>
.btn {
  transition: transform 0.6s cubic-bezier(0.5, -0.5, 1, 1);
}
</style>