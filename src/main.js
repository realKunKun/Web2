import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import naive from "naive-ui"
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import * as ELIcons from '@element-plus/icons'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueSimpleAlert from "vue3-simple-alert";
import axios from 'axios'

const app = createApp(App)
axios.defaults.baseURL = '/api'
for (let iconName in ELIcons) {
    app.component(iconName, ELIcons[iconName])
}
app.config.globalProperties.$axios = axios
app.use(store).use(router).use(naive).use(ElementPlus).use(Antd).use(VueSimpleAlert).mount('#app')

