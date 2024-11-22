import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/less/index.less"
import router from "./router"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/api/mock.js'
import api from '@/api/api'
import { useAllStore } from '@/stores'


const app = createApp(App);
const pinia = createPinia();

app.config.globalProperties.$api = api;
app.use(ElementPlus);
app.use(pinia);
const store = useAllStore();
store.addMenu(router, "refresh")
app.use(router).mount("#app");//挂载路由到#app
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}