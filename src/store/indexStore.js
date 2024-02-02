import { defineStore } from "pinia";
import { useCountStore } from "./countSotre";


export const useIndexStore = defineStore("indexStore", {
  state: () =>({
    name: 'Pinia',
    age: 18,
    hobbies: ['basketball', 'football', 'movie'],
  }),
  getters:{
    dbCount(state) {
      const countStore = useCountStore()
      return state.age + countStore.count
    }
  },
  actions: {
    changeName(name) {
      this.name = name;
    },
    changeAge(age) {
      this.age = age;
    },
    st1(){
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 1000);
      })
    },
    st2(){
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2)
        }, 3000);
      })
    },
  },
});
