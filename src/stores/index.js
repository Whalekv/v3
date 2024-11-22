import { tr } from 'element-plus/es/locales.mjs'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

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
        menuList: [],
        token: '',
        routerList:[]
    };
}
export const useAllStore = defineStore('allData', () => {

    // ref 相当于 state 属性
    // computed 相当于 getters 属性
    // function 相当于 actions 属性
    const state = ref(initState())

    watch(state,(newObj) => {
        if(!newObj.token) return;
        localStorage.setItem("store", JSON.stringify(newObj))
    },
    { deep: true }
    )
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
    function updateMenuList(val){
        state.value.menuList = val
    }
    function addMenu(router, type){
        if(type === 'refresh'){
            if(JSON.parse(localStorage.getItem('store'))){
                state.value = (JSON.parse(localStorage.getItem('store')))
                state.value.routerList = [];
            }else{
                return
            }
        }
        const menu = state.value.menuList;
        //  **/：表示匹配 views 目录下的所有子目录，包括多层嵌套的子目录。
        //  *.vue：表示匹配所有扩展名为 .vue 的文件。
        const module = import.meta.glob('../views/**/*.vue')
        const routerArr = []
        let routers = router.getRoutes()
        routers.forEach(item => {
            if(item.name == 'main' || item.name == 'login' || item.name == '404'){
                return
            }else{
                router.removeRoute(item.name)
            }
        })
        menu.forEach( (item) => {   
            if(item.children){
                item.children.forEach((val) => {
                    let url = `../views/${val.url}.vue`;
                    val.component = module[url];
                    routerArr.push(...item.children)
                })
            }else{
                let url = `../views/${item.url}.vue`
                item.component = module[url]
                routerArr.push(item)
            }
        });

        routerArr.forEach(item =>{
            state.value.routerList.push(router.addRoute("main", item))
        })  
    }
    function clean(){
        state.value.routerList.forEach((item) => {
            if(item) item()
        })
        state.value = initState()
        localStorage.removeItem('store')
    }

    return {
        state,
        selectMenu,
        undateTags,
        updateMenuList,
        addMenu,
        clean
    }
})