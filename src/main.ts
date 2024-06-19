import '@/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import Index from '@/Index.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css';
const app = createApp(Index)
app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')
