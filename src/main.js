import { createApp } from 'vue'
import router from './router/index'
import './assets/iconfont/iconfont.css'
import App from './App.vue'

import cusBtn from './plugins/Btn'
import { createPinia } from 'pinia'

function myPiniaPlugin(context) {
    console.log(context);
    // context.pinia // 用 `createPinia()` 创建的 pinia。 
    // context.app // 用 `createApp()` 创建的当前应用(仅 Vue 3)。
    // context.store // 该插件想扩展的 store
    // context.options // 定义传给 `defineStore()` 的 store 的可选对象。
    // ...
  }

const pinia = createPinia()
pinia.use(myPiniaPlugin)
const app = createApp(App)
app.use(router)
app.use(cusBtn)
app.use(pinia)


app.mount('#app')
