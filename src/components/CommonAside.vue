<script setup>
import {ref, computed} from 'vue'//用于从 Vue 库中导入 ref 和 computed 这两个 Composition API 函数。
// ref用法：用法：const myRef = ref(initialValue)
// computed用法：const doubleCount = computed(() => count.value * 2) 创建一个计算属性，其值基于其他响应式数据动态计算。
import { useAllStore } from '@/stores'
const list =ref([
      	{
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 'house',
          url: 'Home'
      	},
        {
            path: '/mall',
            name: 'mall',
            label: '商品管理',
            icon: 'video-play',
            url: 'Mall'
        },
        {
            path: '/user',
            name: 'user',
            label: '用户管理',
            icon: 'user',
            url: 'User'
        },
        {
            path: 'other',
            label: '其他',
            icon: 'location',
            children: [
                {
                    path: '/page1',
                    name: 'page1',
                    label: '页面1',
                    icon: 'setting',
                    url: 'Page1'
                },
                {
                    path: '/page2',
                    name: 'page2',
                    label: '页面2',
                    icon: 'setting',
                    url: 'Page2'
                }
            ]
        }
])

const noChildren = computed(() => list.value.filter(item => !item.children))
const hasChildren = computed(() => list.value.filter(item => item.children))
const store = useAllStore()
const isCollapse = computed( () => store.state.isCollapse )
const width = computed( () => isCollapse.value ? '64px' : '180px')
</script>

<template>
    <el-aside :width="width">
        <el-menu
        background-color="#545c64"
        text-color="#fff"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
      <h3 v-show="!isCollapse">通用后台管理系统</h3>
      <h3 v-show="isCollapse">后台</h3>
        <el-menu-item 
            v-for="item in noChildren"
            :index="item.path" 
            :key="item.path"
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