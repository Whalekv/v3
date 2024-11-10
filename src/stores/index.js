import { tr } from 'element-plus/es/locales.mjs'
import { defineStore } from 'pinia'
import { ref } from 'vue'

function initState() {
    return {
        isCollapse: true
    };
}
export const useAllStore = defineStore('allData', () => {

    // ref 相当于 state 属性
    // computed 相当于 getters 属性
    // function 相当于 actions 属性
    
    const state = ref(initState())
    return {
        state
    }
})