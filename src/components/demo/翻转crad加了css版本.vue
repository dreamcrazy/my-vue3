<template>
  <div>
    <div class="box">
        <div class="box1" :class="{'fanzhuan': fanzhuan}">box1</div>
        <div class="box2" :class="{'fanzhuan2': !fanzhuan}">box2</div>
    </div>
    <button @click="change">change</button>
  </div>
</template>

<script>
  export default {
    data() {
        return {
            fanzhuan: false
        }
    },
    methods: {
        change() {
            this.fanzhuan = !this.fanzhuan
        }
    },
  }
</script>

<style lang="scss" scoped>
.box {
    position: relative;
    width: 300px;
    height: 150px;
    perspective: 1000px;
    div {
        width: 300px;
        height: 150px;
        color: #fff;
        font-size: 18px;
        position: absolute;
        left:0;
        top: 0;
        border: 1px solid;
        transition: transform linear 1.5s;
        backface-visibility: hidden;
    }
    .box1{
        background-color: rgb(205, 236, 26);
    }
    .box2{
        background-color: rgb(88, 11, 212);
    }
    .fanzhuan{
        transform: rotateY(180deg);
    }
    .fanzhuan2{
        transform: rotateY(-180deg);
    }
}
</style>