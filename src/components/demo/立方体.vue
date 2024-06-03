<template>
    <div>
      <div class="box">
        <div class="up">up</div>
        <div class="down">down</div>
        <div class="left">left</div>
        <div class="right">right</div>
        <div class="front">front</div>
        <div class="backend">backend</div>
      </div>
    </div>
  </template>
  
  <script>
    export default {
  
    }
  </script>
  
  <style lang="scss" scoped>
  .box {
    display: flex;
    margin: 50px;
    position: relative;
    transform-style: preserve-3d;
    transform: rotate3d(1, 1, 1, 45deg);
    width: 100px;
    height: 100px;
    animation: spin linear 5s infinite;
    div {
      width: 100px;
      height: 100px;
      border: 1px solid;
      position: absolute;
      font-size: 22px;
      text-align: center;
      line-height: 100px;
    }
    .front {
      transform: translateZ(-50px);
    }
    .backend {
      transform: translateZ(50px);
    }
    .left {
      transform: rotateY(90deg) translateZ(-50px);
    }
    .right {
      transform: rotateY(-90deg) translateZ(-50px);
    }
    .up {
      transform: rotateX(-90deg) translateZ(-50px);
    }
    .down {
      transform: rotateX(90deg) translateZ(-50px);
    }
  }
  
  @keyframes spin {
    0% {
      transform: rotateX(0deg) rotateY(0deg);
    }
    100% {
      transform: rotateX(360deg) rotateY(360deg);
    }
  }
  </style>