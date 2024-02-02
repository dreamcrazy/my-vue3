import { defineStore } from 'pinia'



export const useCountStore = defineStore('countStore', {
    state:() => {
        return {
            count: 10
        }
    }
})