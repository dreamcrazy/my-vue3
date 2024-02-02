<template>
  <div class="box">
    <div class="btn iconfont" :class="toggle ? 'icon-zhankaicaidan': 'icon-shouqicaidan'" @click="toToggle"></div>
    <ul class="list" :class="{'toggle': toggle}">
      <li v-for="(item,index) in list" :class="{'active': index == activeIndex}" :key="index"
        @click="toLink(item,index)">
        {{ item.meta.title }}
      </li>
    </ul>
  </div>
  <router-view></router-view>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useIndexStore } from "@/store/indexStore";
  import { resolveFn } from '@/store/wait.js'
  import { routes } from './router/index'
  import { useRouter } from "vue-router";
  const indexStore = useIndexStore()
  const activeIndex = ref(-1)
  const router = useRouter()

  const toggle = ref(true)

  const toToggle = () => {
    toggle.value = !toggle.value
  }

  const list = ref([])
  list.value = routes.filter(item => item.meta)

  const toLink = (item, index) => {
    activeIndex.value = index
    router.push({
      ...item
    })
  }

  onMounted(async () => {
    const res = await Promise.all([indexStore.st1(), indexStore.st2()])
    resolveFn(res)
  })
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
</style>
<style lang="scss" scoped>
.box {
  position: relative;
  .list {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    transition: 0.5s;
    transform: translateY(0);
    li {
      cursor: pointer;
      padding: 5px;
      &:hover {
        text-decoration: underline;
        color: red;
      }
      &.active {
        text-decoration: underline;
        color: red;
      }
    }
  }
  .toggle {
    transform: translateY(-100%);
  }

  .btn {
    position: absolute;
    top: 0;
    left: 90%;
    font-size: 24px;
    z-index: 1;
    cursor: pointer;
    padding: 5px;
  }
}
</style>