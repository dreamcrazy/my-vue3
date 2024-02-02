import { createRouter, createWebHashHistory } from "vue-router";
const Index = () => import("../components/index.vue");
// import About from "../components/about.vue";
// import Observe from "../components/observe.vue";
// import Info from "../components/info.vue";
// import Slot from "../components/slot.vue";
// import Transition from "../components/transition.vue";
// import Move from "../components/move.vue";
// import propsModify from "../components/propsModify.vue";
// import xuniliebiao from "../components/test/xuniliebiao.vue";
import animation1 from "../components/animation1.vue";
import asyncParent from "@/components/test/parent.vue";
import fangdajing from "@/components/demo/放大镜.vue";
import lunbo from "@/components/demo/轮播.vue";
import yanzheng from "@/components/demo/拖拽验证.vue";
import tuoxiaoqiu from "@/components/demo/拖小球.vue";
import fanzhuanCard from "@/components/demo/翻转crad.vue";
import testCmp from "@/components/testCmp.vue";

export const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    meta:{
      title:'首页'
    }
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   component: About,
  // },
  // {
  //   path: "/observe",
  //   name: "observe",
  //   component: Observe,
  // },
  // {
  //   path: "/slot",
  //   name: "Slot",
  //   component: Slot,
  // },
  // {
  //   path: "/transition",
  //   name: "Transition",
  //   component: Transition,
  // },
  // {
  //   path: "/move",
  //   name: "Move",
  //   component: Move,
  // },
  // {
  //   path: "/propsModify",
  //   name: "propsModify",
  //   component: propsModify,
  // },
  // {
  //   path: "/xuniliebiao",
  //   name: "xuniliebiao",
  //   component: xuniliebiao,
  // },
  {
    path: "/animation1",
    name: "animation1",
    component: animation1,
    meta:{
      title:'测试动画1'
    }
  },
  {
    path: "/async-parent",
    name: "async-parent",
    component: asyncParent,
  },
  {
    path: "/fangdajing",
    name: "fangdajing",
    component: fangdajing,
    meta:{
      title:'放大镜'
    }
  },
  {
    path: "/lunbo",
    name: "lunbo",
    component: lunbo,
    meta:{
      title:'轮播'
    }
  },
  {
    path: "/yanzheng",
    name: "yanzheng",
    component: yanzheng,
    meta:{
      title:'拖拽验证'
    }
  },
  {
    path: "/tuoxiaoqiu",
    name: "tuoxiaoqiu",
    component: tuoxiaoqiu,
    meta:{
      title:'拖小球'
    }
  },
  {
    path: "/fanzhuan",
    name: "fanzhuan",
    component: fanzhuanCard,
    meta:{
      title:'卡片翻转'
    }
  },
  {
    path: "/test/:id",
    name: "test",
    component: testCmp,
    meta:{
      title:'测试动态'
    }
  },
//   {
//     path: "/info",
//     name: "Info",
//     component: Info,
//   },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to,from,next) => {
    // if(!router.hasRoute('Info')) {
    //     await router.addRoute({
    //         path: "/info",
    //         name: "Info",
    //         component: Info,
    //     })
    //     next(to.fullPath)
    //     return
    // }
    next()
})

export default router;
