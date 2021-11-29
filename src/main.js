import { createApp } from 'vue'
import App from './App.vue'
import {router} from "./route"
import './assets/style/common.less'
import http from './http/index.js'
import CsDialog from './components/package/dialog/src/plugin'
import csNotify from './components/package/notify/src/plugin'
import CsLoading from './components/package/loading/src/plugin'
import createLoading from "./components/package/loading/src/plugin/createLoading";

let loading = null
router.beforeEach((to, from, next) => {
    loading = createLoading({})
    if (to.matched.length !== 0) {
        next()
    } else {
        next({ path: '/404' })
    }
})

router.afterEach((to, from, failure) => {
    setTimeout(() => {
        loading.close()
    }, 500)
})

const app = createApp(App)
app.use(router)
app.use(CsLoading).use(CsDialog).use(csNotify)
app.config.globalProperties.$http = http
app.mount('#app')
