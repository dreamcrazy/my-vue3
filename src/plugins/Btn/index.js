import cusBtn from './src/index.vue'

// cusBtn.install = Vue => {
//     Vue.component(cusBtn.name,cusBtn)
// }
// 导出对象 对象上必须有install方法
// export default cusBtn

export default function (Vue){
    Vue.component(cusBtn.name,cusBtn)
}