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
import { s3Layer } from 'vue3-layer';
import 'vue3-layer/dist/s3Layer.css';

const app = createApp(App)
axios.defaults.baseURL = '/api'
for (let iconName in ELIcons) {
    app.component(iconName, ELIcons[iconName])
}
app.config.globalProperties.$axios = axios
app.component('s3-layer', s3Layer);

app.use(store).use(router).use(naive).use(ElementPlus).use(Antd).use(VueSimpleAlert).mount('#app')

