<script setup>
import {ref, computed} from 'vue'//用于从 Vue 库中导入 ref 和 computed 这两个 Composition API 函数。
// ref用法：用法：const myRef = ref(initialValue)
// computed用法：const doubleCount = computed(() => count.value * 2) 创建一个计算属性，其值基于其他响应式数据动态计算。
import { useAllStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router';

const noChildren = computed(() => list.value.filter(item => !item.children))
const hasChildren = computed(() => list.value.filter(item => item.children))
const store = useAllStore()
const isCollapse = computed( () => store.state.isCollapse )
const width = computed( () => isCollapse.value ? '64px' : '180px')
const router = useRouter()
const route = useRoute()
const activeMenu = computed(()=> route.path)
const list = computed(() => store.state.menuList)
const handleMenu = (item) => {
    router.push(item.path)
    store.selectMenu(item)
}
</script>

<template>
    <el-aside :width="width">
        <el-menu
        background-color="#545c64"
        text-color="#fff"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="activeMenu"
      >
      <h3 v-show="!isCollapse">通用后台管理系统</h3>
      <h3 v-show="isCollapse">后台</h3>
        <el-menu-item 
            v-for="item in noChildren"
            :index="item.path" 
            :key="item.path"
            @click = "handleMenu(item)"
        >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
            
        </el-menu-item>


        <el-sub-menu
            v-for="item in hasChildren"
            :index="item.path" 
            :key="item.path"
        >
          <template #title>
            <component class="icons" :is="item.icon"></component>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
                v-for="(subItem, subIndex) in item.children"
                :index="subItem.path" 
                :key="subItem.path"
                @click = "handleMenu(subItem)"
            >
                <component class="icons" :is="subItem.icon"></component>
                <span>{{ subItem.label }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        
      </el-menu>
    </el-aside>
    
</template>

<style scoped lang="less">
.icons{
    width: 18px;
    height: 18px;
    margin-right: 5px;
}
.el-menu{
    border-right: none;
    h3{
        line-height: 48px;
        color: #fff;
        text-align: center;
    }
}
.el-aside{
    height: 100%;
    background-color: #545c64;
}
</style>