import { tr } from 'element-plus/es/locales.mjs'
import { defineStore } from 'pinia'
import { ref } from 'vue'

function initState() {
    return {
        isCollapse: true,
        tags: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 'home'
        
            }
        ],
        currentMenu: null,
    };
}
export const useAllStore = defineStore('allData', () => {

    // ref 相当于 state 属性
    // computed 相当于 getters 属性
    // function 相当于 actions 属性
    const state = ref(initState())
    function selectMenu(val) {
        if(val.name === 'home'){
            state.value.currentMenu = null
        }else{
            let index = state.value.tags.findIndex((item) => item.name === val.name)
            index === -1 ? state.value.tags.push(val) : ''
        }
    }

    function undateTags(tag){
        let index = state.value.tags.findIndex(item => item.name === tag.name)
        state.value.tags.splice(index, 1) //splice(index, 1)：方法用于删除数组中的元素，参数 index 指定从哪个索引开始删除，1 表示删除一个元素。
    }
    

    return {
        state,
        selectMenu,
        undateTags,
    }
})