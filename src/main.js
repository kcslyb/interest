import { createApp } from 'vue'
import App from './App.vue'
import {router} from "./route"
import './style/global/config.less'
import http from './http/index.js'

router.beforeEach((to, from, next) => {
    if (to.matched.length !== 0) {
        next()
    } else {
        next({ path: '/404' })
    }
})

const app = createApp(App)
app.use(router)
app.config.globalProperties.$http = http
app.mount('#app')
