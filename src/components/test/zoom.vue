<template>
    <div class="container">
      <div id="goodsZoom" style="margin-top:50px">
        <img src='@/assets/logo.png' alt="">
        {{ show }}
        <div id="zoomTop">
          <!--        小图框-->
          <div id="smallPic" @mouseover="handlerMouseOver" @mouseleave="handlerMouseLeave"
               @mousemove="handlerMouseMove">
            <img :src="smallImgSrc">
            <!--          蒙版元素-->
            <div id="mask" v-show="show"></div>
          </div>
          <!--        大图框-->
          <div id="bigPic" v-show="show">
            <img :src="bigImgSrc" id="bigImg">
          </div>
        </div>
        <div id="zoomBottom">
          <a href="javascript:;" class="prev" @click="handlerPrev"> ← </a>
          <div id="picList">
            <ul>
              <li v-for="(item,index) in imgList" :key="index" @click="thumbnailClick(item)">
                <img :src="item.s">
              </li>
            </ul>
          </div>
          <a href="javascript:;" class="next" @click="handlerNext"> → </a>
        </div>
      </div>
    </div>
  </template>
   
  <script>
  export default {
    name: "goods-magnifier-zoom",
    props: {
      imgList: {
        type: Array,
        required: true,
        default: () => [],
      },
    },
    data() {
      return {
        show: false,//是否显示
        bigImgSrc: '',
        smallImgSrc: '',
        start: 0,
      }
    },
    created() {
      if (this.imgList.length > 0) {
        this.bigImgSrc = this.imgList[0].b;
        this.smallImgSrc = this.imgList[0].s;
      }
   
    },
    methods: {
      //鼠标移入事件
      handlerMouseOver() {
        this.show = true;
      },
      //鼠标移出事件
      handlerMouseLeave() {
        this.show = false;
      },
      //鼠标移动事件
      handlerMouseMove(data) {
        const smallPic = document.getElementById("smallPic");
        const bigPic = document.getElementById("bigPic");
        const bigImg = document.getElementById("bigImg");
        // const zoomTop = document.getElementById("zoomTop");
        const mask = document.getElementById("mask");
        //蒙版边界设置
        let left = data.clientX - smallPic.getBoundingClientRect().left - mask.offsetWidth / 2;
        let top = data.clientY - smallPic.getBoundingClientRect().top - mask.offsetHeight / 2;
        //边界判断
        if (left < 0) {
          left = 0;
        } else if (left > smallPic.clientWidth - mask.offsetWidth) {
          left = smallPic.clientWidth - mask.offsetWidth;
        }
        if (top < -1) {
          top = -1;
        } else if (top > smallPic.clientHeight - mask.offsetHeight) {
          top = smallPic.clientHeight - mask.offsetHeight;
        }
        mask.style.left = left + "px";
        mask.style.top = top + "px";
        let scale = (smallPic.clientWidth - mask.offsetWidth) / (bigImg.offsetWidth - bigPic.clientWidth);
        console.log(scale);
        bigImg.style.left = -left / scale + "px";
        bigImg.style.top = -top / scale + "px";
      },
      //缩略图点击效果
      thumbnailClick(data) {
        this.bigImgSrc = data.b;
        this.smallImgSrc = data.s;
      },
      //点击前一个
      handlerPrev() {
        let ul = document.querySelector('#goodsZoom #zoomBottom #picList ul');
        let liNodes = document.querySelectorAll('#goodsZoom #zoomBottom #picList li');
        if (liNodes.length === 0) {
          return;
        }
        //步长
        let step = (liNodes[0].offsetWidth + 20) * 2;
        this.start -= step;
        if (this.start < 0) {
          this.start = 0;
        }
        ul.style.left = -this.start + "px";
      },
      //点击下一个
      handlerNext() {
        let ul = document.querySelector('#goodsZoom #zoomBottom #picList ul');
        let liNodes = document.querySelectorAll('#goodsZoom #zoomBottom #picList li');
        if (liNodes.length === 0) {
          return;
        }
        //步长
        let step = (liNodes[0].offsetWidth + 20) * 2;
        //总体运动的距离值 = ul的宽度 - div框的宽度 = (图片的总数 - div中显示的数量) * （li的宽度 + 20）
        let endPosition = (liNodes.length - 5) * (liNodes[0].offsetWidth + 20);
        this.start += step;
        if (this.start > endPosition) {
          this.start = endPosition;
        }
        ul.style.left = -this.start + "px";
      },
    },
  };
  </script>
   
  <style scoped lang="scss">
  .container {
    margin: 5px 0 15px;
    overflow: hidden;
   
    #goodsZoom {
      #zoomTop {
        width: 400px;
        position: relative;
   
        #smallPic {
          width: 400px;
          height: 400px;
          border: 1px solid #dfdfdf;
          position: relative;
   
          #mask {
            width: 200px;
            height: 200px;
            background: rgba(255, 255, 255, .5);
            border: 1px solid #ddd;
            position: absolute;
            left: 0px;
            top: -1px;
          }
        }
   
        #bigPic {
          width: 400px;
          height: 400px;
          border: 1px solid #ddd;
          left: 420px;
          top: 0px;
          position: absolute;
          overflow: hidden;
   
          #bigImg {
            width: 800px;
            height: 800px;
            position: absolute;
            left: 0px;
            top: 0px;
          }
        }
      }
   
      #zoomBottom {
        width: 400px;
        margin-top: 5px;
   
        a {
          width: 10px;
          height: 54px;
          border: 1px solid #ccc;
          background: #ebebeb;
          text-align: center;
          line-height: 54px;
          float: left;
          text-decoration: none;
   
          &:first-child {
            margin-right: 4px;
          }
        }
   
        #picList {
          width: 372px;
          height: 56px;
          float: left;
          overflow: hidden;
          position: relative;
   
          ul {
            white-space: nowrap;
            font-size: 0px;
            position: absolute;
            left: 0px;
            transition: 0.5s;
   
            li {
              width: 50px;
              height: 50px;
              border: 1px solid #ccc;
              padding: 2px;
              margin-right: 20px;
              display: inline-block;
   
              img {
                width: 50px;
                height: 50px;
              }
            }
          }
        }
      }
    }
  }
  </style>